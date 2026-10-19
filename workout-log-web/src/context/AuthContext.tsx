import { createContext, useContext, useState, useEffect } from "react";

type User = { id: number; nickname: string; email: string };

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type Result = { ok: true } | { ok: false; errors: string[] };

type SignupParams = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  logout: () => Promise<Result>;
  login: (email: string, password: string) => Promise<Result>;
  signup: (params: SignupParams) => Promise<Result>;
  deleteAccount: () => Promise<Result>;
};

type ErrorResponse = {
  errors: string[];
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

  const logout = async (): Promise<Result> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}session`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        setStatus("unauthenticated");
        return { ok: true };
      } else {
        const errorResponse: ErrorResponse = await res.json();
        const errorMessages = errorResponse.errors;
        return { ok: false, errors: errorMessages };
      }
    } catch (error) {
      console.error(error);
      return { ok: false, errors: ["通信に失敗しました"] };
    }
  };

  const login = async (email: string, password: string): Promise<Result> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      });

      if (res.ok) {
        const data: User = await res.json();
        setUser(data);
        setStatus("authenticated");
        return { ok: true };
      } else {
        const errorResponse: ErrorResponse = await res.json();
        const errorMessages = errorResponse.errors;
        return { ok: false, errors: errorMessages };
      }
    } catch (error) {
      console.error(error);
      return { ok: false, errors: ["通信に失敗しました"] };
    }
  };

  const signup = async (params: SignupParams): Promise<Result> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            nickname: params.nickname,
            email: params.email,
            password: params.password,
            password_confirmation: params.passwordConfirmation,
          },
        }),
        credentials: "include",
      });

      if (res.ok) {
        const data: User = await res.json();
        setUser(data);
        setStatus("authenticated");
        return { ok: true };
      } else {
        const errorResponse: ErrorResponse = await res.json();
        const errorMessages = errorResponse.errors;
        return { ok: false, errors: errorMessages };
      }
    } catch (error) {
      console.error(error);
      return { ok: false, errors: ["通信に失敗しました"] };
    }
  };

  const deleteAccount = async (): Promise<Result> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}users`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        setStatus("unauthenticated");
        return { ok: true };
      } else {
        const errorResponse: ErrorResponse = await res.json();
        const errorMessages = errorResponse.errors;
        return { ok: false, errors: errorMessages };
      }
    } catch (error) {
      console.error(error);
      return { ok: false, errors: ["通信に失敗しました"] };
    }
  };

  return (
    <AuthContext value={{ user, status, logout, login, signup, deleteAccount }}>
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error("AuthProviderの中で呼んでください");
  }

  return value;
};
