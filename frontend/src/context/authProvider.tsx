import { createContext, PropsWithChildren, useState } from "react";
import { login } from "../api/authApi";

type UserInfo = {
  userId: string;
  role: string;
};

type AuthContextType = {
  token: string | null;
  currentUser: UserInfo | null;
  handleLogin: (email: string, password: string) => Promise<UserInfo | null>;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );

  const [currentUser, setCurrentUser] = useState<UserInfo | null>(
    localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser")!)
      : null
  );

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<UserInfo | null> => {
    try {
      const response = await login({ email, password });
      if (response.token) {
        setAuthToken(response.token);
        setCurrentUser(response.userInfo);
        localStorage.setItem("token", response.token);
        localStorage.setItem("currentUser", JSON.stringify(response.userInfo));
        return response.userInfo; // Return userInfo directly
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Login Failed: ${error.message}`);
      }
      throw new Error("Login Failed: An unknown error occurred");
    }
    return null; // Return null if login fails
  };

  const handleLogout = async () => {
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ token: authToken, currentUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
