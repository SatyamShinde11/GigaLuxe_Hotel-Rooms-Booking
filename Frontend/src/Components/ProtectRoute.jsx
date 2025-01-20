import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const AdminKey = sessionStorage.getItem("Admin");

    if (!AdminKey || AdminKey === "null" || AdminKey === "undefined") {
      navigate("/admin/login");
    }
  }, [navigate])
  return <>{children}</>;
}

export default ProtectRoute;
