import AuthController from "../controllers/authController";
import { saveToken, removeToken } from "../common/utils/authUtil";
const AuthServices = (function () {
  function login(
    email: string,
    password: string
  ): { success: boolean; message?: string } {
    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    try {
      const response = AuthController.signin(email, password);
      const responseCode = response.responseCode;

      if (responseCode === 404) {
        return { success: false, message: "User not found" };
      } else if (responseCode === 401) {
        return { success: false, message: "Incorrect password" };
      } else if (responseCode === 200) {
        saveToken(response.accessToken);
        return { success: true };
      } else {
        return {
          success: false,
          message: "Unexpected error. Please try again.",
        };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  }

  function register(
    email: string,
    password: string,
    confirmPassword: string
  ): { success: boolean; message?: string } {
    if (!email || !password || !confirmPassword) {
      return { success: false, message: "All fields are required" };
    }
    function validateEmail(email: string): boolean {
      //how what why kya kaise kyu shu kem kemnu
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (!validateEmail(email)) {
      return { success: false, message: "Invalid email format" };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }

    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    try {
      const response = AuthController.signup(email, password);
      const responseCode = response.responseCode;

      if (responseCode === 200) {
        return { success: true };
      } else {
        return { success: false, message: "Signup failed. Try again." };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  }

  function logout() {
    removeToken();
  }

  return {
    login,
    register,
  };
})();

export default AuthServices;
