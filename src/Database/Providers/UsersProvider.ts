import mongoose from "mongoose";
import config from "../../config";
import type {DbProvider} from "./DbProvider";
import {BaseProvider} from "./DbProvider";
import {User, UsersService} from "../../Users/UsersDomain";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import AbstractModel from "../../Abstract/Model";


export class UsersProvider extends BaseProvider implements DbProvider {

    private static _singleton:UsersProvider;

    private _models:Array<AbstractModel>;

    constructor(name='')
    {
        super(name);
        this.urlPrefix = "mongodb";
    }


    public static getInstance():DbProvider|undefined
    {
        if (UsersProvider._singleton === undefined) {
            UsersProvider._singleton = new UsersProvider(config.users.db.name);
        }
        return UsersProvider._singleton;
    }


    public async connect():Promise<mongoose.Connection|undefined>
    {
        LogHelper.log("UserProvider Connecting to DB");
        await super.connect();


        /*const userModelInstance:User = User.getInstance();

        userModelInstance.connection = this.connection;
        userModelInstance.provider = this;
        this.service = UsersService.getInstance(userModelInstance);*/

        return this.connection;
    }

    public addModel(model:AbstractModel)
    {
        /*
        for (model of this._models) {
            instance = model.getInstance();
        }
        let model:AbstractModel,
            instance:AbstractModel;
         */
        if (this._models === undefined && typeof this._models === "undefined") {
            this._models = [];
        }
        this._models.push(model);
    }


    public assign(model:AbstractModel)
    {
        this.addModel(model);
        model.connection = this.connection;
        model.provider = this;
        this.service = UsersService.getInstance(model);
    }
}