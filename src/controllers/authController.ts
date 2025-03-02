import { User, UserModelUtil } from "../models/User";
const { validatePassword, addUser, findUserByEmail } = UserModelUtil;

interface Response {
  responseCode: Number;
  responseMessage: string;
  accessToken?: string;
}
const AuthController = (function () {
  function signin(email: string, password: string): Response {
    const user: User = { email: email, password: password };
    if (!findUserByEmail(email)) {
      return {
        responseCode: 404,
        responseMessage: "User Not Found!",
      };
    }
    const token = validatePassword(user);
    if (!token) {
      return {
        responseCode: 401,
        responseMessage: "Wrong Password!",
      };
    }
    return {
      responseCode: 200,
      responseMessage: "Sign In Successful",
      accessToken: token,
    };
  }

  function signup(email: string, password: string): Response {
    const user = { email: email, password: password };
    const isExistingUser = findUserByEmail(email);
    console.log(user, "here");
    if (isExistingUser?.email) {
      return {
        responseCode: 409,
        responseMessage: "Email already registered",
      };
    }

    addUser(user);
    return {
      responseCode: 200,
      responseMessage: "User registered successfully",
    };
  }

  return {
    signin,
    signup,
  };
})();

export default AuthController;
