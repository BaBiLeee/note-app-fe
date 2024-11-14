export const getToken = () => {
    if (typeof window === 'undefined') return undefined;
  
    return localStorage.getItem('accessToken') || undefined;
  };
  
  export const setToken = (token) => {
    if (typeof window === 'undefined' || !token) return;
  
    localStorage.setItem('accessToken', token);
  };
  
  export const removeToken = () => {
    if (typeof window === 'undefined') return;
  
    localStorage.removeItem('accessToken');
  };
  