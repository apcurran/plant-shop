"use strict";

// TODO: check fs module's createReadStream for compatibility
const streamifier = require("streamifier");

const { cloudinary } = require("../util/cloudinary");

function streamUploadToCloudinary(imgFile, folderPath) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folderPath
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(imgFile.buffer).pipe(stream);
    });
}

module.exports = { streamUploadToCloudinary };