import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const GuestOnly = ({ children }: { children: React.ReactNode }) => {
  const { status } = useAuth();

  if (status === "loading") {
    return <p>読み込み中</p>;
  }

  if (status === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
