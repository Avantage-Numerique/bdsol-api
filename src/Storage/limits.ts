import FileLimits from "./Config/FileLimits";


const defaultSingleFileLimits:FileLimitsContract = {
    fileSize: 200000,//200kb in bytes
    files: 1
}

export const SingleLimits:FileLimitsContract = new FileLimits(defaultSingleFileLimits);
export const SingleImageLimits:FileLimitsContract = new FileLimits(defaultSingleFileLimits);
export const SingleMediaLimits:FileLimitsContract = new FileLimits(defaultSingleFileLimits);