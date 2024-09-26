export type LoginData = {
  email: string;
  password: string;
};
export const login = async (loginData: LoginData) => {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  if (response.status === 401) {
    throw new Error("Invalid credentials");
  }
  if (!response.ok) {
    throw new Error("Login failed please try again after some time");
  }
  return response.json();
};
