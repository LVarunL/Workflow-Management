import React from "react";
import {} from "@mui/material";
import { AuthCard } from "./AuthCard";
import AuthServices from "../../services/authServices";
import { useNavigate } from "react-router";
import { useToast } from "../../common/components/Snackbar/SnackbarContext";
const Signup = function () {
  const navigate = useNavigate();
  const { showToast } = useToast();
  function handleSignup(
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const response = AuthServices.register(email, password, confirmPassword);

    if (response.success) {
      showToast("Email registered successfully", "success");
      setTimeout(() => navigate("/login"), 500);
    } else {
      showToast(response.message || "Signup failed", "error");
    }
  }
  return (
    <AuthCard submitCallback={handleSignup} authPageName="Sign Up"></AuthCard>
  );
};

export { Signup };
