import React from "react";
import { useState } from "react";

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { ChooseWorkspace } from "./modules/chooseWorkspace/ChooseWorkspace";
import { Signup, Login } from "./modules/auth/AuthComponents";

import { ToastProvider } from "./common/components/Snackbar/SnackbarContext";

import { getAuth } from "./common/utils/authUtil";
import WorkspaceDashboard from "./modules/workspaceDashboard/WorkspaceDashboard";
import PageNotFound from "./modules/PageNotFound";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ContentLayout from "./common/components/ContentLayout/ContentLayout";
export default function App() {
  const PrivateRoutes = () => {
    return getAuth() ? <Outlet /> : <Navigate to="/login" />;
  };
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<ChooseWorkspace />}></Route>
              <Route element={<ContentLayout />}>
                <Route
                  path="/:workspaceName"
                  element={<WorkspaceDashboard />}
                ></Route>
              </Route>
            </Route>

            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
