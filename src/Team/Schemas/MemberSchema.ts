import mongoose, {Document, Schema} from "mongoose";
import {SubMeta} from "@src/Moderation/Schemas/MetaSchema";

export interface RoleSchema extends Document {
    group:string;
    title:string;
}

export class Role {
    /** @static schema*/
    static schema:Schema = 
    new Schema<RoleSchema>({
        group: {
            type: String,
        },
        title: {
            type: String,
        }
    }, {
        timestamps: true
        }
    );
}

export interface MemberSchema extends Document {
    member:mongoose.ObjectId;
    role: string;
    subMeta: SubMeta;
}


export class Member {

    /** @static schema */
    static schema:Schema = new Schema<MemberSchema>({
        //Id of the member of the team
        member: {
            type: mongoose.Types.ObjectId,
            required: [true, 'Required memberId to identify member'],
            ref: "Person"
        },
        role: {
            type: String,
        },
        subMeta: {
            type: SubMeta.schema,
            //required: true
        }
    }, { _id : false });
}
