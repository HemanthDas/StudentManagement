export type LoginData = {
  email: string;
  password: string;
};
export type LoginResponse = {
  token: string;
  userInfo: {
    userId: string;
    role: string;
  };
};

export const login = async (loginData: LoginData) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  if (response.status === 401) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Unauthorized");
  }
  if (!response.ok) {
    throw new Error("Login failed please try again after some time");
  }
  return response.json();
};
