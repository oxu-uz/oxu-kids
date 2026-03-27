const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

function buildUrl(path) {
  if (path.startsWith("http")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export async function apiFetch(path, options = {}) {
  const { method = "GET", body, token, headers = {}, signal } = options;
  const isFormData = body instanceof FormData;

  const response = await fetch(buildUrl(path), {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    signal,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(payload?.message || "So'rovni bajarib bo'lmadi");
    error.status = response.status;
    error.details = payload;
    throw error;
  }

  return payload;
}
