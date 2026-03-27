import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/forms/InputField";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";
import { getDashboardPath } from "../lib/auth";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setApiError("");
  };

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      nextErrors.email = copy.login.validation.emailRequired;
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = copy.login.validation.emailInvalid;
    }

    if (!form.password) {
      nextErrors.password = copy.login.validation.passwordRequired;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await login(form);
      const from = location.state?.from?.pathname;
      const nextPath = from && from !== "/login" ? from : getDashboardPath(data.user.role);
      navigate(nextPath, { replace: true });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-shell pt-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr,1.05fr]">
        <div className="premium-card flex flex-col justify-center p-8 lg:p-10">
          <span className="hero-chip">{copy.login.badge}</span>
          <h1 className="mt-6 font-display text-4xl font-bold text-primary">
            {copy.login.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">{copy.login.description}</p>
        </div>

        <div className="premium-card p-8 lg:p-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField
              label={copy.login.emailLabel}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={copy.login.emailPlaceholder}
              error={errors.email}
            />
            <InputField
              label={copy.login.passwordLabel}
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder={copy.login.passwordPlaceholder}
              error={errors.password}
            />

            {apiError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {apiError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-midnight disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? copy.login.submitting : copy.login.submit}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            {copy.login.noAccount}{" "}
            <Link to="/register" className="font-semibold text-primary">
              {copy.login.registerLink}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
