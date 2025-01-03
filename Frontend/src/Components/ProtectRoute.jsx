import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const AdminCom = children;

  if (true) {
    return AdminCom;
  } else {
    window.location = "/";
  } 
}

export default ProtectRoute;
