import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";

import { userAtom } from "../../hooks/useUser";

export interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user] = useAtom(userAtom);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
