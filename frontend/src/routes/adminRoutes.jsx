import {
  CalendarPlus2,
  Images,
  LayoutDashboard,
  Pencil,
  PlusCircle,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react";
import AssignRulePage from "../pages/admin/AssignRulePage";
import CreateAdminPage from "../pages/admin/CreateAdminPage";
import GalleryManagerPage from "../pages/admin/GalleryManagerPage";
import CreateRulePage from "../pages/admin/CreateRulePage";
import EnrollmentsPage from "../pages/admin/EnrollmentsPage";
import OverviewPage from "../pages/admin/OverviewPage";
import RulesPage from "../pages/admin/RulesPage";
import UsersPage from "../pages/admin/UsersPage";

export const adminRouteDefinitions = [
  {
    key: "overview",
    path: "overview",
    icon: LayoutDashboard,
    component: OverviewPage,
    getLabel: ({ panelCopy }) => panelCopy.menu.sections.overview,
    getTitle: ({ panelCopy }) => panelCopy.menu.sections.overview,
    getDescription: ({ copy, panelCopy, superAdminMode }) =>
      superAdminMode ? panelCopy.hero.superAdminDescription : copy.adminDashboard.heroDescription,
  },
  {
    key: "create-admin",
    path: "create-admin",
    icon: ShieldCheck,
    component: CreateAdminPage,
    superAdminOnly: true,
    getLabel: ({ panelCopy }) => panelCopy.menu.sections.createAdmin,
    getTitle: ({ panelCopy }) => panelCopy.adminCreation.title,
    getDescription: ({ panelCopy }) => panelCopy.adminCreation.description,
  },
  {
    key: "create-rule",
    path: "create-rule",
    icon: PlusCircle,
    component: CreateRulePage,
    getLabel: ({ panelCopy }) => panelCopy.menu.sections.programEditor,
    getTitle: ({ copy }) => copy.adminDashboard.form.createTitle,
    getDescription: ({ copy }) => copy.adminDashboard.form.description,
  },
  {
    key: "gallery",
    path: "gallery",
    icon: Images,
    component: GalleryManagerPage,
    getLabel: ({ panelCopy }) => panelCopy.menu.sections.gallery,
    getTitle: ({ panelCopy }) => panelCopy.galleryManagement.title,
    getDescription: ({ panelCopy }) => panelCopy.galleryManagement.description,
  },
  {
    key: "assign-rule",
    path: "assign-rule",
    icon: CalendarPlus2,
    component: AssignRulePage,
    getLabel: ({ panelCopy }) => panelCopy.menu.sections.enrollmentManager,
    getTitle: ({ panelCopy }) => panelCopy.enrollmentManager.title,
    getDescription: ({ panelCopy }) => panelCopy.enrollmentManager.description,
  },
  {
    key: "users",
    path: "users",
    icon: Users,
    component: UsersPage,
    getLabel: ({ panelCopy }) => panelCopy.menu.sections.users,
    getTitle: ({ panelCopy }) => panelCopy.users.title,
    getDescription: ({ panelCopy }) => panelCopy.users.description,
  },
  {
    key: "enrollments",
    path: "enrollments",
    icon: ScrollText,
    component: EnrollmentsPage,
    getLabel: ({ panelCopy }) => panelCopy.menu.sections.enrollments,
    getTitle: ({ copy }) => copy.adminDashboard.enrollmentTable.title,
    getDescription: ({ copy }) => copy.adminDashboard.enrollmentTable.description,
  },
  {
    key: "rules",
    path: "rules",
    icon: Pencil,
    component: RulesPage,
    getLabel: ({ panelCopy }) => panelCopy.menu.sections.programs,
    getTitle: ({ copy }) => copy.adminDashboard.programsList.title,
    getDescription: ({ copy }) => copy.adminDashboard.programsList.description,
  },
];

export function getAdminRoutes(routeContext) {
  return adminRouteDefinitions
    .filter((route) => !route.superAdminOnly || routeContext.superAdminMode)
    .map((route) => ({
      ...route,
      label: route.getLabel(routeContext),
      title: route.getTitle(routeContext),
      description: route.getDescription(routeContext),
    }));
}
