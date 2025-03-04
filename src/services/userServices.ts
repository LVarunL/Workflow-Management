import { User } from "../models/User";
import { LocalStorageKeys } from "../common/utils/enums";
const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem(LocalStorageKeys.USERS) || "[]");
};

const isEmailRegistered = (email: string): boolean => {
  const users = getUsers();
  return users.some((user) => user.email === email);
};

const addUser = (newUser: User): void => {
  const users = getUsers();
  if (users.some((user) => user.email === newUser.email)) {
    return;
  }
  users.push(newUser);
  localStorage.setItem(LocalStorageKeys.USERS, JSON.stringify(users));
};

const UserServices = {
  getUsers,
  isEmailRegistered,
  addUser,
};

export default UserServices;
