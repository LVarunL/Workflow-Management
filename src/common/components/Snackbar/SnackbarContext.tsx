import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { ToastSeverity } from "../../utils/enums";
type ToastContextType = {
  showToast: (message: string, severity?: ToastSeverity) => void;
};

interface ToastState {
  open: boolean;
  message: string;
  severity: ToastSeverity;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: ToastSeverity.SUCCESS,
  });

  const showToast = (message: string, severity: ToastSeverity) => {
    setToast({ open: true, message, severity });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};
