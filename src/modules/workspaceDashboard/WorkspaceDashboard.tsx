import React from "react";
import { useLocation } from "react-router";
export default function WorkspaceDashboard() {
  const location = useLocation();
  return <div>WorkspaceDashboard {location.pathname}</div>;
}
