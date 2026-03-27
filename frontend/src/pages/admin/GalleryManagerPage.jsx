import { ImagePlus, Pencil, Trash2, UploadCloud } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAdminOutlet } from "../../hooks/admin/useAdminOutlet";
import { apiFetch } from "../../lib/api";

function GalleryManagerPage() {
  const {
    token,
    panelCopy,
    galleryItems,
    refreshAdminData,
    formatDate,
  } = useAdminOutlet();
  const fileInputRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    imageFile: null,
    currentImageUrl: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!form.imageFile) {
      setPreviewUrl("");
      return undefined;
    }

    const nextPreviewUrl = URL.createObjectURL(form.imageFile);
    setPreviewUrl(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [form.imageFile]);

  const resolvedPreview = useMemo(
    () => previewUrl || form.currentImageUrl,
    [form.currentImageUrl, previewUrl],
  );

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      category: "",
      description: "",
      imageFile: null,
      currentImageUrl: "",
    });
    setFormErrors({});
    setError("");
    clearFileInput();
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = panelCopy.galleryManagement.validation.titleRequired;
    }

    if (!form.category.trim()) {
      nextErrors.category = panelCopy.galleryManagement.validation.categoryRequired;
    }

    if (!form.description.trim()) {
      nextErrors.description = panelCopy.galleryManagement.validation.descriptionRequired;
    }

    if (!editingId && !form.imageFile) {
      nextErrors.image = panelCopy.galleryManagement.validation.imageRequired;
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: "" }));
    setMessage("");
    setError("");
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files?.[0] ?? null;
    setForm((current) => ({ ...current, imageFile }));
    setFormErrors((current) => ({ ...current, image: "" }));
    setMessage("");
    setError("");
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      imageFile: null,
      currentImageUrl: item.imageUrl,
    });
    setFormErrors({});
    setMessage("");
    setError("");
    clearFileInput();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (galleryId) => {
    const confirmed = window.confirm(panelCopy.galleryManagement.confirmDelete);
    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");
      await apiFetch(`/gallery/${galleryId}`, {
        method: "DELETE",
        token,
      });
      setMessage(panelCopy.galleryManagement.success.deleted);

      if (editingId === galleryId) {
        resetForm();
      }

      await refreshAdminData();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const body = new FormData();
    body.append("title", form.title.trim());
    body.append("category", form.category.trim());
    body.append("description", form.description.trim());

    if (form.imageFile) {
      body.append("image", form.imageFile);
    }

    try {
      setSubmitting(true);
      setMessage("");
      setError("");

      await apiFetch(editingId ? `/gallery/${editingId}` : "/gallery", {
        method: editingId ? "PUT" : "POST",
        token,
        body,
      });

      setMessage(
        editingId
          ? panelCopy.galleryManagement.success.updated
          : panelCopy.galleryManagement.success.created,
      );
      resetForm();
      await refreshAdminData();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[0.95fr,1.05fr]">
      <div className="premium-card p-8">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-2xl bg-secondary/15 p-3 text-secondary">
            <ImagePlus size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary">
              {editingId
                ? panelCopy.galleryManagement.form.editTitle
                : panelCopy.galleryManagement.form.createTitle}
            </h2>
            <p className="text-sm text-slate-600">{panelCopy.galleryManagement.form.description}</p>
          </div>
        </div>

        {message ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-primary">
              {panelCopy.galleryManagement.form.titleLabel}
            </span>
            <input
              name="title"
              value={form.title}
              onChange={handleTextChange}
              placeholder={panelCopy.galleryManagement.form.titlePlaceholder}
              className="mt-2 w-full rounded-2xl border border-primary/15 bg-white/90 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            />
            {formErrors.title ? (
              <span className="mt-2 block text-sm text-rose-600">{formErrors.title}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-primary">
              {panelCopy.galleryManagement.form.categoryLabel}
            </span>
            <input
              name="category"
              value={form.category}
              onChange={handleTextChange}
              placeholder={panelCopy.galleryManagement.form.categoryPlaceholder}
              className="mt-2 w-full rounded-2xl border border-primary/15 bg-white/90 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            />
            {formErrors.category ? (
              <span className="mt-2 block text-sm text-rose-600">{formErrors.category}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-primary">
              {panelCopy.galleryManagement.form.descriptionLabel}
            </span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleTextChange}
              placeholder={panelCopy.galleryManagement.form.descriptionPlaceholder}
              rows={5}
              className="mt-2 w-full rounded-2xl border border-primary/15 bg-white/90 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            />
            {formErrors.description ? (
              <span className="mt-2 block text-sm text-rose-600">{formErrors.description}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-primary">
              {panelCopy.galleryManagement.form.imageLabel}
            </span>
            <div className="mt-2 rounded-[28px] border border-dashed border-secondary/35 bg-white/80 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-primary">
                    {editingId
                      ? panelCopy.galleryManagement.form.imageReplaceHint
                      : panelCopy.galleryManagement.form.imageHint}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {panelCopy.galleryManagement.form.imageFormats}
                  </p>
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-midnight">
                  <UploadCloud size={16} />
                  {panelCopy.galleryManagement.form.imageButton}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
              </div>

              {resolvedPreview ? (
                <div className="mt-5 overflow-hidden rounded-[24px] border border-secondary/20 bg-cream">
                  <img
                    src={resolvedPreview}
                    alt={form.title || panelCopy.galleryManagement.form.previewAlt}
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
              disabled={submitting}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-midnight disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting
                ? panelCopy.galleryManagement.form.saving
                : editingId
                  ? panelCopy.galleryManagement.form.updateButton
                  : panelCopy.galleryManagement.form.createButton}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-semibold text-primary"
              >
                {panelCopy.galleryManagement.form.cancel}
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="premium-card p-8">
        <h3 className="text-2xl font-semibold text-primary">
          {panelCopy.galleryManagement.list.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          {panelCopy.galleryManagement.list.description}
        </p>

        <div className="mt-6 space-y-5">
          {galleryItems.length > 0 ? (
            galleryItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[28px] border border-primary/10 bg-white/80"
              >
                <img src={item.imageUrl} alt={item.title} className="h-48 w-full object-cover" />
                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                        {item.category}
                      </span>
                      <h4 className="mt-3 text-xl font-semibold text-primary">{item.title}</h4>
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>

                  <p className="text-sm leading-7 text-slate-600">{item.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary"
                    >
                      <Pencil size={15} />
                      {panelCopy.galleryManagement.list.edit}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                    >
                      <Trash2 size={15} />
                      {panelCopy.galleryManagement.list.delete}
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-sm text-slate-500">{panelCopy.galleryManagement.list.empty}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GalleryManagerPage;
