const User = require("../models/User");
const Papa = require("papaparse");
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = new User({ email, password, role });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.bulkAddUsers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const csvData = req.file.buffer.toString("utf-8");

    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        try {
          const usersData = result.data;

          const users = await User.insertMany(
            usersData.map((user) => ({
              email: user.email,
              password: user.password,
              role: user.role,
            }))
          );

          res.status(201).json({ message: "Users added successfully", users });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error adding users", error });
        }
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
