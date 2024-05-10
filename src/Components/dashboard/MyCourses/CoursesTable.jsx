import { useDispatch, useSelector } from "react-redux"
// import { t, tbody, tbody, td, th, Thead, tr } from "react-super-responsive-table"

import { setCourse, setEditCourse } from "../../../utils/slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import {setLoading} from "../../../utils/slices/authSlice"


//import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../utils/constants"
import ConfirmationModal from "../../common/ConfirmationModal"

const CoursesTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { token } = useSelector((state) => state.auth);
  const{loading} = useSelector((state)=>state.auth)
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handlerCourseDelete = async(courseId)=>{
    setLoading(true);

    await deleteCourse({courseId:courseId},token);
    const result= await fetchInstructorCourses(token);
    if(result){
      setCourses(result)
    }

    setConfirmationModal(null);
    setLoading(false)

  }
  return (
    
      <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-richblack-800">
        <thead>
          <tr className="bg-richblack-900 text-white">
            <th className="px-4 py-2">Courses</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">No Courses Found</td>
            </tr>
          ) : (
            courses?.map((course) => (
              <tr
                key={course._id}
                className="border border-richblack-800"
              >
                <td className="flex items-center px-4 py-2">
                  <img
                    src={course?.thumbnail}
                    alt="Thumbnail"
                    className="h-24 w-36 rounded-lg object-cover"
                  />

                  <div className="ml-4">
                    <p className="font-semibold">{course.courseName}</p>
                    <p className="text-sm">{course.courseDescription}</p>
                    <p className="text-sm">Created:</p>
                    <p className={course.status === COURSE_STATUS.DRAFT ? "text-pink-100 text-sm" : "text-yellow-50 text-sm"}>
                      {course.status === COURSE_STATUS.DRAFT ? "Drafted" : "Published"}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-2">2hr 30min</td>

                <td className="px-4 py-2">${course.price}</td>

                <td className="px-4 py-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                  >
                   {FiEdit2} EDIT
                  </button>

                  <button
                    className="px-4 py-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                    disabled={loading}
                    onClick={()=>{
                      setConfirmationModal({
                        text1:"Do You want to delete this course?",
                        text2:"All the data related to this course will be deleted.",
                        btn1Text:"Delete",
                        btn2Text:"Cancel",
                        btn1Handler:!loading ? ()=>handlerCourseDelete(course._id):()=>{},
                        btn2Handler:!loading?()=>setConfirmationModal(null):()=>{}
                      })
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CoursesTable;
