import SupportedFileTypes from "./Config/SupportedFileTypes";


const SupportedImageMimeTypes:Array<string> = [
    "Image/png",
    "image/jpg",
    "Image/jpeg",
    "Image/webp",
    "Image/gif"
];

export const SupportedImageTypes:SupportedFileTypes = new SupportedFileTypes(SupportedImageMimeTypes);