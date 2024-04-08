const Course = require('../models/Course');
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadToCloudinary } = require("../utils/imageUploader");
const { response } = require('express');


//createCoursehandler handler function

exports.createCourse = async (req, res) => {

    try {

        //fetch data

        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;

        //get thumbnail
       // const thumbnail = req.files.thumbnailImage;

        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });

        }

        //check isInstructor
        //checking coz if we remove accountType from payload we have to make an extra DB call everywhere for validation


        //TODO: check for user.id and instructor details id same or not
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details:", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not Found"
            });
        }

        //check given Category valid or not

        const tagDetails = await Category.findById(category);//coz in course model we have iut by ref =>> objectId

        if (!tagDetails) {

            return res.status(404).json({
                success: false,
                message: "Category Details not Found"
            });

        }

        //upload image to cloudinary

       // const thumbnailImage = await uploadToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for nerw course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,//smjh me aaya kyu li thi id??
            whatYouWillLearn: whatYouWillLearn,
            price,
			
            //tag: tagDetails._id,
            //thumbnail: thumbnailImage.secure_url,
        }) 



        // add this course to course list of instructor
        //add this to usere schema of instructor

        await User.findOneAndUpdate(
			{ _id: instructorDetails._id },
			{
				$push: {
					courses: newCourse._id,
				}
			},
			{ new: true }
		)


        //update Category ka schema HW



        //return response

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        })

    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error:error.message
        })
    }
}



//getAllCourses handler function

exports.showAllCourses = async (req, res) => {
    try {

        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            instructor: true,
            thumbnail: true,
            ratingAndReviews: true,
            studentsEnrolled: true
        }).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Data for all course fetched successfully",
            data: allCourses
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "cannot Fetch course data",
            error: error.message
        })
    }
}


//getCourseDetails

exports.getCourseDetails = async (req, res) => {
    try {

        //find course id 
        //find course details 
        //will be stored in id so populate 
        //return response

        const { courseId } = req.body;

        const courseDetails = await Course.findById({ _id: courseId }).populate(
            {
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            }
        )
            .populate("category")
          //  .populate("RatingAndReview")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                },
            })
        .exec();



        //validation

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`
            });
        }


        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails
        })

    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Failed to fetch details of the course"
        })
    }
}