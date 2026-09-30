import { useState, useEffect } from "react";
import type { User } from "../types/user";

export const MyPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}session`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <h1>マイページ</h1>
      <p>ニックネーム：{user?.nickname}</p>
      <p>Eメール：{user?.email}</p>
    </>
  );
};
