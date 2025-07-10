import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

function PublicRoute({element}) {
  console.log("========Public==============")
  const componentName = element?.type?.name || element?.type?.displayName || typeof element?.type;

  console.log("Element name:", componentName);

  const role = useAuthStore(state=>state.role);

  return role? <Navigate to="/" replace />:element;
}

export default PublicRoute