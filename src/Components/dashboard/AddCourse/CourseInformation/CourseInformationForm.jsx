import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import RequirementField from "./RequirementField";
import IconBtn from "../../../common/IconBtn";
import {COURSE_STATUS} from "../../../../utils/constants"
import { setStep,setCourse } from "../../../../utils/slices/courseSlice";
import { MdNavigateNext } from "react-icons/md"

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const {token}=useSelector((state)=>state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  //select tag categories ki
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    //fetch course category

    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      console.log(categories)
      if (categories.length > 0) setCourseCategories(categories);
      setLoading(false);
    };

    if (editCourse) {
      //coursefrom redux state
      //and see model f COurse
      //setValue("Field Name",value)
      setValue("courseTitle", course.courseName);
      setValue("courseShortDescription", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    //call category api
    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValue = getValues();
    if (
      currentValue.courseTitle !== course.courseName ||
      currentValue.courseShortDescription !== course.courseDescription ||
      currentValue.coursePrice !== course.coursePrice ||
     currentValue.courseTags.toString()!==course.tag.toString()||
      currentValue.courseBenefits !== course.whatYouWillLearn ||
      currentValue.category._id !== course.category._id ||
      currentValue.courseImage !== course.thumbnail ||
      currentValue.courseRequirements.toString() !==
        course.instructions.toString()
    )
      return true;
    else return false;
  };

  //Next button hoga jn uska handler
  const onSubmit = async (data) => {

    if(editCourse){
      if(isFormUpdated()){
      const currentValues=getValues();
      const formData=new FormData();

      formData.append("courseId",course._id);
      if(currentValues.courseTitle !== course.courseName){
        formData.append("courseName",data.courseTitle)
      }

      if(currentValues.courseTitle !== course.courseName){
        formData.append("courseDescription",data.courseShortDescription)
      }

      if(currentValues.coursePrice !== course.price){
        formData.append("price",data.coursePrice)
      }

      if(currentValues.courseBenefits !== course.whatYouWillLearn){
        formData.append("whatYouWillLearn",data.courseBenefits)
      }

      if(currentValues.courseCategory._id !== course.category._id){
        formData.append("category",data.courseCategory)
      }

      if(currentValues.courseRequirements.toString()!== course.instructions.toString()){
        formData.append("instructions",JSON.stringify(data.courseRequirements))
      }

      if(currentValues.courseImage !== course.thumbnail){
        formData.append("thumbnailImage",data.courseImage)
      }

      setLoading(true);

      const result=await editCourseDetails(formData,token);
      setLoading(false);
      if(result){
        setStep(2)
        dispatch(setCourse(result))
      }
    }
    else{
      toast.error("No Changes made to the form")
    }
    return;
    }

    //create a new Course

    const formData=new FormData();
    formData.append("courseName",data.courseTitle);
    formData.append("courseDescription",data.courseShortDescription)
    formData.append("price",data.coursePrice)
    formData.append("tag",JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn",data.courseBenefits)
    formData.append("category",data.courseCategory)
    formData.append("instructions",JSON.stringify(data.courseRequirements))
    formData.append("courseThumbnail",data.courseImage)

   formData.append("status",COURSE_STATUS.DRAFT);

   setLoading(true);
console.log("Before creating Data")
console.log("token",token)
   const result=await addCourseDetails(formData,token);
   if(result){
   dispatch(setStep(2));
    dispatch(setCourse(result));
   }
   setLoading(false);
   console.log("Printing Form Data",formData)
   console.log("result",result)
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
    >
      <div>
        <label>
          Course Title<sup className="text-pink-400">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full"
        />

        {errors.courseTitle && (
          <span className="text-pink-400">Course Title is required</span>
        )}
      </div>

      <div>
        <label>
          Course Short Description <sup>*</sup>
        </label>
        <textarea
          id="courseShortDescription"
          placeholder="Enter Description"
          {...register("courseShortDescription", { required: true })}
          className="min-h-[140px] w-full"
        />
        {errors.courseShortDescription && (
          <span className="text-pink-400">Course Description is required</span>
        )}
      </div>

      <div>
        <label>
          Course Price<sup className="text-pink-400">*</sup>
        </label>
        <input
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", { required: true, valueAsNumber: true })}
          className="w-full px-5"
        />
        <HiOutlineCurrencyRupee className="absolute  m-1 text-richblack-700" />

        {errors.coursePrice && (
          <span className="text-pink-400">Course Price is required</span>
        )}
      </div>

      <div>
        <label>
          Course Category<sup className="text-pink-400">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue={""}
          {...register("courseCategory", { required: true })}
          className="w-full"
        >
          <option value={""} disabled>
            Choose a Category
          </option>

          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>

        {errors.courseCategory && (
          <span className="text-pink-400">Course Category is required</span>
        )}
      </div>

      {/* Custom component for tag handling */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tag and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Thumbnail */}
      {/* Github Repo me dekho */}
      {/* <Upload /> */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div>
        <label>
          Benefits of the course<sup className="text-pink-400">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="min-h-[140px] w-full"
        />

        {errors.courseBenefits && (
          <span className="text-pink-400">
            Benefits of the course are required
          </span>
        )}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div>
        {editCourse && (
          <button className="" onClick={() => dispatch(setStep(2))}>
            Continue Without Saving
          </button>
        )}

        <IconBtn text={!editCourse ? "Next" : "Save Changes"} />
      </div>
    </form>
  );
};

export default CourseInformationForm;
