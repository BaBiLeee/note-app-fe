import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Sidebar from "./pages/admin/dashboard";
import Note from "./pages/user/note";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import DeadPage from "./components/deadpage";
import GetOut from "./components/getout";
import DashBoard from "./pages/admin/dashboard";
function App() {
  const token = Cookies.get("token");
  const admin = Cookies.get("admin");
  console.log("admin", typeof admin);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/deadpage" element={<DeadPage />} />
        <Route path="/getout" element={<GetOut />} />

        <Route
          path="/dashboard"
          element={
            token ? (
              admin == "true" ? (
                <DashBoard />
              ) : (
                <Navigate to="/getout" replace />
              )
            ) : (
              <Navigate to="/deadpage" replace />
            )
          }
        />

        <Route
          path="/note"
          element={token ? <Note /> : <Navigate to="/deadpage" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
