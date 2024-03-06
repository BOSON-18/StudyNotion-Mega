const Profile = require("../models/Profile");
const User = require("../models/User");
const { use } = require("../routes/User");
const { uploadToCloudinary } = require("../utils/imageUploader");
const Courses=require("../models/Profile");

exports.updateProfile = async (req, res) => {
  try {
    //get data required

    const { dateOfBirth = "", about = "", contactNumber="", gender="" } = req.body;
    //fetch user id also
    const id = req.user.id; //auth middle ware me use ki hai
    //validation
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //find profile

    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    //update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();
    //return response

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Profile updation Failed",
      error: error.message,
    });
  }
};

//delete account

exports.deleteAccount = async (req, res) => {
  try {
    //find user id
    const id = req.user.id;
    //validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    //TODO: HW unenroll user from courses

    //delete account
    //cronejob->How can we schedule this deletion export

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    await User.findByIdAndDelete({ _id: id });

    //return response

    return res.status(200).json({
      success: true,
      message: "Account Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Profile deletion Failed",
      error: error.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id).populate("additionalDetails").exec();
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No such user",
      });
    }

    return res.status(202).json({
      success: true,
      message: "User details found and sent successfully",
      user
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Failed to fetch User Details",
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const image = req.files.profilePicture;

    const userId = req.user.id;

    const displayPicture = await uploadToCloudinary(
      image,
      process.env.FOLDER_NAME,
      1000,
      100
    );

    console.log(displayPicture);

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      {
        image: displayPicture.secure_url,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Image updated",
      profile: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses=async(req,res)=>{
  try{
    const userId=req.user.id;
    const userDetails=await User.findOne({
      _id:userId
    }).populate("courses").exec()

  if(!userDetails){
    return res.status(400).json({
      success:false,
      message:`Could not find user with id: ${userDetails}`,
    })
  }

  return res.status(200).json({
    success:true,
    data:userDetails.courses
  })

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
