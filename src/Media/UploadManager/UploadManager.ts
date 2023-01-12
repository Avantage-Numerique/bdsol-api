import Record from "./Record";

export default class UploadManager {

    protected static managerInstance:UploadManager;
    private queue:Record[];
    private isSaving:boolean;

    public static getInstance(){
        if (UploadManager.managerInstance === undefined){
            UploadManager.managerInstance = new UploadManager();
            UploadManager.managerInstance.queue = [];
            UploadManager.managerInstance.isSaving = false;
        }
        return UploadManager.managerInstance;
    }

    //Public method to upload a file
    public uploadFile(record:Record){
        //If all information provided follows RecordContract and is fine for upload

        //Test the record to see if valid ?
        /*if (this.file == undefined ||
            this.type == undefined ||
            this.fileName == undefined ||
            this.extension == undefined ||
            this.path == undefined
            ){ return false; }*/

        //Then enqueue
        this.enqueue(record);
        //Return true?

    }

    //Add a file to the end of the queue
    private enqueue(record:Record){
        //Queue record
        this.queue.push(record);

        //If not already in the process of saving, start it
        if(!this.isSaving)
            this.saveFile();
    }

    //Remove the first element of the queue (to process first) and returns it
    private dequeue():Record | undefined{
        return this.isEmpty() ? undefined : this.queue.shift()
    }

    //Return if queue is empty
    private isEmpty():boolean{
        return this.queue.length == 0;
    }

    //Returns the first element of the queue without removing it
    private peek(){
        return this.isEmpty() ? undefined : this.queue[0];
    }

    //save the file on the hardware
    private saveFile(){
        this.isSaving = true;
        while(!this.isEmpty){
            const recordToSave:Record | undefined = this.dequeue();
            
            //Should not happen
            if(recordToSave == undefined)
                break;

            switch(recordToSave.type){
                case "image":this.saveImage(recordToSave);break;
                case "video":this.saveVideo(recordToSave);break;
                case "sound":this.saveSound(recordToSave);break;
                default: //?
            }
            //save the file to path;
        }
        this.isSaving = false;
    }

    private saveImage(record:Record):boolean{ return true; }
    private saveVideo(record:Record):boolean{ return true; }
    private saveSound(record:Record):boolean{ return true; }
}


