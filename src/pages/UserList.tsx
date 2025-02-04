import { useEffect, useState } from "react";
import { Container, Typography, Box, Snackbar, Alert } from "@mui/material";
import UserCard from "../components/UserCard.tsx";
import { GET_REQUEST } from "../services/httpService.ts";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../model/apiResponse.ts";
import { MESSAGE } from "../constants/message.ts";

const UsersList = () => {
  const [users, setUsers] = useState<{ name: string; email: string; avatar: string }[]>([]);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  
  const UsersGrid = styled(Box)(({ theme }) => ({
    display: "grid",
    gap: theme.spacing(2),
    gridTemplateColumns: "repeat(3, 1fr)",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  }));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        GET_REQUEST("/user/getAllUsers", { headers: { Authorization: `Bearer ${token}` } }).then((response: ApiResponse) => {
          if (response.success) {
            setUsers(response.data);
            setIsError(false);
          } else {
            setIsError(true);
          }
        }).catch((error) => {
          setToast({ open: true, message: MESSAGE.ERROR.GET_ALL_USERS, severity: "error" });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        });
      } catch (error) {
        setToast({ open: true, message: MESSAGE.ERROR.GET_ALL_USERS, severity: "error" });
        setTimeout(() => {
          navigate("/login");
        }, 2000)
      }
    };
    fetchUsers();
  }, []);

  const userListStyles = {
    container: { 
      mt: 5, 
      maxWidth: "100%", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column" 
    },
    listContent: { 
      flexGrow: 1, 
      overflowY: "auto", 
      minHeight: "calc(100vh - 120px)", 
      paddingBottom: "200px", 
      scrollbarWidth: "none", 
      "&::-webkit-scrollbar": { 
        display: "none" 
      } 
    }
  }

  return (
    <Container sx={userListStyles.container}>
      {isError ? (
       <Typography variant="h6" color="error">
          { MESSAGE.ERROR.GET_ALL_USERS }
        </Typography>
      ) : (
        <Container>
          <Typography variant="h6" gutterBottom>Users List</Typography>
          <Box sx={userListStyles.listContent}>
            <UsersGrid>
              {users.map((user, index) => (
                <UserCard key={index} user={user} />
              ))}
            </UsersGrid>
          </Box>
        </Container>
      )}
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
          <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity as any} sx={{ width: "100%" }}>
          {toast.message}
          </Alert>
      </Snackbar>
    </Container>
  );
};

export default UsersList;
