import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

type ErrorResponse = {
  errors: string[];
};

export const Home = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { user, status } = useAuth();

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       try {
  //         const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}session`, {
  //           method: "GET",
  //           credentials: "include",
  //         });
  //         if (res.ok) {
  //           const data = await res.json();
  //           setNickname(data.nickname);
  //           setEmail(data.email);
  //         } else {
  //           navigate("/login");
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchUser();
  //   }, [navigate]);

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
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            nickname: nickname,
            email: email,
          },
        }),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setNickname(data.nickname);
        setEmail(data.email);
        alert("更新しました");
      } else {
        alert("更新できませんでした");
      }
    } catch (error) {
      console.error(error);
      alert("通信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
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
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}users`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        alert("削除しました");
        navigate("/login");
      } else {
        const errorMessage: ErrorResponse = await res.json();
        alert(errorMessage.errors.join("\n"));
      }
    } catch (error) {
      console.error(error);
      alert("通信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClickLogOutButton = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}session`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("ログアウトしました");
        navigate("/login");
      } else {
        const errorMessage: ErrorResponse = await res.json();
        alert(errorMessage.errors.join("\n"));
      }
    } catch (error) {
      console.error(error);
      alert("通信失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <p>読み込み中</p>;
  }

  return (
    <>
      <h1 className="font-bold text-2xl pb-5">マイページ</h1>
      <button
        type="button"
        className="cursor-pointer p-3 rounded bg-sky-500 text-gray-100 hover:bg-sky-400 mb-10"
        onClick={onClickLogOutButton}
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
        <p className="font-bold text-5xl">{user.nickname}</p>
      </div>
    </>
  );
};
