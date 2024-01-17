const { instance } = require("../config/Razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

//const {courseEnrollmentEmail}=

//capture payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  //user id course id
  const { course_id } = req.body;
  const userId = req.user.id; //payload pass kiya tha
  //validation

  if (!course_id) {
    return res.status(404).json({
      success: false,
      message: "Plz provide valid course id",
    });
  }

  //valid course
  let course;
  try {
    course = await Course.findById(course_id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not found",
      });
    }

    //whether user already paid for the same or not
    //studentsEnrolled in Courses model
    const uid = new mongoose.Types.ObjectId(userId); //user id jo string me thi use object id me conversion kr liya hai

    if (course.studentsEnrolled.includes(uid)) {
      return res.status(300).json({
        success: false,
        message: "Student is already enrolled in course",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  //valid user

  //place order

  const amount = course.price;
  const currency = "INR";

  //Razorpay ke liye mandatory[Amount,Currency]
  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(), //optional
    notes: {
      courseId: course_id,
      userId,
    },
  };
  try {
    //initiate the payment using razorpay

    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);

    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id, //help in tracking
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not initiate response",
    });
  }
};

//abhi tk creation hua hai ab verification(capture) krna hai
//verify signature of razorpay and server

exports.verifySignature = async (req, res) => {
  //matching server ka secret and razorpay ka secret
  const webHookSecret = "12345678"; //server pr hoga ye
  //web hook hit hone ke baad signature aara
  const signature = req.headers["x-razorpay-signature"]; //documentation se dekhna ye
  //ye hash hoke aari isliye backend waala key bhi hash krre
  //HashBased message Authentication Code
  //Combination of Hashing Algorithm and Secret_Key
  const shasum = crypto.createHmac("sha256", webHookSecret);
  shasum.update(JSON.stringify(req.body)); //hr cheez ko hash krra bhai
  const digest = shasum.digest("hex"); //output ko digest format me show krte

  if (digest === signature) {
    console.log("Payment is authorized");

    //ab course id frontend  se nhi aayi hai so req me nhi ayegi
    //front end se nhi signature se aayi hai toh notes pass kiya tha jo usse fetch krre
    const { courseId, userId } = req.body.payload.payment.entity.notes; // testing kr paa rhe hote toh log krke ye nikal lete
    //forntend me verify krenge

    try {
      //fulfill action As Payment Authorised

      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }

      console.log(enrolledCourse);
      //find the course and enroll in it

      //find the student and add the course to list of enrolled curses

      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

      console.log(enrolledStudent);

      //send mail

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from CodeHelp",
        "You have successfully enrolled into " +
          enrolledCourse.title +
          ". Please check your dashboard for further details."
      );

      console.log(emailResponse);

      return res.status(200).json({
        success: true,
        message: "Signature verified and course added",
      });
    } catch (error) {
      console.log(error);

      return res.stauts(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid Request",
    });
  }
};
