import { Route, Routes } from "react-router-dom";
//import ProtectedRoute from "../routes/ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TeamInvites from "../pages/TeamInvites";
import ManagerHome from "../pages/managerScreen/ManagerHome";
import Activity from "../pages/Activity";
import MainLayout from "../components/layout/MainLayout";
import Calendar from "../pages/Calendar";
import Stats from "../pages/Stats";
import Team from "../pages/Team";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Protected routes with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route path="/activity" element={<Activity />} /> {/*might change that path name*/}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/team" element={<Team />} />
      </Route>
      {/* Other standalone routes */}
      <Route path="/teaminvites" element={<TeamInvites />} />
      <Route path="/manager" element={<ManagerHome />} />
    </Routes>
  );
};

export default AppRoutes;
