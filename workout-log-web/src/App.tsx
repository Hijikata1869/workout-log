import { Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { RequireAuth } from "./components/RequireAuth";
import { GuestOnly } from "./components/GuestOnly";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          index
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="login"
          element={
            <GuestOnly>
              <Login />
            </GuestOnly>
          }
        />
        <Route
          path="signup"
          element={
            <GuestOnly>
              <SignUp />
            </GuestOnly>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
