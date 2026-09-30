import { Link } from "react-router";

export const Home = () => {
  return (
    <>
      <h1 className="font-bold text-3xl mb-10">トップ</h1>
      <Link to="/login">ログイン画面へ</Link>
    </>
  );
};
