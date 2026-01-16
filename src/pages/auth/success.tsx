import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation, useNavigate } from "react-router-dom";

function AuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  if (token) {
    loginWithToken(token);
    navigate("/chat"); 
  }
}, [location]);

  return <div>Logging you in...</div>;
}

export default AuthSuccess;
