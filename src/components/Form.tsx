import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Card, CardContent, Typography, Box, List, ListItem, Chip, Container, Snackbar, Alert, InputAdornment, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { POST_REQUEST } from "../services/httpService.ts";
import { ApiResponse } from "../model/apiResponse.ts";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MESSAGE } from "../constants/message.ts";


const inputLoginFieldSchema = z.object({
  email: z.string().email(MESSAGE.VALIDATION.EMAIL),
  password: z.string()
});

const inputRegisterSchema = inputLoginFieldSchema.extend({
  name: z.string().min(3, MESSAGE.VALIDATION.NAME),
  password: z.string().min(8, MESSAGE.VALIDATION.PASSWORD_MIN_LENGTH)
    .regex(/[a-zA-Z]/, MESSAGE.VALIDATION.PASSWORD_ONE_LETTER)
    .regex(/[0-9]/, MESSAGE.VALIDATION.PASSWORD_ONE_NUMBER)
    .regex(/[!@#$%^&*(),.?":{}|<>]/, MESSAGE.VALIDATION.PASSWORD_ONE_SPECIAL),
});



const Form = ({category}: {category: "login" | "register" }) => {
    const navigate = useNavigate();
    const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
    const { register, handleSubmit, formState: { errors }, watch } = useForm(
    { 
      resolver: zodResolver(category === "register" ? inputRegisterSchema : inputLoginFieldSchema) 
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    const password = watch("password", "");

    const passwordChecks = [
      { regex: /.{8,}/, message: "At least 8 characters" },
      { regex: /[a-zA-Z]/, message: "At least one letter" },
      { regex: /[0-9]/, message: "At least one number" },
      { regex: /[!@#$%^&*(),.?":{}|<>]/, message: "At least one special character" },
    ];

    const onSubmit = async (data: any) => {
      if (category === "login") {
        const payload = {
          email: data.email,
          password: data.password,
        };
        POST_REQUEST("/user/login", payload, {}).then((response: ApiResponse) => {
          if (response.success) {
            localStorage.setItem("token", response.data?.access_token);
            navigate("/dashboard");
          } else {
            setToast({ open: true, message: response.message, severity: "error" });
          }
        }).catch((error) => {
          setToast({ open: true, message: error.message, severity: "error" });
        });
      } else {
        const payload = {
          email: data.email,
          password: data.password,
          userName: data.name
        };
        POST_REQUEST("/user/register", payload, {}).then((response: ApiResponse) => {
          if (response.success) {
            setToast({ open: true, message: response.message, severity: "success" });
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          } else {
            setToast({ open: true, message: response.message, severity: "error" });
          }
        }).catch((error) => {
          setToast({ open: true, message: MESSAGE.ERROR.CONTACT_ADMIN, severity: "error" });
        });
      }
    };

    const formStyles = {
      container: { 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
        px: 2 
      },
      cardContainer: { 
        width: { 
          xs: '100%', 
          sm: 400 
        }, 
        p: 3, 
        boxShadow: 3 
      }
    }
  

    return (
      <Container sx={formStyles.container}>
        <Card sx={formStyles.cardContainer}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {category === "register" ? "Sign Up" : "Sign In"}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={2}>
                <TextField 
                  fullWidth 
                  label="Email" 
                  type="email" 
                  {...register("email")} 
                  error={!!errors.email} 
                  helperText={errors.email?.message} 
                />
              </Box>
    
              {category === "register" && (
                <Box mb={2}>
                  <TextField 
                    fullWidth 
                    label="Name" 
                    type="text" 
                    {...register("name")} 
                    error={!!errors.name} 
                    helperText={errors.name?.message} 
                  />
                </Box>
              )}
    
              <Box mb={2}>
                <TextField 
                  fullWidth 
                  label="Password" 
                  type={showPassword ? "text" : "password"}
                  {...register("password")} 
                  error={!!errors.password} 
                  helperText={category === "login" && errors.password?.message} 
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                {category === "register" && (
                 <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                    {passwordChecks.map((check, index) => (
                      <Chip
                        key={index}
                        label={check.message}
                        color={check.regex.test(password) ? "success" : "error"}
                        icon={check.regex.test(password) ? <CheckCircleIcon /> : <CancelIcon />}
                      />
                    ))}
                  </Box>
                )}
              </Box>
                  
    
              <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                {category === "register" ? "Sign Up" : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
          <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity as any} sx={{ width: "100%" }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </Container>
      );
    };
    
export default Form;
