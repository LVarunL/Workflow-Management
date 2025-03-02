import React from "react";
import { useState } from "react";

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { ChooseWorkspace } from "./modules/chooseWorkspace/ChooseWorkspace";
import { Signup, Login } from "./modules/auth/AuthComponents";

import { ToastProvider } from "./common/components/Snackbar/SnackbarContext";

import { getAuth } from "./common/utils/authUtil";
export default function App() {
  const PrivateRoutes = () => {
    return getAuth() ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<ChooseWorkspace />}></Route>
          </Route>

          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
