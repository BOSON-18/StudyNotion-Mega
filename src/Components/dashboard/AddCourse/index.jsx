import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
  return (
    <div>
      <div>
        <div>
          <h1>Add Course</h1>
          <div>
            <RenderSteps />
          </div>
        </div>
      </div>

      <div className="bg-richblack-700 rounded-xl w-8/12  p-5">
        <p>⚡ Course Upload Tips</p>
        <ul className="w-11/12 list-disc gap-3">
          <li>Set the Course Price option or make it free</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
