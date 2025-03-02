import React from "react";
import { AuthCard } from "./AuthCard";
const ForgotPassword = function () {
    const handleForgotPassword = function(){
        console.log("Logged in");
    }
  return (
    <AuthCard submitCallback={handleForgotPassword} authPageName="Forgot Password">
      
    </AuthCard>
  );
};

export { ForgotPassword };
