import {Schema, Document} from "mongoose"
import {PasswordsController} from "../../Authentification/Controllers/PasswordsController";

/**
 *
 */
export interface UserDocument extends Document {
    username:string;
    email:string;
    password:string;
    avatar:string;
    name:string;
    role: string;
}

export class UserSchema {

    private _username:string;
    private _email:string;
    private _password:string;
    private _avatar:string;
    private _name:string;
    private _role:string;

    static documentSchema:Schema<UserDocument>;

    constructor (props:any) {
        this.username = props.username || "no username";
        this.email = props.email || "no username";
        this.password = props.password || "no username";
        this.avatar = props.avatar || "no username";
        this.name = props.name || "no username";
        this.role = props.role || "no username";
    }

    /**
     * Mongoose schema getter as a singleton.
     */
    static schema():Schema<UserDocument> {

        if (UserSchema.documentSchema === undefined) {

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

    /**
     * Set the event to adjust data to the current document on Pre.
     * doc : https://mongoosejs.com/docs/typescript/schemas.html
     * à relire : https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
     */
    static async registerPreEvents() {
        if (UserSchema.documentSchema !== undefined)
        {
            await UserSchema.documentSchema.pre('save', async function (next:any): Promise<any>
            {
                const user:any = this;
                if (!user.isModified('password')) {
                    return next();
                }
                try
                {
                    user.password = await PasswordsController.hash(user.password);
                }
                catch(error:any)
                {
                    throw error;
                }
                return next();
            });
        }
    }


    /**
     * Premier jet de retour de données public, versus privé.
     **/
    /*public publicRouteData() {
        let schema = UserSchema.schema();
        return {
            "user" : {
                username: this.username,
                email: this.email,
                avatar: this.avatar,
                name: this.name,
            }
        }
    }*/


    public get username():string {
        return this._username;
    }
    public set username(username) {
        this._username = username;
    }

    public get password():string {
        return this._password;
    }
    public set password(password) {
        this._password = password;
    }

    public get email():string {
        return this._email;
    }
    public set email(email) {
        this._email = email;
    }

    public get avatar():string {
        return this._avatar;
    }
    public set avatar(avatar) {
        this._avatar = avatar;
    }

    public get name():string {
        return this._email;
    }
    public set name(name) {
        this._name = name;
    }

    public get role():string {
        return this._role;
    }
    public set role(role) {
        this._role = role;
    }
}


/*
    private RestrictAccessToUnderscoreVarsFromExternalScope(obj) {
        return new Proxy(obj, {
            get(target, prop, receiver) {
                if (typeof (target[prop]) !== "function" &&
                    prop.startsWith("_"))
                    return;

                if (typeof (target[prop]) === "function")
                    return target[prop].bind(target);

                return target[prop];
            },

            set(target, prop, value, receiver) {
                if (prop.startsWith("_"))
                    return false;

                target[prop] = value;
            }
        });
    }

    private initGetterSetter() {

        const proxy = new Proxy(this, {
            get(target, name, receiver) {
                return Reflect.get(target, "_"+name, receiver);
            },
            set(target, name, value, receiver) {
                if (!Reflect.has(target, "_"+name)) {
                    console.log(`Setting non-existent property '${String(name)}', initial value: ${value}`);
                }
                return Reflect.set(target, name, value, receiver);
            }
        });
    }
*/