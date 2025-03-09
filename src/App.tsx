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
import ProjectPage from "./modules/projectPage/ProjectPage";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import People from "./modules/People";
import Projects from "./modules/Project";
export default function App() {
  const PrivateRoutes = () => {
    return getAuth() ? <Outlet /> : <Navigate to="/login" />;
  };
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<ChooseWorkspace />}></Route>
                <Route element={<ContentLayout />}>
                  <Route
                    path="/:workspaceId"
                    element={<WorkspaceDashboard />}
                  ></Route>
                  <Route
                    path="/:workspaceId/:projectId"
                    element={<ProjectPage />}
                  ></Route>
                  <Route
                    path="/:workspaceId/people"
                    element={<People />}
                  ></Route>
                  <Route
                    path="/:workspaceId/:projectId/people"
                    element={<People />}
                  ></Route>
                  <Route
                    path="/:workspaceId/projects"
                    element={<Projects />}
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
    </Provider>
  );
}
