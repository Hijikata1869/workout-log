import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { MyPage } from "./pages/MyPage";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
