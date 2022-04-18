import {Schema, Document} from "mongoose"

/**
 *
 */
export interface UserDocument extends Document {
    username:string;
    email:string;
    password:string;
    name:string;
    role: string;
    avatar:string;
}

export class UserSchema {

    public username:string;
    public email:string;
    public password:string;
    public avatar:string;
    public name:string;
    public role:string;

    static documentSchema:Schema<UserDocument>;

    constructor (props:any) {

        this.username = props.username || "no username";
        this.email = props.email || "no username";
        this.password = props.password || "no username";
        this.avatar = props.avatar || "no username";
        this.name = props.name || "no username";
        this.role = props.role || "no username";
    }

    static schema():Schema<UserDocument> {

        if (UserSchema.documentSchema === null) {

            UserSchema.documentSchema = new Schema<UserDocument>({
                username: { type: String, required: true, unique: true },
                email: { type: String, required: true, unique: true },
                password: { type: String, required: true },
                avatar: String,
                name: String,
                role: String
            },
            {
                timestamps: true
            });
        }
        return UserSchema.documentSchema;
    }

    // @todo ajouter ResponsePublic de model.
    public parseDataPublic() {
        let schema = UserSchema.schema;

    }
}