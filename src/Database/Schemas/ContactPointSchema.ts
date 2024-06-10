import {Document, Schema} from "mongoose";

export interface ContactPointSchema extends Document {
    email:object;
    tel:object;
    website:object;
}

export class ContactPoint {

    /** @static schema */
    static schema:Schema =
    new Schema<ContactPointSchema>({
        email: {
            address: String,
            //label: String,
            //subject: String,
            //body: String
        },
        tel: {
                num: String,
                ext: String,
                //code internationnal : String
        },
        website: {
            url: String,
        }
    },{ _id : false }
    );
}
