const Student = require("../models/Student");

exports.getStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.requestProfileUpdate = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { academicHistory, extracurriculars } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.academicHistory = academicHistory;
    student.extracurriculars = extracurriculars;
    await student.save();

    res.json({ message: "Profile update requested" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
