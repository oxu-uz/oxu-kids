import { Navigate } from "react-router-dom";
import { ShieldCheck, UserPlus } from "lucide-react";
import InputField from "../../components/forms/InputField";
import { useAdminOutlet } from "../../hooks/admin/useAdminOutlet";

function CreateAdminPage() {
  const {
    superAdminMode,
    panelCopy,
    adminForm,
    adminErrors,
    handleAdminChange,
    handleAdminSubmit,
    staffMembers,
    getRoleLabel,
  } = useAdminOutlet();

  if (!superAdminMode) {
    return <Navigate to="/admin/overview" replace />;
  }

  return (
    <div className="premium-card p-8">
      <div className="grid gap-8 xl:grid-cols-[0.95fr,1.05fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-2xl bg-secondary/15 p-3 text-secondary">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-primary">{panelCopy.adminCreation.title}</h2>
              <p className="text-sm text-slate-600">{panelCopy.adminCreation.description}</p>
            </div>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleAdminSubmit}>
            <InputField
              label={panelCopy.adminCreation.nameLabel}
              name="name"
              value={adminForm.name}
              onChange={handleAdminChange}
              error={adminErrors.name}
            />
            <InputField
              label={panelCopy.adminCreation.emailLabel}
              name="email"
              type="email"
              value={adminForm.email}
              onChange={handleAdminChange}
              error={adminErrors.email}
            />
            <InputField
              label={panelCopy.adminCreation.passwordLabel}
              name="password"
              type="password"
              value={adminForm.password}
              onChange={handleAdminChange}
              error={adminErrors.password}
            />

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-midnight"
            >
              <UserPlus size={16} />
              {panelCopy.adminCreation.submit}
            </button>
          </form>
        </div>

        <div className="rounded-[24px] border border-primary/10 bg-white/70 p-5">
          <h3 className="text-lg font-semibold text-primary">{panelCopy.adminCreation.staffTitle}</h3>
          <div className="mt-4 space-y-3">
            {staffMembers.length > 0 ? (
              staffMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-secondary/15 bg-white px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-primary">{member.name}</p>
                      <p className="text-sm text-slate-600">{member.email}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {getRoleLabel(member.role)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">{panelCopy.adminCreation.staffEmpty}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAdminPage;
