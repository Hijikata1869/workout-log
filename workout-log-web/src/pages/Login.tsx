import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmitLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.ok) {
      alert("ログインしました");
    } else {
      alert(result.errors.join("\n"));
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="font-bold text-3xl mb-10">ログイン</h1>
      <form className="mb-10" onSubmit={onSubmitLogin}>
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
      <Link to="/signup">新規登録はこちら</Link>
    </>
  );
};
