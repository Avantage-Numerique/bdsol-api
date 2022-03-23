import * as mongoDB from "mongodb";
import LogHelper from "../Monitoring/Helpers/LogHelper";
import users from "../Authentification/Models/UserModel";

export default class CreateUsersCollection {

    db: mongoDB.Db;
    name: string = 'users';
    collection: mongoDB.Collection | null;

    constructor(db: mongoDB.Db) {
        this.db = db;
        this.collection = null;
    }

    public async up() {
        //check if this.name is already created ?
        //this.db.createCollection(this.name, this.onUp);
        /*if (this.db.getCollection(this.name).exists()) {

        }*/
        this.collection = this.db.collection(this.name);
        await this.collection.insertMany(users);
        //this.db.getDatabase("test")

        /*if (this.collection) {
            await users.forEach( (fakeUser) => {
                const result = this.collection.insertOne(fakeUser);
            });
        }*/
        //name
        //username
        //email
        //password
        //role
        //
    }

    public onUp(error:any, result:any) {
        LogHelper.error(error, result);
    }

    public down() {

    }
}
//