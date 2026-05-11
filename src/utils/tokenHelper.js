let accessToken = null;

//  set token
export const setToken = (token) => {
  accessToken = token;
};

// get token
export const getToken = () => {
  return accessToken;
};

// clear token
export const clearToken = () => {
  accessToken = null;
};