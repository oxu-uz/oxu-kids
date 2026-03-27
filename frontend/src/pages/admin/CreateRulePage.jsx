import ProgramEditorForm from "../../components/admin/ProgramEditorForm";
import { useAdminOutlet } from "../../hooks/admin/useAdminOutlet";

function CreateRulePage() {
  const {
    copy,
    editingId,
    programForm,
    formErrors,
    handleProgramChange,
    handleProgramImageChange,
    handleProgramSubmit,
    resetProgramForm,
  } = useAdminOutlet();

  return (
    <div className="premium-card p-8">
      <ProgramEditorForm
        copy={copy}
        editingId={editingId}
        programForm={programForm}
        formErrors={formErrors}
        handleProgramChange={handleProgramChange}
        handleProgramImageChange={handleProgramImageChange}
        handleProgramSubmit={handleProgramSubmit}
        resetProgramForm={resetProgramForm}
      />
    </div>
  );
}

export default CreateRulePage;
