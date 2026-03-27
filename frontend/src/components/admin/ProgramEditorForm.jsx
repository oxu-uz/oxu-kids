import { PlusCircle, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import InputField from "../forms/InputField";

function ProgramEditorForm({
  copy,
  editingId,
  programForm,
  formErrors,
  handleProgramChange,
  handleProgramImageChange,
  handleProgramSubmit,
  resetProgramForm,
  showHeader = true,
  compact = false,
}) {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!programForm.imageFile) {
      setPreviewUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(programForm.imageFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [programForm.imageFile]);

  useEffect(() => {
    if (!programForm.imageFile && !programForm.currentImageUrl && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [programForm.currentImageUrl, programForm.imageFile]);

  const resolvedPreview = previewUrl || programForm.currentImageUrl;
  const imageLabel = copy.adminDashboard.form.imageLabel || "Program image";
  const imageHint = copy.adminDashboard.form.imageHint || "Upload the main image for this program.";
  const imageReplaceHint =
    copy.adminDashboard.form.imageReplaceHint || "Upload a new image to replace the current one.";
  const imageFormats = copy.adminDashboard.form.imageFormats || "JPG, PNG, WEBP, or GIF up to 10MB";
  const imageButton = copy.adminDashboard.form.imageButton || "Choose image";
  const previewAlt = copy.adminDashboard.form.previewAlt || "Program preview";
  const savingLabel = copy.adminDashboard.form.saving || "Saving...";

  const handleCancel = () => {
    resetProgramForm();
    setIsSubmitting(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (event) => {
    setIsSubmitting(true);

    try {
      await handleProgramSubmit(event);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={compact ? "space-y-5" : ""}>
      {showHeader ? (
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-2xl bg-secondary/15 p-3 text-secondary">
            <PlusCircle size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary">
              {editingId ? copy.adminDashboard.form.updateTitle : copy.adminDashboard.form.createTitle}
            </h2>
            <p className="text-sm text-slate-600">{copy.adminDashboard.form.description}</p>
          </div>
        </div>
      ) : null}

      <form className={showHeader ? "mt-6 space-y-5" : "space-y-5"} onSubmit={onSubmit}>
        <InputField
          label={copy.adminDashboard.form.titleLabel}
          name="title"
          value={programForm.title}
          onChange={handleProgramChange}
          placeholder={copy.adminDashboard.form.titlePlaceholder}
          error={formErrors.title}
        />
        <InputField
          as="textarea"
          label={copy.adminDashboard.form.descriptionLabel}
          name="description"
          value={programForm.description}
          onChange={handleProgramChange}
          placeholder={copy.adminDashboard.form.descriptionPlaceholder}
          error={formErrors.description}
        />
        <InputField
          as="select"
          label={copy.adminDashboard.form.ageGroupLabel}
          name="ageGroup"
          value={programForm.ageGroup}
          onChange={handleProgramChange}
          error={formErrors.ageGroup}
          options={copy.adminDashboard.form.ageOptions}
        />

        <label className="block">
          <span className="text-sm font-semibold text-primary">{imageLabel}</span>
          <div className="mt-2 rounded-[28px] border border-dashed border-secondary/35 bg-white/80 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">
                  {editingId ? imageReplaceHint : imageHint}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {imageFormats}
                </p>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-midnight">
                <UploadCloud size={16} />
                {imageButton}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="sr-only"
                  onChange={(event) => handleProgramImageChange(event.target.files?.[0] ?? null)}
                />
              </label>
            </div>

            {resolvedPreview ? (
              <div className="mt-5 overflow-hidden rounded-[24px] border border-secondary/20 bg-cream">
                <img
                  src={resolvedPreview}
                  alt={programForm.title || previewAlt}
                  className="h-64 w-full object-cover"
                />
              </div>
            ) : null}

            {formErrors.image ? (
              <span className="mt-3 block text-sm text-rose-600">{formErrors.image}</span>
            ) : null}
          </div>
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-midnight disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting
              ? savingLabel
              : editingId
                ? copy.adminDashboard.form.update
                : copy.adminDashboard.form.save}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-semibold text-primary"
            >
              {copy.adminDashboard.form.cancel}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default ProgramEditorForm;
