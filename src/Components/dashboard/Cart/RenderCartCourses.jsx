import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineStarOutline } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../utils/slices/cartSlice";
const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div>
      {cart.map((course, index) => (
        <div>
          <img src={course.thumbnail} alt="thumbnail" />
          <div>
            <p>{course.courseName}</p>
            <p>{course?.category?.name}</p>
            <div>
              {/* HW getAvg rating connect it here */}
              <span>4.8</span>
              {/* Stars */}
              <ReactStars
                count={5}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<MdOutlineStarOutline />}
                fullIcon={<MdOutlineStarOutline />}
              />

              <span>{course?.ratingAndReviews?.length}</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                dispatch(removeFromCart(course?._id));
              }}
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>

            <p>Rs. {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
