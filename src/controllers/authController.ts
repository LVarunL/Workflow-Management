import { User, UserModelUtil } from "../models/User";

interface Response {
  responseCode: Number;
  responseMessage: string;
  accessToken?: string;
}
class AuthControllerClass {
  signin(email: string, password: string): Response {
    const user: User = { email: email, password: password };
    if (!UserModelUtil.findUserByEmail(email)) {
      return {
        responseCode: 404,
        responseMessage: "User Not Found!",
      };
    }
    const token = UserModelUtil.validatePassword(user);
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

  signup(email: string, password: string): Response {
    const user = { email: email, password: password };
    const isExistingUser = UserModelUtil.findUserByEmail(email);
    console.log(user, "here");
    if (isExistingUser?.email) {
      return {
        responseCode: 409,
        responseMessage: "Email already registered",
      };
    }

    UserModelUtil.addUser(user);
    return {
      responseCode: 200,
      responseMessage: "User registered successfully",
    };
  }
}
const AuthController = new AuthControllerClass();
export default AuthController;
