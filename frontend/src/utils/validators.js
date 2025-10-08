export const isEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const isStrongPassword = (password) => {
  // Al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};