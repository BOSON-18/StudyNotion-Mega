const cloudinary = require('cloudinary').v2;

exports.uploadToCloudinary = async (file, folder, height, quality) => {
    const options = { folder };
    if (height) {
        options.height = height;
    }

    if (quality) {
        options.quality = quality;
    }


    options.resource_type = "auto";
    console.log(file)

    return await cloudinary.uploader.upload(file.tempFilePath, options);

}