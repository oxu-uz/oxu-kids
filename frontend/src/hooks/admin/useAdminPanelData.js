import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../useAuth";
import { useLanguage } from "../useLanguage";
import { getAdminManagementTranslations } from "../../i18n/adminManagement";
import { getUiTranslations } from "../../i18n/ui";
import { apiFetch } from "../../lib/api";
import { isAdminRole, isSuperAdmin, normalizeRole } from "../../lib/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/;

export function useAdminPanelData() {
  const { token, user } = useAuth();
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const panelCopy = getAdminManagementTranslations(locale);
  const [programs, setPrograms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [children, setChildren] = useState([]);
  const [users, setUsers] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [assignmentErrors, setAssignmentErrors] = useState({});
  const [adminErrors, setAdminErrors] = useState({});
  const [programForm, setProgramForm] = useState({
    title: "",
    description: "",
    ageGroup: "3-4",
    imageFile: null,
    currentImageUrl: "",
  });
  const [assignmentForm, setAssignmentForm] = useState({
    childId: "",
    programId: "",
  });
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const superAdminMode = isSuperAdmin(user?.role);
  const menuLabel = superAdminMode ? panelCopy.hero.superAdminBadge : copy.adminDashboard.badge;
  const registeredUsers = useMemo(
    () => users.filter((item) => normalizeRole(item.role) === "USER"),
    [users],
  );
  const staffMembers = useMemo(
    () => users.filter((item) => isAdminRole(item.role)),
    [users],
  );

  const clearFeedback = useCallback(() => {
    setMessage("");
    setError("");
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [programsData, enrollmentsData, childrenData, usersData, galleryData] = await Promise.all([
        apiFetch("/programs", { token }),
        apiFetch("/enrollments", { token }),
        apiFetch("/children", { token }),
        apiFetch("/users", { token }),
        apiFetch("/gallery", { token }),
      ]);

      setPrograms(programsData);
      setEnrollments(enrollmentsData);
      setChildren(childrenData);
      setUsers(usersData);
      setGalleryItems(galleryData);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (children.length > 0 && !children.some((child) => String(child.id) === assignmentForm.childId)) {
      setAssignmentForm((current) => ({ ...current, childId: String(children[0].id) }));
    }

    if (children.length === 0) {
      setAssignmentForm((current) => ({ ...current, childId: "" }));
    }
  }, [children, assignmentForm.childId]);

  useEffect(() => {
    if (programs.length > 0 && !programs.some((program) => String(program.id) === assignmentForm.programId)) {
      setAssignmentForm((current) => ({ ...current, programId: String(programs[0].id) }));
    }

    if (programs.length === 0) {
      setAssignmentForm((current) => ({ ...current, programId: "" }));
    }
  }, [programs, assignmentForm.programId]);

  const handleProgramChange = (event) => {
    const { name, value } = event.target;
    setProgramForm((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: "" }));
    clearFeedback();
  };

  const handleProgramImageChange = (imageFile) => {
    setProgramForm((current) => ({
      ...current,
      imageFile,
    }));
    setFormErrors((current) => ({ ...current, image: "" }));
    clearFeedback();
  };

  const handleAssignmentChange = (event) => {
    const { name, value } = event.target;
    setAssignmentForm((current) => ({ ...current, [name]: value }));
    setAssignmentErrors((current) => ({ ...current, [name]: "" }));
    clearFeedback();
  };

  const handleAdminChange = (event) => {
    const { name, value } = event.target;
    setAdminForm((current) => ({ ...current, [name]: value }));
    setAdminErrors((current) => ({ ...current, [name]: "" }));
    clearFeedback();
  };

  const resetProgramForm = () => {
    setEditingId(null);
    setProgramForm({
      title: "",
      description: "",
      ageGroup: "3-4",
      imageFile: null,
      currentImageUrl: "",
    });
    setFormErrors({});
  };

  const resetAdminForm = () => {
    setAdminForm({
      name: "",
      email: "",
      password: "",
    });
    setAdminErrors({});
  };

  const validateProgramForm = () => {
    const nextErrors = {};

    if (!programForm.title.trim()) {
      nextErrors.title = copy.adminDashboard.validation.titleRequired;
    }

    if (!programForm.description.trim()) {
      nextErrors.description = copy.adminDashboard.validation.descriptionRequired;
    }

    if (!programForm.ageGroup.trim()) {
      nextErrors.ageGroup = copy.adminDashboard.validation.ageGroupRequired;
    }

    if (!editingId && !programForm.imageFile) {
      nextErrors.image = copy.adminDashboard.validation.imageRequired || "Program image is required";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateAssignmentForm = () => {
    const nextErrors = {};

    if (!assignmentForm.childId) {
      nextErrors.childId = panelCopy.validation.childRequired;
    }

    if (!assignmentForm.programId) {
      nextErrors.programId = panelCopy.validation.programRequired;
    }

    setAssignmentErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateAdminForm = () => {
    const nextErrors = {};

    if (!adminForm.name.trim()) {
      nextErrors.name = panelCopy.validation.nameRequired;
    }

    if (!adminForm.email.trim()) {
      nextErrors.email = panelCopy.validation.emailRequired;
    } else if (!EMAIL_PATTERN.test(adminForm.email)) {
      nextErrors.email = panelCopy.validation.emailInvalid;
    }

    if (!adminForm.password) {
      nextErrors.password = panelCopy.validation.passwordRequired;
    } else if (
      adminForm.password.length < 8 ||
      !STRONG_PASSWORD_PATTERN.test(adminForm.password)
    ) {
      nextErrors.password = panelCopy.validation.passwordWeak;
    }

    setAdminErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleProgramSubmit = async (event) => {
    event.preventDefault();

    if (!validateProgramForm()) {
      return false;
    }

    try {
      const body = new FormData();
      body.append("title", programForm.title.trim());
      body.append("description", programForm.description.trim());
      body.append("ageGroup", programForm.ageGroup);

      if (programForm.imageFile) {
        body.append("image", programForm.imageFile);
      }

      if (editingId) {
        await apiFetch(`/programs/${editingId}`, {
          method: "PUT",
          token,
          body,
        });
        setMessage(copy.adminDashboard.success.updated);
      } else {
        await apiFetch("/programs", {
          method: "POST",
          token,
          body,
        });
        setMessage(copy.adminDashboard.success.created);
      }

      resetProgramForm();
      await loadData();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    }
  };

  const handleAssignmentSubmit = async (event) => {
    event.preventDefault();

    if (!validateAssignmentForm()) {
      return false;
    }

    try {
      await apiFetch("/enrollments", {
        method: "POST",
        token,
        body: {
          childId: Number(assignmentForm.childId),
          programId: Number(assignmentForm.programId),
        },
      });

      setMessage(panelCopy.success.assignmentCreated);
      setAssignmentErrors({});
      await loadData();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    }
  };

  const handleAdminSubmit = async (event) => {
    event.preventDefault();

    if (!validateAdminForm()) {
      return false;
    }

    try {
      await apiFetch("/users/admins", {
        method: "POST",
        token,
        body: adminForm,
      });

      setMessage(panelCopy.success.adminCreated);
      resetAdminForm();
      await loadData();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    }
  };

  const startEditingProgram = (program) => {
    setEditingId(program.id);
    setProgramForm({
      title: program.title,
      description: program.description,
      ageGroup: program.ageGroup,
      imageFile: null,
      currentImageUrl: program.imageUrl ?? "",
    });
    clearFeedback();
  };

  const handleDeleteProgram = async (programId) => {
    const confirmed = window.confirm(copy.adminDashboard.confirmDelete);
    if (!confirmed) {
      return false;
    }

    try {
      await apiFetch(`/programs/${programId}`, {
        method: "DELETE",
        token,
      });
      setMessage(copy.adminDashboard.success.deleted);

      if (editingId === programId) {
        resetProgramForm();
      }

      await loadData();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    }
  };

  const handleDeleteEnrollment = async (enrollmentId) => {
    const confirmed = window.confirm(panelCopy.confirmRemoveEnrollment);
    if (!confirmed) {
      return false;
    }

    try {
      await apiFetch(`/enrollments/${enrollmentId}`, {
        method: "DELETE",
        token,
      });
      setMessage(panelCopy.success.assignmentRemoved);
      await loadData();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    }
  };

  const handleUpdateUserBlockedStatus = async (managedUser, blocked) => {
    try {
      await apiFetch(`/users/${managedUser.id}/status`, {
        method: "PATCH",
        token,
        body: { blocked },
      });
      setMessage(
        blocked
          ? panelCopy.users.success.blocked(managedUser.name)
          : panelCopy.users.success.unblocked(managedUser.name),
      );
      await loadData();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    }
  };

  const handleDeleteManagedUser = async (managedUser) => {
    const confirmed = window.confirm(panelCopy.users.confirmDelete(managedUser.name));
    if (!confirmed) {
      return false;
    }

    try {
      await apiFetch(`/users/${managedUser.id}`, {
        method: "DELETE",
        token,
      });
      setMessage(panelCopy.users.success.deleted(managedUser.name));
      await loadData();
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    }
  };

  const formatDate = (value) => {
    if (!value) {
      return "-";
    }

    const formatterLocale =
      locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-US";

    return new Intl.DateTimeFormat(formatterLocale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(value));
  };

  const getRoleLabel = (role) => panelCopy.roles[normalizeRole(role)] ?? normalizeRole(role);

  return {
    copy,
    panelCopy,
    locale,
    menuLabel,
    user,
    superAdminMode,
    programs,
    enrollments,
    children,
    users,
    galleryItems,
    token,
    loading,
    message,
    error,
    editingId,
    programForm,
    assignmentForm,
    adminForm,
    formErrors,
    assignmentErrors,
    adminErrors,
    staffMembers,
    registeredUsers,
    clearFeedback,
    resetProgramForm,
    resetAdminForm,
    handleProgramChange,
    handleProgramImageChange,
    handleAssignmentChange,
    handleAdminChange,
    handleProgramSubmit,
    handleAssignmentSubmit,
    handleAdminSubmit,
    startEditingProgram,
    handleDeleteProgram,
    handleDeleteEnrollment,
    handleUpdateUserBlockedStatus,
    handleDeleteManagedUser,
    formatDate,
    getRoleLabel,
    refreshAdminData: loadData,
  };
}
