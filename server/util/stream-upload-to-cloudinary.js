"use strict";

const { Readable } = require("stream");

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

        Readable
            .from(imgFile.buffer)
            .pipe(stream);
    });
}

module.exports = { streamUploadToCloudinary };