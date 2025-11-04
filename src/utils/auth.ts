export type User = {
  email: string;
  password: string;
};

const USERS_KEY = "kc_users";
const CURRENT_USER_KEY = "kc_current_user";

const readUsers = (): User[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const writeUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  // notify other tabs
  window.dispatchEvent(new Event("storage"));
};

export const signup = (email: string, password: string): { ok: boolean; message?: string } => {
  const users = readUsers();
  if (users.find((u) => u.email === email)) {
    return { ok: false, message: "Email already registered" };
  }
  users.push({ email, password });
  writeUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ email }));
  // dispatch both storage and a custom event so the same window can react
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('kc_auth_changed'));
  return { ok: true };
};

export const login = (email: string, password: string): { ok: boolean; message?: string } => {
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return { ok: false, message: "Invalid credentials" };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ email }));
  // notify other tabs and same-window listeners
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('kc_auth_changed'));
  return { ok: true };
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('kc_auth_changed'));
};

export const getCurrentUser = (): { email: string } | null => {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = () => !!getCurrentUser();
