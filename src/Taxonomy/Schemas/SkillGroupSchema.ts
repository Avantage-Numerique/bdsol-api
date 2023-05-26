import mongoose, {Schema} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";


export interface SkillGroupSchema extends Document {
    groupName:string;
    skills: [mongoose.ObjectId] ;
    status: Status;
}


export class SkillGroup {

    /** @static schema */
    static schema:Schema = new Schema<SkillGroupSchema>({
        groupName: {
            type: String
        },
        skills:{
            type: [mongoose.Types.ObjectId],
            ref: 'Taxonomy'
        },
        status: Status.schema
    }, { _id : false });
}
