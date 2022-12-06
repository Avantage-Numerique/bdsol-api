import {SeederContract} from "../Contracts/SeederContract";
import {Service} from "../Service";
import SeedData from "./seed-data";

export default class SeedPersistantData extends SeedData implements SeederContract {

    /**
     * Class to simplify the process of adding data into its collection (service).
     * @param service {Service} The target service that this seeder need to add data
     * @param data? {any} the data to add into this collection
     * @param whereKey? {any} what are the field that need to be check to update or Create the data
     */
    constructor(service:Service, data?:any, whereKey?:any) {
        super(service, data, whereKey);
        this.name = "Seed persistant data";
    }

    /**
     * Define the condition to check to apply the seeder. The class Seeder check if connection is setup by default.
     * @return Promise<boolean>
     */
    public async seederConditions(): Promise<boolean>
    {
        return true;
    }
}