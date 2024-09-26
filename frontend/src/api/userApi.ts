export const addUser = async (userData: {
  email: string;
  password: string;
  role: string;
}) => {
  const response = await fetch("http://localhost:3000/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to add user");
  }

  return await response.json();
};
export const addUsersCSV = async (formData: FormData) => {
  const response = await fetch("http://localhost:3000/api/users/bulk", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Error uploading CSV file");
  }
  return response.json();
};
