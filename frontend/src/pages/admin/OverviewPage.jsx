import { CalendarPlus2, ImagePlus, ScrollText, Users } from "lucide-react";
import { useAdminOutlet } from "../../hooks/admin/useAdminOutlet";

function OverviewPage() {
  const { panelCopy, programs, enrollments, registeredUsers, galleryItems } = useAdminOutlet();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[
        { title: panelCopy.stats.programs, value: programs.length, icon: ScrollText },
        {
          title: panelCopy.stats.enrollments,
          value: enrollments.length,
          icon: CalendarPlus2,
        },
        {
          title: panelCopy.stats.galleryItems,
          value: galleryItems.length,
          icon: ImagePlus,
        },
        {
          title: panelCopy.stats.registeredUsers,
          value: registeredUsers.length,
          icon: Users,
        },
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
  );
}

export default OverviewPage;
