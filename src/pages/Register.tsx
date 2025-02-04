import { useNavigate } from "react-router-dom";
import Form from "../components/Form.tsx";
import { useEffect } from "react";
import Header from "../components/Header.tsx";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, [navigate]);
  
  return (
    <>
      <Header category="register" />
      <Form category="register" />
    </>
  );
};
  
  export default Register;