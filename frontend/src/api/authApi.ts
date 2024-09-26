export type LoginData = {
  email: string;
  password: string;
};

async function login(request: LoginData): Promise<void> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    throw new Error("Failed to login");
  }
  return res.json();
}
export { login };
