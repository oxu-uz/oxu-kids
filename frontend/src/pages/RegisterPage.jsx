import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/forms/InputField";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";
import { getDashboardPath } from "../lib/auth";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setApiError("");
  };

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/;

    if (!form.name.trim()) {
      nextErrors.name = copy.register.validation.nameRequired;
    }

    if (!form.email.trim()) {
      nextErrors.email = copy.register.validation.emailRequired;
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = copy.register.validation.emailInvalid;
    }

    if (!form.password) {
      nextErrors.password = copy.register.validation.passwordRequired;
    } else if (form.password.length < 8 || !strongPasswordPattern.test(form.password)) {
      nextErrors.password = copy.register.validation.passwordWeak;
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
      const data = await register(form);
      navigate(getDashboardPath(data.user.role), { replace: true });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-shell pt-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr,1.05fr]">
        <div className="premium-card p-8 lg:p-10">
          <span className="hero-chip">{copy.register.badge}</span>
          <h1 className="mt-6 font-display text-4xl font-bold text-primary">
            {copy.register.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {copy.register.description}
          </p>

          <div className="mt-8 rounded-[28px] bg-white/90 p-6 shadow-soft">
            <div className="inline-flex rounded-2xl bg-secondary/15 p-3 text-secondary">
              <Sparkles size={22} />
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {copy.register.securityText}
            </p>
          </div>
        </div>

        <div className="premium-card p-8 lg:p-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField
              label={copy.register.nameLabel}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={copy.register.namePlaceholder}
              error={errors.name}
            />
            <InputField
              label={copy.register.emailLabel}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={copy.register.emailPlaceholder}
              error={errors.email}
            />
            <InputField
              label={copy.register.passwordLabel}
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder={copy.register.passwordPlaceholder}
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
              {isSubmitting ? copy.register.submitting : copy.register.submit}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            {copy.register.hasAccount}{" "}
            <Link to="/login" className="font-semibold text-primary">
              {copy.register.loginLink}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
