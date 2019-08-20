const isLoggedIn = () => {
  const ts = new Date().getTime() / 1000;
  return localStorage.expiry > ts;
};

export default isLoggedIn;
