import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

function SidebarToggle({
  expanded,
  onClick,
  mobile = false,
  className = "",
  openLabel,
  closeLabel,
}) {
  const Icon = mobile ? (expanded ? X : Menu) : expanded ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={expanded ? closeLabel : openLabel}
      className={`inline-flex items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-soft transition hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${className}`}
    >
      <Icon size={18} />
    </button>
  );
}

export default SidebarToggle;
