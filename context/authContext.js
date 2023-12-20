import { createContext, useState } from "react";

export const AuthContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
});

export default function AuthContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ setIsLogin, isLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
