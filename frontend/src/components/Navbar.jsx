import { Menu, Moon, ShieldCheck, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import crestLogo from "../assets/oxu-kids-crest.png";
import AnimatedLogoIntro from "./home/AnimatedLogoIntro";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { getUiTranslations } from "../i18n/ui";
import { getDashboardPath, isAdminRole } from "../lib/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { locale, setLocale, languages } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const copy = getUiTranslations(locale);
  const darkLabel = copy.nav.themeDark ?? "Dark mode";
  const lightLabel = copy.nav.themeLight ?? "Light mode";
  const isHomePage = location.pathname === "/";

  const dashboardPath = getDashboardPath(user?.role);
  const dashboardLabel = isAdminRole(user?.role)
    ? copy.nav.adminDashboard
    : copy.nav.parentDashboard;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const linkClassName = ({ isActive }) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "border-secondary/45 bg-primary text-white shadow-glow"
        : "border-transparent text-primary hover:border-secondary/25 hover:bg-white/95 hover:text-primary"
    }`;

  const renderThemeToggleButton = () => (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-button shrink-0"
      aria-label={isDark ? lightLabel : darkLabel}
      title={isDark ? lightLabel : darkLabel}
    >
      <span
        className={`theme-toggle-orb ${isDark ? "translate-x-[2.15rem]" : "translate-x-0"}`}
      />
      <span className={`theme-toggle-icon ${!isDark ? "theme-toggle-icon-active" : ""}`}>
        <Sun size={16} />
      </span>
      <span className={`theme-toggle-icon ${isDark ? "theme-toggle-icon-active" : ""}`}>
        <Moon size={16} />
      </span>
    </button>
  );

  const renderLanguageButtons = () => (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {copy.nav.languageLabel}
      </span>
      <div className="inline-flex rounded-full border border-secondary/20 bg-white/90 p-1 shadow-sm">
        {languages.map((language) => {
          const isActive = locale === language.code;

          return (
            <button
              key={language.code}
              type="button"
              onClick={() => setLocale(language.code)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                isActive
                  ? "bg-primary text-white shadow-glow"
                  : "text-primary hover:bg-primary/10"
              }`}
              aria-pressed={isActive}
            >
              {language.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/40 bg-cream/80 backdrop-blur-xl">
        <div className="w-full px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
        <div className="premium-card ornament-frame flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5">
          <Link to="/" className="flex items-center gap-4">
            <AnimatedLogoIntro
              src={crestLogo}
              alt={copy.common.crestAlt}
              play={isHomePage}
              className="h-[4.8125rem] w-[4.8125rem] shrink-0 sm:h-[5.7125rem] sm:w-[5.7125rem]"
            />
            <div>
              <p className="font-display text-2xl font-bold text-primary">OXU KIDS</p>
              <p className="text-xs uppercase tracking-[0.24em] text-secondary">
                {copy.nav.brandTagline}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {copy.nav.links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClassName}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-end gap-3 lg:flex lg:flex-col">
            <div className="flex items-center gap-3">
              {renderLanguageButtons()}
              {renderThemeToggleButton()}
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to={dashboardPath}
                    className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-white/90 px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-secondary hover:shadow-glow"
                  >
                    <ShieldCheck size={16} />
                    {dashboardLabel}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-midnight"
                  >
                    {copy.nav.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-full px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                  >
                    {copy.nav.login}
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-primary transition hover:shadow-glow"
                  >
                    {copy.nav.register}
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {renderThemeToggleButton()}
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="inline-flex rounded-2xl border border-primary/10 bg-white/80 p-3 text-primary"
              aria-label={copy.nav.menuLabel}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="premium-card mt-3 space-y-3 p-4 lg:hidden">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {renderLanguageButtons()}
            </div>

            {copy.nav.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={linkClassName}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="border-t border-primary/10 pt-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to={dashboardPath}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-full border border-secondary/30 bg-white px-4 py-3 text-sm font-semibold text-primary"
                  >
                    {dashboardLabel}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white"
                  >
                    {copy.nav.logout}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-full border border-primary/10 bg-white px-4 py-3 text-sm font-semibold text-primary"
                  >
                    {copy.nav.login}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-full bg-secondary px-4 py-3 text-center text-sm font-semibold text-primary"
                  >
                    {copy.nav.register}
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : null}
        </div>
      </header>
    </>
  );
}

export default Navbar;
