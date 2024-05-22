//IMP read Docs RazorPay

const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");
require("dotenv").config();

// //initiate the razorpay order
// exports.capturePayment = async(req, res) => {

//     const {courses} = req.body;
//     const userId = req.user.id;

//     if(courses.length === 0){
//         return res.json({success:false, message:"Please provide Course Id"});
//     }
//     let totalAmount = 0;

//     for(const course_id of courses) {
//         let course;
//         try{
//             course = await Course.findById(course_id);
//             if(!course) {
//                 return res.status(200).json({success:false, message:"Could not find the course"});
//             }

//             const uid  = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)) {
//                 return res.status(200).json({success:false, message:"Student is already Enrolled"});
//             }

//             totalAmount += course.price;
//         }
//         catch(error){
//             console.log(error);
//             return res.status(500).json({success:false, message:error.message});
//         }
//     }
//     const currency = "INR";
//     const options = {
//         amount: totalAmount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//     }

//     try{
//         const paymentResponse = await instance.orders.create(options);
//         res.json({
//             success:true,
//             message:paymentResponse,
//         })
//     }
//     catch(error) {
//         console.log(error);
//         return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
//     }
// }

// //verify the payment
// exports.verifyPayment = async(req, res) => {
//     const razorpay_order_id = req.body?.razorpay_order_id;
//     const razorpay_payment_id = req.body?.razorpay_payment_id;
//     const razorpay_signature = req.body?.razorpay_signature;
//     const courses = req.body?.courses;
//     const userId = req.user.id;

//     if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
//            return res.status(200).json({success:false, message:"Payment Failed"});
//     }

//     let body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_SECRET)
//         .update(body.toString())
//         .digest("hex");

//         if(expectedSignature === razorpay_signature) {
//             await enrollStudents(courses, userId, res);                   //enroll karwao student ko
//             return res.status(200).json({success:true, message:"Payment Verified"});    //return res
//         }
//         return res.status(200).json({success:"false", message:"Payment Failed"});
// }

// const enrollStudents = async(courses, userId, res) => {

//     if(!courses || !userId) {
//         return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
//     }

//     for(const courseId of courses) {
//         try{                                            //find the course and enroll the student in it
//         const enrolledCourse = await Course.findOneAndUpdate({_id:courseId}, {$push:{studentsEnrolled:userId}}, {new:true},)

//         if(!enrolledCourse){
//             return res.status(500).json({success:false,message:"Course not Found"});
//         }
//         // created courseProgress for enrolled Courses in DB;
//         const courseProgress = await CourseProgress.create({
//             courseID:courseId,
//             userId:userId,
//             completedVideos: [],
//         })

//         //find the student and add the course to their list of enrolledCOurses
//         const enrolledStudent = await User.findByIdAndUpdate(userId,  {$push:{ courses: courseId,  courseProgress: courseProgress._id, }},{new:true})

//         ///Send mail to the Student;
//         const emailResponse = await mailSender( enrollStudents.email, `Successfully Enrolled into ${enrolledCourse.courseName}`,  courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`))
//     }
//         catch(error) {
//             console.log(error);
//             return res.status(500).json({success:false, message:error.message});
//         }
//     }
// }

// exports.sendPaymentSuccessEmail = async(req, res) => {
//     const {orderId, paymentId, amount} = req.body;

//     const userId = req.user.id;

//     if(!orderId || !paymentId || !amount || !userId) {
//         return res.status(400).json({success:false, message:"Please provide all the fields"});
//     }

//     try{
//         //student ko dhundo
//         const enrolledStudent = await User.findById(userId);
//         await mailSender(
//             enrolledStudent.email,
//             `Payment Recieved`,
//              paymentSuccessEmail(`${enrolledStudent.firstName}`,
//              amount/100,orderId, paymentId)
//         )
//     }
//     catch(error) {
//         console.log("error in sending mail", error)
//         return res.status(500).json({success:false, message:"Could not send email"})
//     }
// }

exports.capturePayment = async (req, res) => {
  //initiate the razorpay order
  //u buy r not an order will initiate whether u will buy or not

  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length === 0) {
    return res.json({
      success: false,
      message: "Please provide Course Id",
    });
  }

  let totalAmount = 0;

  for (const course_id of courses) {
    let course;
    try {
      console.log("COURSE ID", course_id);
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Could not find the course",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already registered",
        });
      }

      totalAmount += course.price;
    } catch (error) {
      console.log("Error in capturing ", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  //create options mandatory
  const currency = "INR";
  const options = {
    amount: totalAmount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    return res.json({
      success: true,
      message: paymentResponse,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Could not initiate Order" });
  }
};

//Order initiate hogya ab Verify bhi toh krna padega

exports.verifyPayment = async (req, res) => {
  //oreeder id payment signature
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(404).json({
      success: false,
      message: "Something is missing",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  console.log("RazorPay Secret", "uqmJH6hyXAtVxzgmh4NExNIf");
  const expectedSignature = crypto
    .createHmac("sha256", "uqmJH6hyXAtVxzgmh4NExNIf")
    .update(body.toString())
    .digest("hex");
    const enrollStudents = async (courses, userId, res) => {
      //validation
  
      if (!courses || !userId) {
        return res.status(404).json({
          success: false,
          message: "Please provide data for courses or userId",
        });
      }
  
      for (const courseId of courses) {
        try {
          //find course id of eachcourse and enroll student to it
          const enrolledCourse = await Course.findByIdAndUpdate(
            { _id: courseId },
            { $push: { studentsEnrolled: userId } },
            { new: true }
          );
  
          if (!enrolledCourse) {
            return res.status(500).json({
              success: "false",
              message: "Course not found ",
            });
          }
  
          //find the student and add the course into it ennrolledCourses
  
          const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
              $push: {
                courses: courseId,
              },
            },
            { new: true }
          );
  
          //send mail to student
  
          //error aayega
  
          const emailResponse = await mailSender(
            enrollStudents.email,
            `Successfully enrolled into ${enrolledCourse.courseName}`,
            "Template fot COurse Enrollment"
          );
  
          console.log("Email sent Successfully,emailResponse.response");
        } catch (error) {
          console.log("error in verifying");
  
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      }
    };

  if (expectedSignature === razorpay_signature) {
    //enroll stdent
    await enrollStudents(courses, userId, res);

    //return res

    return res.status(200).json({
      success: true,
      message: "Student enrolled successfully-Payment verified",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Payment verified",
  });

 
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the fields",
    });
  }

  try {
    //student ko find kro
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res.status(500).json({
      success: false,
      message: "Could not send email",
    });
  }
};
