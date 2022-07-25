import {Schema, Document} from "mongoose"
import {PasswordsController} from "../../Authentification/Controllers/PasswordsController";

/**
 *
 */
export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    avatar: string;
    name: string;
    role: string;
}

export interface UserRegistrationRequiredData {
    username: string;
    email: string;
    password: string;
}

export const UserValidation:any = {
    username: ["isString", "required", "unique"],
    email: ["isString", "required", "unique"],
    password: ["isString", "isUnique"],
    avatar: ["isString", "isUrl"],
    name: ["isString"],
    role: ["isString"]
};

/**
 * @deprecated
 */
export class UserSchema {

    private _username: string;
    private _email: string;
    private _password: string;
    private _avatar: string;
    private _name: string;
    private _role: string;

    static documentSchema: Schema<UserDocument>;

    constructor(props: any) {
        this.username = props.username || "no username";
        this.email = props.email || "no email";
        this.password = props.password || "no password";
        this.avatar = props.avatar || "no avatar";
        this.name = props.name || "no name";
        this.role = props.role || "no role";
    }

    /**
     * Set the event to adjust data to the current document on Pre.
     * doc : https://mongoosejs.com/docs/typescript/schemas.html
     * à relire : https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
     */
    static async registerPreEvents() {
        if (UserSchema.documentSchema !== undefined)
        {
            UserSchema.documentSchema.pre('save', UserSchema.hashPasswordBeforeSaving);
            UserSchema.documentSchema.pre('UpdateOne', UserSchema.hashPasswordBeforeSaving);

            /*// CREATE users, we hash the password.
            await UserSchema.documentSchema.pre('save', async function (next: any): Promise<any>
            {
                const user: any = this;
                if (!user.isModified('password')) {
                    return next();
                }
                try {
                    user.password = await PasswordsController.hash(user.password);
                } catch (error: any) {
                    throw error;
                }
                return next();
            });

            // UpdateOne users, we hash the password.
            //await UserSchema.documentSchema.pre('UpdateOne', UserSchema.hashPasswordBeforeSaving);
            //await UserSchema.documentSchema.pre('save', UserSchema.hashPasswordBeforeSaving);
            await UserSchema.documentSchema.pre('UpdateOne', async function (next: any): Promise<any>
            {
                const user: any = this;
                if (!user.isModified('password')) {
                    return next();
                }
                try {
                    user.password = await PasswordsController.hash(user.password);
                } catch (error: any) {
                    throw error;
                }
                return next();
            });*/
        }
    }

    // hashPasswordBeforeSaving
    static async hashPasswordBeforeSaving(next:any):Promise<any>
    {
        const user: any = this;
        if (!user.isModified('password')) {
            return next();
        }
        try {
            user.password = await PasswordsController.hash(user.password);
        } catch (error: any) {
            throw error;
        }
        return next();
    }


    /**
     * @deprecated ???
     * Premier jet de retour de données public, versus privé.
     **/
    public static dataTransfertObject(document: any) {
        return {
            username: document.username,
            avatar: document.avatar,
            name: document.name,
            id: document._id
        }
    }


    public get username(): string {
        return this._username;
    }

    public set username(username) {
        this._username = username;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password) {
        this._password = password;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email) {
        this._email = email;
    }

    public get avatar(): string {
        return this._avatar;
    }

    public set avatar(avatar) {
        this._avatar = avatar;
    }

    public get name(): string {
        return this._email;
    }

    public set name(name) {
        this._name = name;
    }

    public get role(): string {
        return this._role;
    }

    public set role(role) {
        this._role = role;
    }
}