import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppSelector } from "@/store/hooks";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import AttendancePage from "./pages/AttendancePage";
import MarksPage from "./pages/MarksPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import AIStudyPlanPage from "./pages/AIStudyPlanPage";
import AIPredictorPage from "./pages/AIPredictorPage";
import AIComplaintsPage from "./pages/AIComplaintsPage";
import FaceAttendancePage from "./pages/FaceAttendancePage";
import GamificationPage from "./pages/GamificationPage";
import TimetablePage from "./pages/TimetablePage";
import AIChatbot from "./components/AIChatbot";
import NotFound from "./pages/NotFound";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useAppSelector(s => s.auth.isAuthenticated);
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/marks" element={<MarksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/ai-study-plan" element={<AIStudyPlanPage />} />
          <Route path="/ai-predictor" element={<AIPredictorPage />} />
          <Route path="/ai-complaints" element={<AIComplaintsPage />} />
          <Route path="/face-attendance" element={<FaceAttendancePage />} />
          <Route path="/gamification" element={<GamificationPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AIChatbot />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
