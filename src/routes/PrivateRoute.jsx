import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

function PrivateRoute({element}) {
  const role = useAuthStore(state=>state.role);
  
  // useAuthInit이 실행중이라면
  if(role===undefined) return;

  return !role? <Navigate to="/account/login" replace />:element;
}

export default PrivateRoute