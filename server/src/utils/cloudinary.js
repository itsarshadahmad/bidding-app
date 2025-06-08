const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // file has been uploaded successful
        // console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        // console.error(error);
        // remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath);
        return null;
    }
};

// Initialize cloudinary
const initializeCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        console.log("Cloudinary initialized successfully!");
    } catch (error) {
        console.error(error);
    }
};

// Remove cloudinary image
const removeCloudinaryImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        // console.log("file is removed from cloudinary");
        return result;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    uploadOnCloudinary,
    initializeCloudinary,
    removeCloudinaryImage,
};
