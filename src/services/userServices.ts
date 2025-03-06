import { User } from "../models/User";
import { LocalStorageKeys } from "../common/utils/enums";

class UserServicesClass {
  getUsers = (): User[] => {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.USERS) || "[]");
  };

  isEmailRegistered = (email: string): boolean => {
    const users = this.getUsers();
    return users.some((user) => user.email === email);
  };

  addUser = (newUser: User): void => {
    const users = this.getUsers();
    if (users.some((user) => user.email === newUser.email)) {
      return;
    }
    users.push(newUser);
    localStorage.setItem(LocalStorageKeys.USERS, JSON.stringify(users));
  };
}

const UserServices = new UserServicesClass();

export default UserServices;
