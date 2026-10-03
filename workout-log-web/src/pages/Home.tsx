import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { User } from "../types/user";

export const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return <p>読み込み中</p>;
  }

  if (user === null) {
    return null;
  }

  return (
    <>
      <p>ニックネーム：{user.nickname}</p>
      <p>Eメール：{user.email}</p>
    </>
  );
};
