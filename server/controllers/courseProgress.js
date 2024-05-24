const mongoose = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/courseProgress");
const Course = require("../models/Course");

exports.updateCourseProgress = async (req, res) => {
  const { courseID, subsectionId } = req.body;
  const UserId = req.user.id;
  console.log("Course id",courseID)
  console.log("User Id",UserId)

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" });
    }

    // Find the course progress document for the user and course
    console.log("Finding CourseProgress");
    let courseProgress = await CourseProgress.findOne({
      courseID: courseID,
      userId: UserId,
    });

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      });
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(400).json({ error: "Subsection already completed" });
      }
      courseProgress.completedVideos.push(subsectionId); // Push the subsection into the completedVideos array
    }

    await courseProgress.save(); // Save the updated course progress

    return res
      .status(200)
      .json({ success: true, message: "Course progress updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
