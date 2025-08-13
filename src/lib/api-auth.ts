// Utility to get user from client-side auth context for API calls
export const getAuthHeaders = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  const userStr = localStorage.getItem('user');
  if (!userStr) {
    return {};
  }

  try {
    const user = JSON.parse(userStr);
    return {
      'X-User-Email': user.email,
      'X-User-Role': user.role,
      'X-User-Id': user.id,
    };
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return {};
  }
};

export const isAdminUser = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const userStr = localStorage.getItem('user');
  if (!userStr) {
    return false;
  }

  try {
    const user = JSON.parse(userStr);
    return user.role === 'admin';
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return false;
  }
};
