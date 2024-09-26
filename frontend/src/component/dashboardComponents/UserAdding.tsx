import { useState } from "react";
import { addUser, addUsersCSV } from "../../api/userApi";
import { useNavigate } from "@tanstack/react-router";

const UserAdding = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate({ from: "/dashboard" });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addUser(newUser);
      console.log("User added successfully:", newUser);
      setNewUser({ email: "", password: "", role: "student" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      setErrorMessage(null);
    } else {
      setErrorMessage("Please upload a valid CSV file.");
    }
  };
  const handleUpload = async () => {
    console.log("Uploading CSV file:", csvFile);
    if (!csvFile) {
      setErrorMessage("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      await addUsersCSV(formData);
      alert("Users added successfully!");
    } catch (error) {
      console.error("Error uploading users:", error);
      setErrorMessage("Failed to upload users.");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute shadow-2xl sm:w-[80%] lg:w-[30%] h-[70%] min-h-max p-6 rounded-lg flex flex-col items-center">
        <button
          className="absolute top-0 right-0 p-2 text-2xl"
          onClick={() => {
            navigate({ search: (prev) => ({ ...prev, pop: null }) });
          }}
        >
          X
        </button>
        <h2 className="text-2xl mb-4 text-center">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-3 w-full">
          <div>
            <label className="text-white">Email:</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded border-2 border-black"
              required
            />
          </div>
          <div>
            <label className="text-white">Password:</label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Password"
              value={newUser.password}
              onChange={handleInputChange}
              className="w-full p-2 rounded border-2 border-black"
              required
            />
          </div>
          <div>
            <label className="text-white">Role:</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-full p-2 rounded border-2 border-black"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </form>
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-bold mb-4">Add Users (CSV Upload)</h2>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="mb-4"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpload}
          >
            Upload Users
          </button>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserAdding;
