export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem('user');
  if (!userData) {
    return null;
  }
  try {
    const { details } = JSON.parse(userData);
    return details;
  } catch (error) {
    console.error("Could not parse user from localStorage", error);
    return null;
  }
};

export const getAuthHeader = () => {
  const userData = localStorage.getItem('user');
   if (!userData) {
    return null;
  }
  try {
    const { token } = JSON.parse(userData);
    return token;
  } catch (error) {
    console.error("Could not parse token from localStorage", error);
    return null;
  }
};