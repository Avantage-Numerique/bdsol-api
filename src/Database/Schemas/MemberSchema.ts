import mongoose, {Schema} from "mongoose";
import { Status } from "../../Moderation/Schemas/StatusSchema";



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
    role: Role;
    status: Status;
}


export class Member {

    /** @static schema */
    static schema:Schema =
    new Schema<MemberSchema>({
        //Id of the member of the team
        member: {
            type: mongoose.Types.ObjectId,
            required: [true, 'Required memberId to belong to a team'],
            ref: "Personne"
        },
        role: {
            type: Role.schema,
        },
        status: {
            type: Status.schema
        }
    },
        {
            timestamps: true
        }
    );
}
