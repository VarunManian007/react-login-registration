import { useEffect } from "react";
import Form from "../components/Form.tsx";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../components/Header.tsx";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, [navigate]);
  
  return (
    <>
      <Header category="login" />
      <Form category="login" />
    </>
  )
};
  
  export default Login;