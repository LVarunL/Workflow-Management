const getAuth = function (): string | null {
  const authToken = localStorage.getItem("auth");
  return authToken;
};

const saveToken = function (token: string) {
  localStorage.setItem("auth", token);
};

const removeToken = function () {
  localStorage.removeItem("auth");
};

export { getAuth, saveToken, removeToken };
