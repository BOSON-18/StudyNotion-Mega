import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const {
    register,

    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
  };

  const ratingChanges = (newRating) => {
    setValue("courseRating", newRating);
  };
  return (
    <div>
      <div>
        {/* Modal Header */}
        <div>
          <p>Add Review</p>
          <button onClick={setReviewModal(false)}>Close</button>
        </div>

        {/* Modal Body */}
        <div>
          <img
            src={user?.image}
            alt="user-image"
            className="rounded-full aspect-square w-[50px] object-cover"
          />
        </div>
        <div>
          <p>
            {user?.firstName} {user.lastName}
          </p>
          <p>Posting Publicly</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ReactStars
            onChange={ratingChanges}
            count={5}
            size={24}
            ativeColor="#ffc70"
          />

          <div>
            <label htmlFor="courseExperience">Add your Experience</label>

            <textarea
              id="courseExperience"
              placeholder="Add Your expereience here"
              {...register("courseExpereience", { required: true })}
              className="form-style min-h-[130px] w-full"
            >
              {errors.courseExpereince && (
                <span>Pleasse add you expereience</span>
              )}
            </textarea>
          </div>

          {/* cancel and save button */}

          <div>
            <button onClick={() => setReviewModal(false)}>Cancel</button>
            <IconBtn text="save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseReviewModal;
