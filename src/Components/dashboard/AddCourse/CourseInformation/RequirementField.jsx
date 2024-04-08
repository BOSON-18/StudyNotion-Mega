import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setReqList] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course);
  useEffect(() => {
    if (editCourse) {
      register(name, {
        required: true,
        validation: (value) => value.length > 0,
      });
    }
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setReqList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const removeRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1); //remove ho jayega
    setReqList(updatedRequirementList);
  };
  return (
    <div>
      <label>
        {label}
        <sup>*</sup>
      </label>
      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>

        {requirementList.length > 0 && (
          <ul>
            {requirementList.map((requirement, index) => (
              <li key={index} className="flex items-center text-richblack-5">
                <span>{requirement}</span>

                <button
                  className="ml-2"
                  type="button"
                  onClick={() => removeRequirement(index)}
                >
                  clear
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors[name] && <span>{label} is required</span>}
      </div>
    </div>
  );
};

export default RequirementField;
