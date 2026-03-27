import { Pencil, Trash2 } from "lucide-react";
import ProgramEditorForm from "../../components/admin/ProgramEditorForm";
import { useAdminOutlet } from "../../hooks/admin/useAdminOutlet";
import { formatAgeGroup, localizeProgram } from "../../lib/programLocalization";

function RulesPage() {
  const {
    copy,
    locale,
    loading,
    programs,
    editingId,
    programForm,
    formErrors,
    startEditingProgram,
    handleProgramChange,
    handleProgramImageChange,
    handleProgramSubmit,
    resetProgramForm,
    handleDeleteProgram,
  } = useAdminOutlet();

  const handleEditProgram = (program) => {
    if (editingId === program.id) {
      resetProgramForm();
      return;
    }

    startEditingProgram(program);
  };

  return (
    <div className="premium-card p-8">
      <h2 className="text-2xl font-semibold text-primary">{copy.adminDashboard.programsList.title}</h2>
      <p className="mt-2 text-sm text-slate-600">{copy.adminDashboard.programsList.description}</p>

      <div className="mt-8 space-y-5">
        {programs.map((program) => {
          const localizedProgram = localizeProgram(program, locale);
          const isEditing = editingId === program.id;

          return (
            <article
              key={program.id}
              className={`overflow-hidden rounded-[28px] border bg-white/70 transition ${
                isEditing ? "border-secondary/35 shadow-[0_24px_60px_rgba(212,175,55,0.18)]" : "border-primary/10"
              }`}
            >
              {program.imageUrl ? (
                <img
                  src={program.imageUrl}
                  alt={localizedProgram.title}
                  className="h-52 w-full object-cover"
                />
              ) : null}

              <div className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                      {formatAgeGroup(program.ageGroup, locale)}
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold text-primary">{localizedProgram.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{localizedProgram.description}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
                      {copy.adminDashboard.programsList.enrollmentCount(program.enrollmentCount)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditProgram(program)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isEditing
                          ? "border-secondary/35 bg-secondary/10 text-secondary"
                          : "border-primary/15 bg-white text-primary"
                      }`}
                    >
                      <Pencil size={15} />
                      {isEditing ? copy.adminDashboard.form.cancel : copy.adminDashboard.programsList.edit}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProgram(program.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                    >
                      <Trash2 size={15} />
                      {copy.adminDashboard.programsList.delete}
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="mt-6 border-t border-primary/10 pt-6">
                    <ProgramEditorForm
                      copy={copy}
                      editingId={editingId}
                      programForm={programForm}
                      formErrors={formErrors}
                      handleProgramChange={handleProgramChange}
                      handleProgramImageChange={handleProgramImageChange}
                      handleProgramSubmit={handleProgramSubmit}
                      resetProgramForm={resetProgramForm}
                      compact
                    />
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}

        {!loading && programs.length === 0 ? (
          <p className="text-sm text-slate-500">{copy.adminDashboard.programsList.empty}</p>
        ) : null}
      </div>
    </div>
  );
}

export default RulesPage;
