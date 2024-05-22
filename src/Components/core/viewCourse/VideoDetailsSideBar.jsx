import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const VideoDetailsSideBar = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLeftures,
    completedLectures,
  } = useSelector((state) => state.course);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) {
        return;
      }

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSetionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      //set current section
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      //set current sub-section
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return <div></div>;
};

export default VideoDetailsSideBar;
