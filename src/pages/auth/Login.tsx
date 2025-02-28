import React from "react";
import { AuthCard } from "./AuthCard";
import { useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import AuthServices from "../../services/authServices";
const Login = function () {

    const navigate = useNavigate();
    const handleLogin = function(email: string, password: string){
        AuthServices.login(email, password);
        navigate("/");
    }
  return (
    <AuthCard submitCallback={handleLogin} authPageName="Login">
      
    </AuthCard>
  );
};

export { Login };
