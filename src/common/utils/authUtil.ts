import AuthController from "../../controllers/authController";
import { User } from "../../models/User";

const getAuth = function () {
  const authToken = localStorage.getItem("auth");
  return authToken;
};

const getUserFromToken = function (): string {
  const authToken = getAuth();
  const email = AuthController.getUserFromToken(authToken);

  return email;
};

const saveToken = function (token: string) {
  localStorage.setItem("auth", token);
};

const removeToken = function () {
  localStorage.removeItem("auth");
};

export { getAuth, saveToken, removeToken, getUserFromToken };
