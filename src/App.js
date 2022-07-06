import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminHome from "./Components/Admin/AdminNav/SideNav";
import Home from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import AdminLogin from "./Components/Admin/Login/Login"
import Cookies from "js-cookie";
const token = Cookies.get('token')??false

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUpPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
