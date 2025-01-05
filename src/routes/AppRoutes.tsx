import { Route, Routes } from "react-router-dom";
//import ProtectedRoute from "../routes/ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TeamInvites from "../pages/TeamInvites";
import ManagerHome from "../pages/managerScreen/ManagerHome";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/teaminvites" element={<TeamInvites />} />
      <Route path="/manager" element={<ManagerHome />} />
    </Routes>
  );
};

export default AppRoutes;
