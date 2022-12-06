import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {Seeder} from "./Seeder";
import config from "../../config";
import {SeederContract} from "../Contracts/SeederContract";
import {Service} from "../Service";

export default class SeedData extends Seeder implements SeederContract {

    name = "Seed Data";
    service = {} as Service;//To satisfy typescript that don't want to have this set in the constructor in the first place.
    public data:any;
    public whereKeys:any;

    constructor(service:Service, data?:any, whereKey?:any) {
        super();
        this.service = service;
        this.data = data;
        this.whereKeys = whereKey;
    }

    public async seederConditions(): Promise<boolean>
    {
        return config.isDevelopment && this.collectionEmpty();
    }

    public async seed(): Promise<void>
    {
        LogHelper.info(`[DB][SEEDERS] Appel de la migration ${SeedData.name}`);
        if (this.data && this.whereKeys) {

            this.data.forEach( (data:any) => {
                this.service.updateOrCreate( data, this.whereKeys );
            });

            //await this.service.updateOrCreate(this.data, this.whereKey);
        }
    }

    public async unSeed() {
        //clear fake
        //clear document ?
    }

}