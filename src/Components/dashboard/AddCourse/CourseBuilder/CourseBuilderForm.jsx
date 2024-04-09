import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useSelector,useDispatch} from "react-redux"
import IconBtn from "../../../common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md";
import {BiRightArrow} from "react-icons/bi"
import { setCourse, setEditCourse, setStep } from "../../../../utils/slices/courseSlice";
import { createSection, updateSection } from "../../../../services/operations/courseDetailsAPI";

export const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(true);
  const {course}= useSelector((state)=>state.course)
  const[loading,setLoading]=useState(false);
  const{token}=useSelector((state)=>(state.auth))
  const dispatch= useDispatch()

  const onSubmit=async (data)=>{

    //create section ya edit section wla butoon
    //i.e create and edit both ---> section
    //

    setLoading(true);

    let result;

    if(editSectionName){
        //we are editing the section Name
        result = await updateSection({
            sectionName:data.sectionName,
            sectionId:editSectionName,
            courseId:course._id,
            
        },token)
    }
    else{

        result= await createSection({
            sectionName:data.sectionName,
            courseId:course._id,
        },token)

    }


    //update values

    if(result){
        dispatch(setCourse(result));
        setEditSectionName(null);
        setValue("sectionName","")

    }


    //loading false

    setLoading(false);

  }

  const cancelEdit = () => {
    setEditSectionName(null);
    //all make value empty
    setValue("sectionName", "");
  };

  const goBack=()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true));

  }

  const goToNext=()=>{
    if(course.courseContent.length===0) {
        toast.error("Please add atleast 1 section")
        return;
    }
    if(course.courseContent.some((section)=>section.subSection.length ===0)){
        //.some callback function run for every element 
        //check length of ecah subsection of each section in the course
        toast.error("Please add atleast one lecture in each section");
        return ;
    }
   dispatch(setStep(3))
  }
  return (
    <div>
      <p>Course Builder</p>

      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Section name <sup>*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full "
          />
          {errors.sectionName && <span>Section Name is required</span>}
        </div>

        <div className="mt-2">
          <IconBtn
            type={"submit"}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            {<MdAddCircleOutline className="text-yellow-50" />}
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>


      {
        course.courseContent.length > 0 && (
            <NestedView/>
        )
      }

      <div className="flex justify-end gap-x-3">

        <button onClick={goBack} className="rounded-md cursor-pointer flex items-center ">Back</button>
        <IconBtn text="Next" onClick={goToNext}><BiRightArrow/></IconBtn>

      </div>
    </div>
  );
};
