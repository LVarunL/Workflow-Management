import React, { useState } from "react";
import { AuthCard } from "./AuthCard";
import { useNavigate } from "react-router";
import AuthServices from "../../services/authServices";
import { useToast } from "../../common/components/Snackbar/SnackbarContext";
import { ToastSeverity } from "../../common/utils/enums";
const Login = function () {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const handleLogin = function (email: string, password: string) {
    const response = AuthServices.login(email, password);

    if (response.success) {
      showToast("Login Successful", ToastSeverity.SUCCESS);
      navigate("/");
    } else {
      showToast(response.message || "Login failed", ToastSeverity.ERROR);
    }
  };

  return (
    <AuthCard submitCallback={handleLogin} authPageName="Login"></AuthCard>
  );
};

export { Login };
