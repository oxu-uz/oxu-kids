import { CalendarPlus2 } from "lucide-react";
import InputField from "../../components/forms/InputField";
import { useAdminOutlet } from "../../hooks/admin/useAdminOutlet";
import { formatAgeGroup, localizeProgram } from "../../lib/programLocalization";

function AssignRulePage() {
  const {
    panelCopy,
    locale,
    children,
    programs,
    assignmentForm,
    assignmentErrors,
    handleAssignmentChange,
    handleAssignmentSubmit,
  } = useAdminOutlet();

  return (
    <div className="premium-card p-8">
      <div className="flex items-center gap-3">
        <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
          <CalendarPlus2 size={22} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary">{panelCopy.enrollmentManager.title}</h2>
          <p className="text-sm text-slate-600">{panelCopy.enrollmentManager.description}</p>
        </div>
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleAssignmentSubmit}>
        <InputField
          as="select"
          label={panelCopy.enrollmentManager.childLabel}
          name="childId"
          value={assignmentForm.childId}
          onChange={handleAssignmentChange}
          error={assignmentErrors.childId}
          options={[
            { value: "", label: panelCopy.enrollmentManager.childPlaceholder },
            ...children.map((child) => ({
              value: String(child.id),
              label: `${child.name} - ${child.parentName}`,
            })),
          ]}
        />
        <InputField
          as="select"
          label={panelCopy.enrollmentManager.programLabel}
          name="programId"
          value={assignmentForm.programId}
          onChange={handleAssignmentChange}
          error={assignmentErrors.programId}
          options={[
            { value: "", label: panelCopy.enrollmentManager.programPlaceholder },
            ...programs.map((program) => {
              const localizedProgram = localizeProgram(program, locale);

              return {
                value: String(program.id),
                label: `${localizedProgram.title} - ${formatAgeGroup(program.ageGroup, locale)}`,
              };
            }),
          ]}
        />

        <button
          type="submit"
          disabled={children.length === 0 || programs.length === 0}
          className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-primary transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
        >
          {panelCopy.enrollmentManager.submit}
        </button>
      </form>
    </div>
  );
}

export default AssignRulePage;
