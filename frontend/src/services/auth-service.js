const API_URL = import.meta.env.VITE_API_URL;

export const isLoggedIn = () =>
  document.cookie.split('; ').some((c) => c.startsWith('logged_in=true'));

export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const logout = async () => {
  await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
  window.location.href = '/';
};