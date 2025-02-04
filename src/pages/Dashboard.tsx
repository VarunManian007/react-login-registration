import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import Header from "../components/Header.tsx";
import UsersList from "./UserList.tsx";
import UserCard from "../components/UserCard.tsx";
import { MESSAGE } from "../constants/message.ts";

const Dashboard = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
    const [currentUser, setCurrentUser] = useState<{ userName: string; email: string; avatar: string }>();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setToast({ open: true, message: MESSAGE.ERROR.UNAUTHORIZED_LOGIN, severity: "error" });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
        try {
            const decodedToken: any = jwtDecode(token);
            localStorage.setItem("isAdmin", decodedToken.isAdmin);
            setIsAdmin(decodedToken.isAdmin);
            setCurrentUser({ userName: decodedToken.username, email: decodedToken.email, avatar: '' });
            const currentTime = Date.now() / 1000;
            
            if (decodedToken.exp < currentTime) {
              setToast({ open: true, message: MESSAGE.ERROR.SESSION_TIMED_OUT, severity: "error" });
              localStorage.removeItem("token");
              navigate("/login");
            }
          } catch (error) {
            setToast({ open: true, message: MESSAGE.ERROR.CONTACT_ADMIN, severity: "error" });
            localStorage.removeItem("token");
            navigate("/login");
          }
    }, [navigate]);

    const dashboardStyles = {
        container: {
            maxWidth: "none !important",
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { 
                display: "none" 
            }
        },
        userContent: {
            flex: 1,
            overflowY: "auto",
            mt: 2,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
                display: "none"
            }
        }
    }

    return (
        
        <>
            <Header />
            <Box display="flex" justifyContent="center">
                <Typography variant="h4" mt={10}>
                    Welcome to the Application
                </Typography>
            </Box>
            
        
            <Box sx={dashboardStyles.container}>
                {isAdmin ? (
                    <Box sx={dashboardStyles.userContent}>
                        <UsersList />
                    </Box>
                ) : (
                    <Box sx={dashboardStyles.userContent}>
                        <Typography variant="h6">
                            Logged In User
                        </Typography>
                        {currentUser &&
                            <UserCard user={currentUser} /> 
                        }
                    </Box>
                )}
            </Box>

            <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
                <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity as any} sx={{ width: "100%" }}>
                {toast.message}
                </Alert>
            </Snackbar>
            
        </>

    )
}

export default Dashboard;