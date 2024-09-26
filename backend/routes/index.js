const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const studentRoutes = require("./studentRoutes");
const userRoutes = require("./userRoutes");
// const enrollementRoutes = require("./entrollmentRoutes");
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/student", studentRoutes);
// router.use("/enrollement", enrollementRoutes);
router.use("/users", userRoutes);
module.exports = router;
