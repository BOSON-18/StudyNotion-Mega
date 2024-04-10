import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
const NestedView = () => {
  const { course } = useSelector((state) => state.course);
  console.log("Consoling in nested View", course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  return (
    <div>
      <div className="">
        {course?.courseContent?.map((section) => {
          return (
            <details key={section?._id} open>
              <summary className="flex items-center justify-between gap-x-3 border-b-2">
                <RxDropdownMenu />
                <p>{section.sectionName}</p>
              </summary>
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default NestedView;
