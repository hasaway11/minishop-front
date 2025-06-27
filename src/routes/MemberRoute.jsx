import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

function MemberRoute({element}) {
  const username = useAuthStore(state=>state.username);
  const role = useAuthStore(state=>state.role);


  if(username===null) return <Navigate to="/login" replace/>
  if(role!=='MEMBER') return <Navigate to="/e403" replace />
  return element;
}

export default MemberRoute