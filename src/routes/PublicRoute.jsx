import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

function PublicRoute({element}) {
  console.log("========Public==============")
  const role = useAuthStore(state=>state.role);
  return role? <Navigate to="/" replace />:element;
}

export default PublicRoute