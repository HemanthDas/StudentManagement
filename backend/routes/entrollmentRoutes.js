const express = require("express");
const {
  enrollStudentInCourse,
  getEnrolledCourses,
} = require("../controllers/enrollmentController");
const router = express.Router();

router.post("/enroll/:courseId", enrollStudentInCourse);

router.get("/enrolled", getEnrolledCourses);

module.exports = router;
