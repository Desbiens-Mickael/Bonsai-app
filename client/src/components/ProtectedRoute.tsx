import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAllowed: Promise<boolean> | boolean;
  redirectTo?: string;
  children?: React.ReactNode;
}

export default function ProtectedRoute({
  isAllowed,
  redirectTo = "/",
  children,
}: ProtectedRouteProps) {
  if (isAllowed === false) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
