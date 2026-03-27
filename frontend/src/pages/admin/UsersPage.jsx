import { Ban, Trash2, UserCheck, Users } from "lucide-react";
import { useAdminOutlet } from "../../hooks/admin/useAdminOutlet";

function UsersPage() {
  const {
    panelCopy,
    users,
    user,
    loading,
    superAdminMode,
    getRoleLabel,
    formatDate,
    handleUpdateUserBlockedStatus,
    handleDeleteManagedUser,
  } = useAdminOutlet();

  return (
    <div className="premium-card p-8">
      <div className="flex items-center gap-3">
        <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
          <Users size={22} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary">{panelCopy.users.title}</h2>
          <p className="text-sm text-slate-600">{panelCopy.users.description}</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-primary/10 text-slate-500">
              <th className="pb-3 pr-4 font-semibold">{panelCopy.users.user}</th>
              <th className="pb-3 pr-4 font-semibold">{panelCopy.users.role}</th>
              <th className="pb-3 pr-4 font-semibold">{panelCopy.users.status}</th>
              <th className="pb-3 pr-4 font-semibold">{panelCopy.users.children}</th>
              <th className="pb-3 pr-4 font-semibold">{panelCopy.users.enrollments}</th>
              <th className="pb-3 font-semibold">{panelCopy.users.joined}</th>
              {superAdminMode ? (
                <th className="pb-3 pl-4 text-right font-semibold">{panelCopy.users.actions}</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {users.map((account) => (
              <tr key={account.id} className="border-b border-primary/6 align-top">
                <td className="py-4 pr-4">
                  <p className="font-semibold text-primary">{account.name}</p>
                  <p className="text-xs text-slate-500">{account.email}</p>
                </td>
                <td className="py-4 pr-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {getRoleLabel(account.role)}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                      account.blocked
                        ? "bg-rose-100 text-rose-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {account.blocked ? panelCopy.users.blocked : panelCopy.users.active}
                  </span>
                </td>
                <td className="py-4 pr-4 text-slate-600">{account.childCount}</td>
                <td className="py-4 pr-4 text-slate-600">{account.enrollmentCount}</td>
                <td className="py-4 text-slate-600">{formatDate(account.createdAt)}</td>
                {superAdminMode ? (
                  <td className="py-4 pl-4">
                    <div className="flex justify-end gap-2">
                      {account.role !== "SUPER_ADMIN" && account.id !== user?.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleUpdateUserBlockedStatus(account, !account.blocked)}
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
                              account.blocked
                                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border border-amber-200 bg-amber-50 text-amber-700"
                            }`}
                          >
                            {account.blocked ? <UserCheck size={14} /> : <Ban size={14} />}
                            {account.blocked ? panelCopy.users.unblock : panelCopy.users.block}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteManagedUser(account)}
                            className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700"
                          >
                            <Trash2 size={14} />
                            {panelCopy.users.delete}
                          </button>
                        </>
                      ) : (
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {panelCopy.users.protected}
                        </span>
                      )}
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && users.length === 0 ? (
          <p className="pt-6 text-sm text-slate-500">{panelCopy.users.empty}</p>
        ) : null}
      </div>
    </div>
  );
}

export default UsersPage;
