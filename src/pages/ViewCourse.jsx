import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet,useParams } from "react-router-dom";
import {
  setCourseSectionData,
  setEntireCourseData,
  setCompletedLectures,
  setTotalNoOfLectures
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
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      // console.log("Course Data here... ", courseData.courseDetails)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
