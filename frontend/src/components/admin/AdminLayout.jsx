import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import PageHero from "../PageHero";
import { useAdminPanelData } from "../../hooks/admin/useAdminPanelData";
import { getAdminRoutes } from "../../routes/adminRoutes";

function AdminLayout() {
  const location = useLocation();
  const adminData = useAdminPanelData();
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const routes = useMemo(
    () =>
      getAdminRoutes({
        copy: adminData.copy,
        panelCopy: adminData.panelCopy,
        superAdminMode: adminData.superAdminMode,
      }),
    [adminData.copy, adminData.panelCopy, adminData.superAdminMode],
  );

  const currentRoute = routes.find((route) => location.pathname === `/admin/${route.path}`) ?? routes[0];

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  if (!currentRoute) {
    return <Navigate to="/admin/overview" replace />;
  }

  return (
    <>
      <section className="page-shell-fluid mt-10">
        <div className="xl:flex xl:items-start xl:gap-8">
          <AdminSidebar
            routes={routes}
            collapsed={isDesktopCollapsed}
            onToggleDesktop={() => setIsDesktopCollapsed((current) => !current)}
            mobileOpen={isMobileOpen}
            onOpenMobile={() => setIsMobileOpen(true)}
            onCloseMobile={() => setIsMobileOpen(false)}
            title={adminData.panelCopy.menu.title}
            menuLabel={adminData.menuLabel}
          />

          <div className="min-w-0 flex-1 space-y-8">
            <PageHero
              badge={adminData.menuLabel}
              title={currentRoute.title}
              description={currentRoute.description}
              shellClassName="max-w-none px-0 pt-0"
            />

            {adminData.message ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
                {adminData.message}
              </div>
            ) : null}

            {adminData.error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
                {adminData.error}
              </div>
            ) : null}

            <div className="space-y-8">
              <Outlet context={adminData} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminLayout;
