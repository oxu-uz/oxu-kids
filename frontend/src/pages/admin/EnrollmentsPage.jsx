import { Trash2 } from "lucide-react";
import { useAdminOutlet } from "../../hooks/admin/useAdminOutlet";
import { formatAgeGroup, localizeProgram } from "../../lib/programLocalization";

function EnrollmentsPage() {
  const { copy, locale, enrollments, loading, handleDeleteEnrollment, panelCopy } = useAdminOutlet();

  return (
    <div className="premium-card p-8">
      <h2 className="text-2xl font-semibold text-primary">{copy.adminDashboard.enrollmentTable.title}</h2>
      <p className="mt-2 text-sm text-slate-600">{copy.adminDashboard.enrollmentTable.description}</p>

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">{copy.adminDashboard.enrollmentTable.loading}</p>
      ) : null}

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-primary/10 text-slate-500">
              <th className="pb-3 pr-4 font-semibold">{copy.adminDashboard.enrollmentTable.child}</th>
              <th className="pb-3 pr-4 font-semibold">{copy.adminDashboard.enrollmentTable.program}</th>
              <th className="pb-3 pr-4 font-semibold">{copy.adminDashboard.enrollmentTable.parent}</th>
              <th className="pb-3 font-semibold">{panelCopy.removeEnrollment}</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((item) => {
              const localizedProgram = localizeProgram(
                {
                  title: item.programTitle,
                  description: "",
                  ageGroup: item.ageGroup,
                },
                locale,
              );

              return (
                <tr key={item.id} className="border-b border-primary/6 align-top">
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-primary">{item.childName}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      {copy.adminDashboard.childAge(item.childAge)}
                    </p>
                  </td>
                  <td className="py-4 pr-4">
                    <p className="font-medium text-slate-700">{localizedProgram.title}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-secondary">
                      {formatAgeGroup(item.ageGroup, locale)}
                    </p>
                  </td>
                  <td className="py-4 pr-4 text-slate-600">
                    <p>{item.parentName}</p>
                    <p className="text-xs">{item.parentEmail}</p>
                  </td>
                  <td className="py-4">
                    <button
                      type="button"
                      onClick={() => handleDeleteEnrollment(item.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                    >
                      <Trash2 size={15} />
                      {panelCopy.removeEnrollment}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {!loading && enrollments.length === 0 ? (
          <p className="pt-6 text-sm text-slate-500">{copy.adminDashboard.enrollmentTable.empty}</p>
        ) : null}
      </div>
    </div>
  );
}

export default EnrollmentsPage;
