const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const studentRoutes = require("./studentRoutes");

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/student", studentRoutes);

module.exports = router;
