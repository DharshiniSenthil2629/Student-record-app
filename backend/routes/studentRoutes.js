const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Student = require("../models/Student");


// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Add a student (POST)
router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const { name, rollNumber, department, fatherName, domainMail, personalMail, phone } = req.body;

    let photoUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : req.body.photo;

    const newStudent = new Student({
      name,
      rollNumber,
      department,
      fatherName,
      domainMail,
      personalMail,
      phone,
      photo: photoUrl,
    });

    await newStudent.save();
    res.status(201).json({ message: "✅ Student added", student: newStudent });
  } catch (err) {
    console.error("❌ Error adding student:", err);
    res.status(500).json({ error: "❌ Failed to add student" });
  }
});

// ✅ Get ALL students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    console.log("✅ Students fetched:", students.length);
    res.json(students);
  } catch (err) {
    console.error("❌ Error fetching students:", err); // 🔍 SEE THE REAL ERROR
    res.status(500).json({ error: "❌ Failed to fetch students" });
  }
});


// ✅ UPDATE student
router.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    let updatedData = req.body;

    if (req.file) {
      updatedData.photo = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to update student" });
  }
});

// ✅ DELETE student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Student deleted" });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to delete student" });
  }
});

module.exports = router;
