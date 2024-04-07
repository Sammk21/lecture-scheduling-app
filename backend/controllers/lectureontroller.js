// controllers/lectureController.js

const Instructor = require("../model/instructor");
const Lecture = require("../model/lecture");

exports.addLecture = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { instructorName, date } = req.body;

    var currDate = date;

    // Check if the instructor is already scheduled for a lecture on the specified date
    const instructor = await Lecture.find({
      instructorName,
    });

    for (const instructorData of instructor) {
      // Check if the current date conflicts with any existing lectures
      if (instructorData.date === currDate) {
        return res.status(400).json({
          message:
            "Instructor is already scheduled for a lecture on this date.",
        });
      }
    }

    const lecture = new Lecture({
      course: courseId,
      instructorName,
      date,
    });

    await lecture.save();

    res
      .status(201)
      .json({ message: "Lecture slot created successfully", lecture });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create lecture slot", error: err.message });
  }
};

exports.deleteLecture = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // Find the course by ID and delete it
    await Lecture.findByIdAndDelete(id);
    res.status(204).send(); // No content to send after successful deletion
  } catch (err) {
    console.error("Error deleting lecture:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addInstructor = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const instructor = new Instructor({ name, email, age });
    await instructor.save();
    res.status(200).json({ message: "Instructor added successfully" });
  } catch (error) {
    console.error("Error adding instructor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getInstructors = async (req, res) => {
  try {
    // Query the database to retrieve all instructors
    const instructors = await Instructor.find();
    res.status(200).json({ instructors });
  } catch (error) {
    console.error("Error fetching instructors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};