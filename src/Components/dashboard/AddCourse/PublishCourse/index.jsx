import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { COURSE_STATUS } from "../../../../utils/constants";
import { resetCourseState } from "../../../../utils/slices/courseSlice";
import { editCourseDetails } from "../../../../services/operations/courseDetailsAPI";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (course.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goToCourses = () => {
    dispatch(resetCourseState());
    //navigate("/dashboard/my-courses")
  };
  const handlePublishCourse = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // no updation in form
      // no need to make api call

      goToCourses();
      return;
    }
    // if form updated

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }
    setLoading(false);
  };
  const onSubmit = () => {
    handlePublishCourse();
  };
  const goBack = () => {
    dispatch(setStep(2));
  };
  return (
    <div className="rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700">
      <h1>Publish Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="rounded h-4 p-3 m-3"
          />
          <label htmlFor="public">Make this Course as Public</label>
        </div>

        <div className="flex justify-center gap-x-3 ">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex items-center rounded-md"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="save changes" />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
