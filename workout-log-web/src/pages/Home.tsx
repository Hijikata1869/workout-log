import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { user, logout, deleteAccount, updateUser } = useAuth();

  const [nickname, setNickname] = useState(user!.nickname);
  const [email, setEmail] = useState(user!.email);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onClickSubmitForm = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsSubmitting(true);
    const result = await updateUser(nickname, email);
    if (result.ok) {
      alert("登録情報を更新しました");
    } else {
      alert(result.errors.join("\n"));
    }
    setIsSubmitting(false);
  };

  const onClickDeleteButton = async () => {
    if (
      !window.confirm(
        "アカウントを削除します。この操作は取り消せません。よろしいですか？",
      )
    ) {
      return;
    }

    setIsSubmitting(true);
    const result = await deleteAccount();
    if (result.ok) {
      alert("アカウントを削除しました");
    } else {
      alert(result.errors.join("\n"));
    }
    setIsSubmitting(false);
  };

  const onClickLogout = async () => {
    setIsSubmitting(true);
    const result = await logout();
    if (result.ok) {
      alert("ログアウトしました");
    } else {
      alert(result.errors.join("\n"));
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="font-bold text-2xl pb-5">マイページ</h1>
      <button
        type="button"
        className="cursor-pointer p-3 rounded bg-sky-500 text-gray-100 hover:bg-sky-400 mb-10"
        onClick={onClickLogout}
        disabled={isSubmitting}
      >
        ログアウト
      </button>
      <div>
        <form className="mb-10" onSubmit={onClickSubmitForm}>
          <label>
            ニックネーム：
            <input
              className="border mb-3"
              name="nickname"
              type="text"
              onChange={onChangeNickname}
              value={nickname}
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
            />
          </label>
          <br />
          <button
            className="mt-5 p-3 cursor-pointer bg-gray-500 text-gray-100 rounded hover:bg-gray-400"
            disabled={isSubmitting}
            type="submit"
          >
            登録情報の更新
          </button>
        </form>
      </div>
      <div>
        <button
          className="p-3 bg-red-500 text-white cursor-pointer rounded hover:bg-red-400"
          onClick={onClickDeleteButton}
          type="button"
          disabled={isSubmitting}
        >
          アカウントを削除
        </button>
      </div>
      <div>
        <p className="font-bold text-5xl">{user?.nickname}</p>
      </div>
    </>
  );
};
