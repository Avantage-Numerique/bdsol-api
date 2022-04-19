import {Schema, Document} from "mongoose"

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
        //this.initGetterSetter();
        // make this as a loop from documentSchema to keep this as dry as it should.
        this.username = props.username || "no username";
        this.email = props.email || "no username";
        this.password = props.password || "no username";
        this.avatar = props.avatar || "no username";
        this.name = props.name || "no username";
        this.role = props.role || "no username";

        //this.RestrictAccessToUnderscoreVarsFromExternalScope(this);
        //this.initGetterSetter();
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
        return this._email;
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

//Mongoose pre
/*

user_schema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function (error, hash) {
    if (error) return next(error);
    user.password = hash;
    console.log(hash); // properly consoles the hash
    next();
  });
});
 */

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