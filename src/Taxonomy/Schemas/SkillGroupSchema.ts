import mongoose, {Document, Schema} from "mongoose";
import {SubMeta} from "@src/Moderation/Schemas/MetaSchema";


export interface SkillGroupSchema extends Document {
    groupName:string;
    skills: [mongoose.ObjectId] ;
    subMeta: SubMeta;
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
        subMeta: SubMeta.schema
    }, { _id : false });
}
