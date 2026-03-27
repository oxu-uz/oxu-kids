import { useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AdminLayout from '../components/admin/AdminLayout';
import { useAuth } from '../hooks/useAuth';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getDashboardPath } from '../lib/auth';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import GalleryPage from '../pages/GalleryPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ParentDashboardPage from '../pages/ParentDashboardPage';
import ProgramsPage from '../pages/ProgramsPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from '../routes/ProtectedRoute';
import { adminRouteDefinitions } from '../routes/adminRoutes';

function DashboardRedirect() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDashboardPath(user?.role)} replace />;
}

function MainLayout() {
  const location = useLocation();
  const stageRef = useRef(null);

  useScrollReveal(stageRef, location.pathname);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="pb-8">
        <div ref={stageRef} key={location.pathname} className="route-stage route-stage-enter">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route
              path="/user"
              element={
                <ProtectedRoute allowedRoles={['USER']}>
                  <ParentDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/parent" element={<Navigate to="/user" replace />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="overview" replace />} />
              {adminRouteDefinitions.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
