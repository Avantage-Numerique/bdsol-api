import PublicLocalMediaStorage from "../Storage/PublicLocalMediaStorage";

const uploadSingle = PublicLocalMediaStorage.middleware("temp/123456789123456789123456/");

export default uploadSingle;

/**
 * import multer from 'multer';
 * import mime from 'mime-types';
 *
 * interface ValidationOptions {
 *   allowedMimeTypes: string[];
 * }
 *
 * class FileValidationMiddleware {
 *   private upload: multer.Instance;
 *   private options: ValidationOptions;
 *
 *   constructor(options: ValidationOptions) {
 *     this.options = options;
 *     this.upload = multer({
 *       fileFilter: this.fileFilter.bind(this)
 *     });
 *   }
 *
 *   fileFilter(req: any, file: any, cb: any) {
 *     const mimetype = mime.lookup(file.originalname);
 *     if (!this.options.allowedMimeTypes.includes(mimetype)) {
 *       return cb(new Error(`Invalid file type. Only ${this.options.allowedMimeTypes.join(', ')} are allowed.`), false);
 *     }
 *     cb(null, true);
 *   }
 *
 *   public handle(field: string) {
 *     return this.upload.single(field);
 *   }
 * }
 *
 * const options = {
 *   allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
 * };
 *
 * export default new FileValidationMiddleware(options);
 */