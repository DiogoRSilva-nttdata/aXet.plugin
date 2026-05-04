export function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Error decodificando token:", error);
    return null;
  }
}

export function getUserRole() {
  const user = getUserFromToken();
  return user?.role || null;
}

export function getUserId() {
  const user = getUserFromToken();
  return user?.id || null;
}
