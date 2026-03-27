export function normalizeRole(role) {
  return role === "PARENT" ? "USER" : role;
}

export function normalizeUser(user) {
  return user ? { ...user, role: normalizeRole(user.role) } : null;
}

export function normalizeSession(session) {
  return session ? { ...session, user: normalizeUser(session.user) } : null;
}

export function isAdminRole(role) {
  const normalizedRole = normalizeRole(role);
  return normalizedRole === "ADMIN" || normalizedRole === "SUPER_ADMIN";
}

export function isSuperAdmin(role) {
  return normalizeRole(role) === "SUPER_ADMIN";
}

export function getDashboardPath(role) {
  return isAdminRole(role) ? "/admin/overview" : "/user";
}
