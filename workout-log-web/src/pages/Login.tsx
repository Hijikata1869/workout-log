import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onClickSubmitForm = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsSubmitting(true);
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
        navigate("/");
      } else {
        setEmail("");
        setPassword("");
        alert("ログイン失敗！");
      }
    } catch (error) {
      console.error(error);
      alert("通信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="font-bold text-3xl mb-10">ログイン</h1>
      <form className="mb-10" onSubmit={onClickSubmitForm}>
        <label>
          Eメール：
          <input
            className="border mb-3"
            name="email"
            type="email"
            onChange={onChangeEmail}
            value={email}
          />
        </label>
        <br />
        <label>
          パスワード：
          <input
            className="border mb-3"
            name="password"
            type="password"
            onChange={onChangePassword}
            value={password}
          />
        </label>
        <br />
        <button
          className="p-3 cursor-pointer bg-gray-500 text-gray-100 rounded hover:bg-gray-400"
          disabled={isSubmitting}
        >
          ログイン
        </button>
      </form>
      <Link to="/">トップ画面へ</Link>
    </>
  );
};
