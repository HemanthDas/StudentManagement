const express = require("express");
const {
  getStudentProfile,
  requestProfileUpdate,
} = require("../controllers/studentController");
const router = express.Router();

router.get("/profile", getStudentProfile);

router.post("/request-update", requestProfileUpdate);

module.exports = router;
