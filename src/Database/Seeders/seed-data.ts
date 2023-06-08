import {Seeder} from "./Seeder";
import {SeederContract} from "../Contracts/SeederContract";
import {Service} from "../Service";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

/**
 * Seed data into DB
 */
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
    public async seederConditions(): Promise<boolean> {
        return true;//config.isDevelopment && this.collectionEmpty();
    }

    /**
     * Seed the data one by one for now.
     * @return Promise<void>
     */
    public async seed(): Promise<void>
    {
        if (this.data && this.whereKeys) {
            try {
                for (const data of this.data) {
                    await this.service.updateOrCreate( data, this.whereKeys );//let response:any =
                }
            }
            catch(e) {
                LogHelper.error("Error in seed method", e);
                throw e;
            }

        }
    }

    public async unSeed() {
        //clear seeded data from.
    }
}