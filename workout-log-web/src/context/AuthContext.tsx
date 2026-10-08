import { createContext, useContext, useState, useEffect } from "react";

type User = { nickname: string };

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}session`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error(error);
        setStatus("unauthenticated");
      }
    };
    fetchUser();
  }, []);

  return <AuthContext value={{ user, status }}>{children}</AuthContext>;
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error("AuthProviderの中で呼んでください");
  }

  return value;
};
