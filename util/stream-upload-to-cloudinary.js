import { Readable } from "stream";

import { cloudinary } from "../util/cloudinary.js";

export function streamUploadToCloudinary(imgFile, folderPath) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folderPath,
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            },
        );

        Readable.from(imgFile.buffer).pipe(stream);
    });
}
