import { createContext } from "react";

export interface authState {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultSetter: React.Dispatch<React.SetStateAction<boolean>> = () => {};

const AuthContext = createContext<authState>({
  isAuth: false,
  setIsAuth: defaultSetter,
});

export default AuthContext;
