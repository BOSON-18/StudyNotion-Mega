import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = (sectionId) => {
    console.log("Helo");
  };

  const handleDeleteSubSection = (subSectionId,sectionId) => {
    console.log("Helo");
  };
  return (
    <div>
      <div className="mt-2 bg-richblack-400 p-6 px-8 rounded-md">
        {course?.courseContent?.map((section) => {
          return (
            <details key={section?._id} open>
              <summary className="flex items-center  gap-x-3 border-b-2 my-2">
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu />
                  <p>{section.sectionName}</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <button
                  // onClick={handleChangeEditSectionName(
                  //   section._id,
                  //   section.sectionName
                  // )}
                  >
                    {" "}
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Delete this section",
                        text2: "All the lectures will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <span>|</span>
                  <BiSolidDownArrow className="text-xl text-richblack-300" />
                </div>
              </summary>

              <div>
                {section.subSection.map((data) => (
                  <div
                    key={data?._id}
                    onClick={() => {
                      setViewSubSection(data);
                    }}
                    className="flex items-center justify-between gap-x-3 border-b-2"
                  >
                    <div className="flex items-center gap-x-3">
                      <RxDropdownMenu />
                      <p>{data.subSectionName}</p>
                    </div>

                    <div className="flex items-center gap-x-3">
                      <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                        <MdEdit/>
                      </button>
                      <button onClick={()=>{
                        setConfirmationModal({
                          text1: "Delete this Sub Section",
                          text2: "Selected Lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(data._id,section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        });
                      }}>
                        <RiDeleteBin6Line/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default NestedView;
