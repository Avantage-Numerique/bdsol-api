import * as mimeTypesDb from "mime-db";

export const ImageMimeTypeSupported = [
    'image/png',
    'image/jpeg',//'image/jpg',
    'image/webp'
];

const imgMimeTypeExtensions:any = {};

for (const mimetype in ImageMimeTypeSupported) {
    imgMimeTypeExtensions[mimetype] = mimeTypesDb[mimetype].extensions ?? undefined;
    //throw error if the mime type set in support isn't present in the mine-db.
}

export const ImageExtensionsSupported = imgMimeTypeExtensions;


export const imageSupported = (file:any) => {
    return file;
}