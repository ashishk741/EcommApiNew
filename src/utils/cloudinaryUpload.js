const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


console.log("Cloudinary Config:", {
    cloud: process.env.CLOUDINARY_CLOUD_NAME,
    key: process.env.CLOUDINARY_API_KEY
});


const uploadImage = (buffer) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "ecommerce"
            },
            (error, result) => {

                if(error){
                    reject(error);
                } else {
                    resolve(result);
                }

            }
        );

        streamifier
            .createReadStream(buffer)
            .pipe(stream);

    });

};


module.exports = uploadImage;