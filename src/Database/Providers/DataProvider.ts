import mongoose from "mongoose";
import config from "../../config";
import LogHelper from "../../Monitoring/Helpers/LogHelper";
import type {DbProvider} from "./DbProvider";
import {BaseProvider} from "./DbProvider";
import Personne from "../../Personnes/Models/Personne";
import AbstractModel from "../../Abstract/Model";
import PersonnesService from "../../Personnes/Services/PersonnesService";


export class DataProvider extends BaseProvider implements DbProvider {

    private static _singleton:DataProvider;

    private _models:Array<AbstractModel>;

    constructor(name='data') {
        super(name);
        this.urlPrefix = "mongodb";
    }

    public static getInstance():DbProvider {
        if (DataProvider._singleton === undefined) {
            DataProvider._singleton = new DataProvider(config.db.name);
        }
        return DataProvider._singleton;
    }


    public async connect():Promise<mongoose.Connection|undefined> {
        try {
            LogHelper.log("[BD] DataProvider Connecting to DB");
            await super.connect();

            //Personne.connection = this.connection;

            //const modelInstance = this.assign(Personne.getInstance());
            //this.service = PersonnesService.getInstance(modelInstance);

            return this.connection;
        }
        catch (error:any) {
            LogHelper.error("[BD] Can't connect to db in DataProvider");
        }
        return undefined;
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

    public assign(model:AbstractModel) {
        this.addModel(model);
        model.connection = this.connection;
        model.provider = this;
        return model;
    }

}