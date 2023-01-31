/**
 * Contract to setup limit of multer.
 * Copy of multerOptions.limits interface : https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/multer/index.d.ts
 * Multer passes this limits directly to https://github.com/mscdex/busboy#busboy-methods
 */
interface FileLimitsContract {
    /** Maximum size of each form field name in bytes. (Default: 100) */
    fieldNameSize?: number;
    /** Maximum size of each form field value in bytes. (Default: 1048576) */
    fieldSize?: number;
    /** Maximum number of non-file form fields. (Default: Infinity) */
    fields?: number;
    /** Maximum size of each file in bytes. (Default: Infinity) */
    fileSize?: number;
    /** Maximum number of file fields. (Default: Infinity) */
    files?: number;
    /** Maximum number of parts (non-file fields + files). (Default: Infinity) */
    parts?: number;
    /** Maximum number of headers. (Default: 2000) */
    headerPairs?: number;
}