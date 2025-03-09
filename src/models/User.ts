import { JwtPayload } from "jsonwebtoken";
const jwt = require("jsonwebtoken");
const SECRET_KEY = "WHATCANITBEOTHER";

interface User {
  email: string;
  password: string;
  authToken?: string;
  isDeleted?: boolean;
}

class UserModelUtilClass {
  //public functions
  getUsers = function (): Array<User> {
    return JSON.parse(localStorage.getItem("users") || "[]");
  };

  findUserByEmail = function (email: string): User {
    // const users = getUsers();
    // const user = users.find((user)=>user.email===email);
    // return user;
    return this.getUsers().find((user: User) => user.email === email);
  };

  addUser = function (user: User) {
    //returning false indicates already existing user
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  };

  validatePassword = function (userToValidate: User): string {
    const user = this.findUserByEmail(userToValidate.email);
    if (user.password !== userToValidate.password) return null;
    return this.generateToken(user.email);
  };

  verifyToken = function (token: string): string | JwtPayload {
    return jwt.verify(token, SECRET_KEY);
  };

  //private functions
  saveUsers = function (users: User[]) {
    localStorage.setItem("users", JSON.stringify(users));
  };
  generateToken = function (email: string): string {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    return token;
  };

  updateToken = function (token: string, userToUpdate: User) {
    let users = this.getUsers();
    users = users.map((user: User) => {
      if (user.email === userToUpdate.email) {
        return { ...user, authToken: token };
      }
      return user;
    });
    this.saveUsers(users);
  };
}
// const UserModelUtil = (function () {
//   //public functions
//   const getUsers = function (): Array<User> {
//     return JSON.parse(localStorage.getItem("users") || "[]");
//   };

//   const findUserByEmail = function (email: string): User {
//     // const users = getUsers();
//     // const user = users.find((user)=>user.email===email);
//     // return user;
//     return getUsers().find((user: User) => user.email === email);
//   };

//   const addUser = function (user: User) {
//     //returning false indicates already existing user
//     const users = getUsers();
//     users.push(user);
//     saveUsers(users);
//   };

//   const validatePassword = function (userToValidate: User): string {
//     const user = findUserByEmail(userToValidate.email);
//     if (user.password !== userToValidate.password) return null;
//     return generateToken(user.email);
//   };

//   const verifyToken = function (token: string): string | JwtPayload {
//     return jwt.verify(token, SECRET_KEY);
//   };

//   //private functions
//   const saveUsers = function (users: User[]) {
//     localStorage.setItem("users", JSON.stringify(users));
//   };
//   const generateToken = function (email: string): string {
//     const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
//     return token;
//   };

//   return { getUsers, findUserByEmail, addUser, validatePassword };
// })();

const UserModelUtil = new UserModelUtilClass();
export { User, UserModelUtil };
