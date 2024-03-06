import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories, fetchCourseDetails } from "../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from "./ChipInput";
const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      console.log(categories)
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async () => {};
  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
    >
      <div>
        <label>
          Course Title<sup className="">*</sup>
        </label>

        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full"
        >
          {errors.courseTitle && <span>Course Title is required</span>}
        </input>
      </div>

      <div>
        <label htmlFor="courseDescription">
          Course Short Description<sup className="">*</sup>
        </label>

        <textarea
          id="courseDescription"
          placeholder="Enter Course Description"
          {...register("courseDescription", { required: true })}
          className="w-full min-h-[140px] p-5"
        >
          {errors.courseShortDescription && (
            <span>Course Description is required</span>
          )}
        </textarea>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          {" "}
          Course Price <sup className="text-pink-200">*</sup>{" "}
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            className="form-style w-full !pl-12"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {" "}
            Course Price is required{" "}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="courseCategory">
          Course Category<sup>*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
        >
          <option value=" " disabled> Choose a Category</option>

          {
            !loading && courseCategories.map((category,index)=>(
              <option key={index} value={category?.id}>
                {category?.name}
              </option>
            ))
          }
        </select>
        {
          errors.courseCategories && (
            <span>Course Category is required</span>
          )
        }
      </div>

      {/* Create a custom component for handling tags input */}

      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Upload bhi bananananananananana */}

      {/* Benefits of thi course  */}

      <div>
        <label>Benefits of the Course<sup>*</sup></label>

        <textarea name="" id="coursebenefits" cols="30" rows="10" placeholder="Enter Benefits of the course" {...register("courseBenefits",{required:true})} className="min-h-[130px] w-full">

          {
            errors.courseBenefits && (
              <span>
                Benefits of the course
              </span>
            )
          }
        </textarea>
      </div>

      <RequirementField 
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
    </form>
  );
};

export default CourseInformationForm;
