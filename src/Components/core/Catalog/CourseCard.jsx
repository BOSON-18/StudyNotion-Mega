/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../common/RatingStars"
import GetAverageRating from "../../../utils/avgRating";

const CourseCard = ({course,height}) => {

  const[avgReviewCount,setAvgReviewCount]=useState(0);

  useEffect(()=>{
    const count=  GetAverageRating(course?.ratingAndReview);
    setAvgReviewCount(count)

  },[course])

  return (
    <div>
      <Link to={`/courses/${course?._id}`}>
        <div>
          <div>
            <img src={course?.thumbnail} alt='Add Thubmnail' className={`${height} w-full rounded-md object-cover`}></img>
          </div>
          <div>
            <p>{course?.courseName}</p>
            <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div className='flex '>
              <span>{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount}  />
              <span>{course?.ratingAndReviews?.length}Ratings</span>
            </div>
            <p>{course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard