import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";
import { normalizeRole } from "../lib/auth";

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, isBootstrapping, user } = useAuth();
  const { locale } = useLanguage();
  const location = useLocation();
  const copy = getUiTranslations(locale);

  if (isBootstrapping) {
    return (
      <div className="page-shell py-24">
        <div className="premium-card mx-auto max-w-xl p-8 text-center">
          <p className="text-lg font-medium text-primary">{copy.protected.loading}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(normalizeRole(user?.role))) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
