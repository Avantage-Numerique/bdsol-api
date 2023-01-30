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

    /**
     * Semi abstract class to simplify the process of adding data into its collection (service).
     * @param service {Service} The target service that this seeder need to add data
     * @param data? {any} the data to add into this collection
     * @param whereKey? {any} what are the field that need to be check to update or Create the data
     */
    constructor(service:Service, data?:any, whereKey?:any) {
        super();
        this.service = service;
        this.data = data;
        this.whereKeys = whereKey;
    }

    /**
     * Define the condition to check to apply the seeder. The class Seeder check if connection is setup by default.
     * @return Promise<boolean>
     */
    public async seederConditions(): Promise<boolean>
    {
        return config.isDevelopment && this.collectionEmpty();
    }

    /**
     * Seed the data one by one for now.
     * @return Promise<void>
     */
    public async seed(): Promise<void>
    {
        LogHelper.info(`[DB][SEEDERS] Seeder name : ${SeedData.name}`);
        if (this.data && this.whereKeys) {
            this.data.forEach( (data:any) => {
                this.service.updateOrCreate( data, this.whereKeys );
            });
        }
    }

    public async unSeed() {
        //clear fake
        //clear document ?
    }
}