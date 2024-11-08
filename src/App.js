import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Sidebar from './pages/admin/dashboard'
import Note from './pages/user/note'
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Sidebar/>}/>
        <Route path="/note" element={<Note/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
