import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const VideoDetailsSideBar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.course);

  useEffect(() => {
    ;(() => {
      if (!courseSectionData?.length) {
        return;
      }

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
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

  return (
    <div>
      {/* for buttons and heading */}
      <div>
        {/* For buttons */}
        <div>
          <div
            onClick={() => {
              navigate("/dashboard/enrolled-courses");
            }}
          >
            Back
          </div>
          <IconBtn
            text="Add Review"
            onclick={() => {
              setReviewModal(true);
            }}
          />
        </div>
        <div>
          {/* For Headings */}
          <p>{courseEntireData?.courseName}</p>
          <p>{completedLectures?.length}</p>
        </div>
      </div>

      {/* For sections and subSections */}

      <div>
        {courseSectionData?.map((section, index) => {
          <div onClick={() => setActiveStatus(section?._id)} key={index}>
            {/* section */}

            <div>
              <div>{section?.sectionName}</div>
              <div>{/* Add arrow */}</div>
            </div>

            {/* SubSections */}
            <div>
              {activeStatus === section?._id && (
                <div>
                  {section.subSection.map((topic, index) => (
                    <div
                      key={index}
                      className={`flex gap-4 ${
                        videobarActive === topic?._id
                          ? "bg-yellow-200 text-richblack-900"
                          : "bg-richblack-500 text-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onClick={() => {
                          setVideoBarActive(topic?.id);
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default VideoDetailsSideBar;
