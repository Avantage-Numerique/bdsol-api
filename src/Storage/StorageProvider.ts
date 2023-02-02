import SupportedFileTypes from "./Config/SupportedFileTypes";
import FileLimits from "./Config/FileLimits";

// Setup the config

//  IMAGES

//      MIMETYPES

const SupportedImageMimeTypes:Array<string> = [
    "Image/png",
    "image/jpg",
    "Image/jpeg",
    "Image/webp",
    "Image/gif"
];

export const SupportedImageTypes:SupportedFileTypes = new SupportedFileTypes(SupportedImageMimeTypes);
// SupportedImageTypes

//      LIMITS

const defaultSingleImageLimits:FileLimitsContract = {
    fileSize: 200000,//200kb in bytes
    files: 1
}

export const SingleImageLimits:FileLimitsContract = new FileLimits(defaultSingleImageLimits);



// add default storage into the main app flow.

// setup the folder if there isn't setup.

// Assign default provider for upload