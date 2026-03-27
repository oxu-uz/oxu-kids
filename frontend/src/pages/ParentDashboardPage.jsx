import { Baby, BookOpen, CalendarPlus2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import InputField from "../components/forms/InputField";
import PageHero from "../components/PageHero";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";
import { apiFetch } from "../lib/api";
import { formatAgeGroup, localizeProgram } from "../lib/programLocalization";

function ParentDashboardPage() {
  const { token, user } = useAuth();
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const [children, setChildren] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [childErrors, setChildErrors] = useState({});
  const [enrollmentErrors, setEnrollmentErrors] = useState({});
  const [childForm, setChildForm] = useState({ name: "", age: "3" });
  const [enrollmentForm, setEnrollmentForm] = useState({ childId: "", programId: "" });

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [childrenData, programsData] = await Promise.all([
        apiFetch("/children", { token }),
        apiFetch("/programs", { token }),
      ]);

      setChildren(childrenData);
      setPrograms(programsData);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  useEffect(() => {
    if (children.length > 0 && !children.some((child) => String(child.id) === enrollmentForm.childId)) {
      setEnrollmentForm((current) => ({ ...current, childId: String(children[0].id) }));
    }

    if (children.length === 0) {
      setEnrollmentForm((current) => ({ ...current, childId: "" }));
    }
  }, [children, enrollmentForm.childId]);

  useEffect(() => {
    if (programs.length > 0 && !programs.some((program) => String(program.id) === enrollmentForm.programId)) {
      setEnrollmentForm((current) => ({ ...current, programId: String(programs[0].id) }));
    }

    if (programs.length === 0) {
      setEnrollmentForm((current) => ({ ...current, programId: "" }));
    }
  }, [programs, enrollmentForm.programId]);

  const handleChildChange = (event) => {
    const { name, value } = event.target;
    setChildForm((current) => ({ ...current, [name]: value }));
    setChildErrors((current) => ({ ...current, [name]: "" }));
    setMessage("");
    setError("");
  };

  const handleEnrollmentChange = (event) => {
    const { name, value } = event.target;
    setEnrollmentForm((current) => ({ ...current, [name]: value }));
    setEnrollmentErrors((current) => ({ ...current, [name]: "" }));
    setMessage("");
    setError("");
  };

  const validateChildForm = () => {
    const nextErrors = {};
    const age = Number(childForm.age);

    if (!childForm.name.trim()) {
      nextErrors.name = copy.parentDashboard.validation.childNameRequired;
    }

    if (!age || age < 3 || age > 7) {
      nextErrors.age = copy.parentDashboard.validation.ageRange;
    }

    setChildErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateEnrollmentForm = () => {
    const nextErrors = {};

    if (!enrollmentForm.childId) {
      nextErrors.childId = copy.parentDashboard.validation.childRequired;
    }

    if (!enrollmentForm.programId) {
      nextErrors.programId = copy.parentDashboard.validation.programRequired;
    }

    setEnrollmentErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleAddChild = async (event) => {
    event.preventDefault();

    if (!validateChildForm()) {
      return;
    }

    try {
      await apiFetch("/children", {
        method: "POST",
        token,
        body: {
          name: childForm.name,
          age: Number(childForm.age),
        },
      });

      setChildForm({ name: "", age: "3" });
      setMessage(copy.parentDashboard.success.childAdded);
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const handleEnrollment = async (event) => {
    event.preventDefault();

    if (!validateEnrollmentForm()) {
      return;
    }

    try {
      await apiFetch("/enrollments", {
        method: "POST",
        token,
        body: {
          childId: Number(enrollmentForm.childId),
          programId: Number(enrollmentForm.programId),
        },
      });

      setMessage(copy.parentDashboard.success.enrolled);
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const totalEnrollments = children.reduce(
    (count, child) => count + child.enrollments.length,
    0,
  );

  return (
    <>
      <PageHero
        badge={copy.parentDashboard.badge}
        title={copy.parentDashboard.heroTitle(user?.name)}
        description={copy.parentDashboard.heroDescription}
      />

      <section className="page-shell mt-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: copy.parentDashboard.stats.children, value: children.length, icon: Baby },
            {
              title: copy.parentDashboard.stats.enrollments,
              value: totalEnrollments,
              icon: CalendarPlus2,
            },
            { title: copy.parentDashboard.stats.programs, value: programs.length, icon: BookOpen },
          ].map(({ title, value, icon: Icon }) => (
            <div key={title} className="premium-card p-6">
              <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                <Icon size={22} />
              </div>
              <p className="mt-5 text-sm uppercase tracking-[0.2em] text-secondary">{title}</p>
              <p className="mt-3 text-4xl font-semibold text-primary">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell mt-10">
        {message ? (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}
        {error ? (
          <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[0.95fr,1.05fr]">
          <div className="space-y-8">
            <div className="premium-card p-8">
              <div className="flex items-center gap-3">
                <div className="inline-flex rounded-2xl bg-secondary/15 p-3 text-secondary">
                  <PlusCircle size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-primary">
                    {copy.parentDashboard.addChild.title}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {copy.parentDashboard.addChild.description}
                  </p>
                </div>
              </div>

              <form className="mt-6 space-y-5" onSubmit={handleAddChild}>
                <InputField
                  label={copy.parentDashboard.addChild.nameLabel}
                  name="name"
                  value={childForm.name}
                  onChange={handleChildChange}
                  placeholder={copy.parentDashboard.addChild.namePlaceholder}
                  error={childErrors.name}
                />
                <InputField
                  label={copy.parentDashboard.addChild.ageLabel}
                  name="age"
                  type="number"
                  min="3"
                  max="7"
                  value={childForm.age}
                  onChange={handleChildChange}
                  error={childErrors.age}
                />
                <button
                  type="submit"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-midnight"
                >
                  {copy.parentDashboard.addChild.submit}
                </button>
              </form>
            </div>

            <div className="premium-card p-8">
              <div className="flex items-center gap-3">
                <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                  <CalendarPlus2 size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-primary">
                    {copy.parentDashboard.enrollment.title}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {copy.parentDashboard.enrollment.description}
                  </p>
                </div>
              </div>

              <form className="mt-6 space-y-5" onSubmit={handleEnrollment}>
                <InputField
                  as="select"
                  label={copy.parentDashboard.enrollment.childLabel}
                  name="childId"
                  value={enrollmentForm.childId}
                  onChange={handleEnrollmentChange}
                  error={enrollmentErrors.childId}
                  options={[
                    {
                      value: "",
                      label: copy.parentDashboard.enrollment.childPlaceholder,
                    },
                    ...children.map((child) => ({
                      value: String(child.id),
                      label: `${child.name} (${copy.parentDashboard.childAge(child.age)})`,
                    })),
                  ]}
                />
                <InputField
                  as="select"
                  label={copy.parentDashboard.enrollment.programLabel}
                  name="programId"
                  value={enrollmentForm.programId}
                  onChange={handleEnrollmentChange}
                  error={enrollmentErrors.programId}
                  options={[
                    {
                      value: "",
                      label: copy.parentDashboard.enrollment.programPlaceholder,
                    },
                    ...programs.map((program) => {
                      const localizedProgram = localizeProgram(program, locale);

                      return {
                        value: String(program.id),
                        label: `${localizedProgram.title} - ${formatAgeGroup(
                          program.ageGroup,
                          locale,
                        )}`,
                      };
                    }),
                  ]}
                />
                <button
                  type="submit"
                  disabled={children.length === 0 || programs.length === 0}
                  className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-primary transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {copy.parentDashboard.enrollment.submit}
                </button>
              </form>
            </div>
          </div>

          <div className="premium-card p-8">
            <h2 className="text-2xl font-semibold text-primary">
              {copy.parentDashboard.childrenList.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {copy.parentDashboard.childrenList.description}
            </p>

            {loading ? (
              <p className="mt-8 text-sm text-slate-500">
                {copy.parentDashboard.childrenList.loading}
              </p>
            ) : null}

            {!loading && children.length === 0 ? (
              <div className="mt-8 rounded-[28px] border border-dashed border-primary/20 bg-primary/5 px-6 py-10 text-center">
                <p className="text-lg font-medium text-primary">
                  {copy.parentDashboard.childrenList.emptyTitle}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {copy.parentDashboard.childrenList.emptyDescription}
                </p>
              </div>
            ) : null}

            <div className="mt-8 space-y-5">
              {children.map((child) => (
                <article key={child.id} className="rounded-[28px] border border-primary/10 bg-white/70 p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-primary">{child.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {copy.parentDashboard.childAge(child.age)}
                      </p>
                    </div>
                    <span className="rounded-full bg-secondary/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                      {copy.parentDashboard.enrollmentCount(child.enrollments.length)}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {child.enrollments.length > 0 ? (
                      child.enrollments.map((item) => {
                        const localizedProgram = localizeProgram(
                          {
                            title: item.programTitle,
                            description: "",
                            ageGroup: item.ageGroup,
                          },
                          locale,
                        );

                        return (
                          <div
                            key={item.enrollmentId}
                            className="rounded-2xl border border-secondary/20 bg-secondary/10 px-4 py-3 text-sm text-primary"
                          >
                            <p className="font-semibold">{localizedProgram.title}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-secondary">
                              {formatAgeGroup(item.ageGroup, locale)}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-slate-600">
                        {copy.parentDashboard.childrenList.notEnrolled}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ParentDashboardPage;
