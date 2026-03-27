import { NavLink } from "react-router-dom";
import SidebarToggle from "./SidebarToggle";

function AdminSidebar({
  routes,
  collapsed,
  onToggleDesktop,
  mobileOpen,
  onOpenMobile,
  onCloseMobile,
  title,
  menuLabel,
}) {
  const navLinkClassName = ({ isActive }) =>
    `group relative flex items-center rounded-[24px] border px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
      collapsed ? "justify-center" : "gap-3"
    } ${
      isActive
        ? "border-secondary/45 bg-primary text-white shadow-glow"
        : "border-primary/10 bg-white/80 text-primary hover:border-secondary/40 hover:shadow-glow"
    }`;

  const tooltipClassName =
    "pointer-events-none absolute left-full top-1/2 z-30 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white shadow-soft group-hover:block";

  return (
    <>
      <button
        type="button"
        onClick={onOpenMobile}
        aria-label={menuLabel}
        data-no-scroll-reveal
        className="fixed left-4 top-24 z-40 inline-flex items-center gap-2 rounded-full border border-secondary/35 bg-white/95 px-5 py-3 text-sm font-semibold text-primary shadow-soft transition hover:shadow-glow xl:hidden"
      >
        {menuLabel}
      </button>

      <div
        data-no-scroll-reveal
        className={`fixed inset-0 z-30 bg-primary/25 backdrop-blur-sm transition xl:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onCloseMobile}
      />

      <aside
        data-no-scroll-reveal
        className={`fixed bottom-0 left-0 top-20 z-40 w-[320px] max-w-[88vw] transform border-r border-secondary/20 bg-cream/95 px-5 py-6 shadow-soft backdrop-blur-xl transition duration-300 xl:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="premium-card flex h-full flex-col overflow-hidden p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                {title}
              </p>
            </div>
            <SidebarToggle
              expanded={mobileOpen}
              onClick={onCloseMobile}
              mobile
              openLabel={menuLabel}
              closeLabel={menuLabel}
              className="h-11 w-11"
            />
          </div>

          <nav className="mt-6 flex-1 space-y-3 overflow-y-auto pr-1">
            {routes.map((route) => {
              const Icon = route.icon;

              return (
                <NavLink
                  key={route.path}
                  to={`/admin/${route.path}`}
                  onClick={onCloseMobile}
                  className={navLinkClassName}
                >
                  <span className="inline-flex rounded-2xl bg-white/15 p-2">
                    <Icon size={18} />
                  </span>
                  <span>{route.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>

      <div
        data-no-scroll-reveal
        className={`hidden shrink-0 transition-all duration-300 xl:block ${
          collapsed ? "w-24" : "w-[320px]"
        }`}
      >
        <div className="sticky top-24 h-[calc(100vh-7rem)]">
          <div
            className={`premium-card flex h-full flex-col overflow-hidden transition-all ${
              collapsed ? "p-3" : "p-6"
            }`}
          >
            <div className={`flex ${collapsed ? "justify-center" : "items-start justify-between gap-4"}`}>
              {!collapsed ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                    {title}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-primary">{menuLabel}</p>
                </div>
              ) : null}

              <SidebarToggle
                expanded={!collapsed}
                onClick={onToggleDesktop}
                openLabel={menuLabel}
                closeLabel={menuLabel}
                className="h-11 w-11 shrink-0"
              />
            </div>

            <nav className="mt-6 flex-1 space-y-3 overflow-y-auto pr-1">
              {routes.map((route) => {
                const Icon = route.icon;

                return (
                  <NavLink
                    key={route.path}
                    to={`/admin/${route.path}`}
                    aria-label={route.label}
                    title={collapsed ? route.label : undefined}
                    className={navLinkClassName}
                  >
                    <span className="inline-flex rounded-2xl bg-white/15 p-2">
                      <Icon size={18} />
                    </span>
                    {!collapsed ? <span>{route.label}</span> : null}
                    {collapsed ? <span className={tooltipClassName}>{route.label}</span> : null}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
