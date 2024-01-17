const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadToCloudinary } = require("../utils/imageUploader");

//video uploader

//create SubSection

exports.createSubSection = async (req, res) => {
  try {
    //fetch data

    const { sectionId, title, timeDuration, description } = req.body;

    //extract video
    const video = req.files.videoFile; //uploading to cludinary sent as file so have to extract it like this

    //validation

    if (!sectionId || !timeDuration || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    //upload to cloudinary

    const uploadDetails = await uploadToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //create a sub-section

    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    //update section with this sub section object id

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: SubSectionDetails._id,
        },
      },
      { new: true }
    ).populate('subSection').exec();

    //use populate
    //log updated section here after adding populate entry

    //return res

    return res.status(200).json({
      success: true,
      message: "Sub Section crated successfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Sub Section creation failed",
      error: error.message,
    });
  }
};

//update and delete section HW
