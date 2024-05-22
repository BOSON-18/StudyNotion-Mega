import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getFullDetailsOfCourse,
  setEntireCourseData,
  setCompletedLectures,
} from "../services/operations/courseDetailsAPI";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState();
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(
        setCourseSpecificDetails(courseData.courseDetails.courseContent)
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
