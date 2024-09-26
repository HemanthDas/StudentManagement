const Student = require("../models/Student");
const Enrollment = require("../models/Enrollment");

exports.getDashboard = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const pendingEnrollments = await Enrollment.countDocuments({
      status: "pending",
    });

    res.json({ totalStudents, pendingEnrollments });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addOrUpdateStudent = async (req, res) => {
  try {
    const { email, name, dob, academicHistory, extracurriculars } = req.body;
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      existingStudent.name = name;
      existingStudent.dob = dob;
      existingStudent.academicHistory = academicHistory;
      existingStudent.extracurriculars = extracurriculars;
      await existingStudent.save();
      return res.json({ message: "Student updated successfully" });
    }

    const newStudent = new Student({
      email,
      name,
      dob,
      academicHistory,
      extracurriculars,
    });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPendingEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ status: "pending" });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.approveEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.status = "approved";
    await enrollment.save();

    const newStudent = new Student({
      name: enrollment.name,
      dob: enrollment.dob,
      email: enrollment.email,
      extracurriculars: [],
    });

    await newStudent.save();
    res.json({ message: "Enrollment approved and student created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFlaggedRecords = async (req, res) => {
  try {
    const flaggedEnrollments = await Enrollment.find({ flagged: true });
    res.json(flaggedEnrollments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.mergeRecords = async (req, res) => {
  try {
    const { id1, id2 } = req.params;
    const student1 = await Student.findById(id1);
    const student2 = await Student.findById(id2);

    if (!student1 || !student2) {
      return res
        .status(404)
        .json({ message: "One or both students not found" });
    }

    student1.academicHistory.push(...student2.academicHistory);
    student1.extracurriculars.push(...student2.extracurriculars);
    await student1.save();

    await Student.deleteOne({ _id: student2._id });

    res.json({ message: "Records merged successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
