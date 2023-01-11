
class MediaController {

    private file:BinaryData;
    private type:string;//image, video, sound
    private fileName:string;
    private extension:string;
    private path:string;

    constructor (file:BinaryData, type:string, fileName:string, extension:string, path:string){
        this.file = file;
        this.type = type;
        this.fileName = fileName;
        this.extension = extension;
        this.path = path;
    }

    public uploadFile():boolean{
        //If file not defined properly
        if (this.file == undefined ||
            this.type == undefined ||
            this.fileName == undefined ||
            this.extension == undefined ||
            this.path == undefined
            ){ return false; }

        let isUploaded = false;
        //Need type of file (img, video, sound)
        //Need file to save
        //Need path for the file
        //Need extension of the file
        //Need fileName
        //Maybe need property of the entity that the media need to be save for (mainImage)

        /*Could pass the database saved object and deconstruct it here
            but for it to be standalone, would prefer having all of the above as params
            or determined inside the function
        */

        //Todo:
        //Save to the path, the file with the name fileName (date?) with extension
        switch(this.type){
            case "image": isUploaded = this.uploadImage();break;
            case "video": isUploaded = this.uploadVideo();break;
            case "sound": isUploaded = this.uploadSound();break;
            default: return false
        }

        return isUploaded;
    }

    private uploadImage():boolean{return true;}
    private uploadVideo():boolean{return true;}
    private uploadSound():boolean{return true;}


    
}

export default MediaController;