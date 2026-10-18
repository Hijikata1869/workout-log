import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export const SignUp = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onChangePasswordConfirmation = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirmation(event.target.value);
  };

  const onClickSubmitForm = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    const result = await signup({
      nickname,
      email,
      password,
      passwordConfirmation,
    });

    if (result.ok) {
      alert("会員登録が完了しました");
    } else {
      alert(result.errors.join("\n"));
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="font-bold text-3xl mb-10">新規登録</h1>
      <form className="mb-10" onSubmit={onClickSubmitForm}>
        <label>
          ニックネーム：
          <input
            className="border mb-3"
            name="nickname"
            type="text"
            onChange={onChangeNickname}
            value={nickname}
            required
          />
        </label>
        <br />
        <label>
          Eメール：
          <input
            className="border mb-3"
            name="email"
            type="email"
            onChange={onChangeEmail}
            value={email}
            required
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
            required
          />
        </label>
        <br />
        <label>
          パスワード（確認用）：
          <input
            className="border mb-3"
            name="passwordConfirmation"
            type="password"
            onChange={onChangePasswordConfirmation}
            value={passwordConfirmation}
            required
          />
        </label>
        <br />
        <button
          className="p-3 cursor-pointer bg-gray-500 text-gray-100 rounded hover:bg-gray-400"
          disabled={isSubmitting}
          type="submit"
        >
          新規登録
        </button>
      </form>
      <Link to="/login">ログインはこちら</Link>
    </>
  );
};
