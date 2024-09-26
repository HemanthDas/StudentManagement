const express = require("express");
const {
  getDashboard,
  getPendingEnrollments,
  approveEnrollment,
  getFlaggedRecords,
  mergeRecords,
  addOrUpdateStudent,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/dashboard", getDashboard);

router.post("/student", addOrUpdateStudent);

router.get("/enrollments", getPendingEnrollments);

router.post("/enrollments/approve/:id", approveEnrollment);

router.get("/review/flagged", getFlaggedRecords);

router.post("/review/merge/:id1/:id2", mergeRecords);

module.exports = router;
