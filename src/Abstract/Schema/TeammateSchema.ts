import mongoose, {Schema} from "mongoose";
import { Status } from "./StatusSchema";



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

export interface TeammateSchema extends Document {
    teammateId:mongoose.ObjectId;
    role: Role;
    status: Status;
}


export class Teammate {

    /** @static schema */
    static schema:Schema =
    new Schema<TeammateSchema>({
        //Id of the member of the team
        teammateId: {
            type: mongoose.Types.ObjectId,
            minlength:[24, "ObjectId are 24 in length"],
            maxlength:[24, "ObjectId are 24 in length"],
            required: [true, 'Required memberId to belong to a team']
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
