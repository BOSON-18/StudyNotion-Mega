import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet,useParams } from "react-router-dom";
import {
  
  setEntireCourseData,
  setCompletedLectures,
} from "../utils/slices/viewCourseSlice.jsx";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import VideoDetailsSideBar from "../Components/core/viewCourse/VideoDetailsSideBar";
import CourseReviewModal from "../Components/core/viewCourse/CourseReviewModal.jsx"

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState();
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      console.log(courseData);
      dispatch(
        setCourseSpecificDetails(courseData.courseDetails?.courseContent)
      );
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));

      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec)=>{
        lectures +=sec.subSection.length
      })
    };

    setCourseSpecificDetails()
  },[]);

  return (
    <>
      <div>
        <VideoDetailsSideBar setReviewModal={setReviewModal} />

        <div>
          <Outlet />
        </div>

        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    </>
  );
};

export default ViewCourse;
