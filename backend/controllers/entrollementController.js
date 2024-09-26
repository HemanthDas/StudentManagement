const User = require("../models/User");
const Course = require("../models/Course");

exports.enrollStudentInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.enrolledStudents.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    course.enrolledStudents.push(userId);
    await course.save();

    return res
      .status(200)
      .json({ message: "Successfully enrolled in the course" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get courses the student is enrolled in
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user info is in req.user after authentication
    const courses = await Course.find({ enrolledStudents: userId });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
