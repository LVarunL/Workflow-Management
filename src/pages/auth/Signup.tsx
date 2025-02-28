import React from "react";
import {
  
} from "@mui/material";
import { AuthCard } from "./AuthCard";
import AuthServices from "../../services/authServices";
import { useNavigate } from "react-router";
const Signup = function () {
  const navigate = useNavigate();
  function handleSignup(email:string, password:string, confirmPassword:string) {
    console.log(email,password,confirmPassword);
    AuthServices.register(email,password,confirmPassword);
    navigate("/login");
  }
  return (
    <AuthCard submitCallback={handleSignup} authPageName="Sign Up">
      
    </AuthCard>
  );
};

export { Signup };
