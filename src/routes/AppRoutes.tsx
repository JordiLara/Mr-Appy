import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import ProtectedManagerRoute from "./ProtectedMangerRoute";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import TeamMemberRegister from "../pages/TeamMemberRegister";
import TeamInvites from "../pages/manager/TeamInvites";
import ManagerTeam from "../pages/manager/ManagerTeam";
import Activity from "../pages/Activity";
import MainLayout from "../components/layout/MainLayout";
import Calendar from "../pages/Calendar";
import Stats from "../pages/Stats";
import Team from "../pages/Team";
import Reviews from "../pages/manager/Reviews";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/team/join/:id_team" element={<TeamMemberRegister />} />
      {/* Protected routes with MainLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/activity" element={<Activity />} />{" "}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/team" element={<Team />} />
      </Route>
      {/* Manager protected routes */}
      <Route
        path="/"
        element={
          <ProtectedManagerRoute>
            <ManagerLayout />
          </ProtectedManagerRoute>
        }
      >
        <Route path="/manager/teaminvites" element={<TeamInvites />} />
        <Route
          path="/manager/managerdashboard"
          element={<ManagerDashboard />}
        />
        <Route path="/manager/managerteam" element={<ManagerTeam />} />
        <Route path="/manager/reviews" element={<Reviews />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
