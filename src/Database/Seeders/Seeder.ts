import LogHelper from "../../Monitoring/Helpers/LogHelper";
import {Service} from "../DatabaseDomain";
import {SeederContract} from "../Contracts/SeederContract";

export abstract class Seeder implements SeederContract {

    abstract service: Service;
    abstract name: string;

    public async conditions(): Promise<boolean> {
        LogHelper.debug("conditions connection active, seederCOndition", await await this.isModelConnectionActive(), await this.seederConditions());
        return await this.isModelConnectionActive() &&
            await this.seederConditions();
    }

    abstract seederConditions(): Promise<boolean>;


    public async up(): Promise<void> {
        if (await this.conditions()) {
            await this.seed();
        }
    }

    abstract seed(): Promise<void>;


    public async down(): Promise<void> {
        if (await this.conditions()) {
            await this.unSeed();
        }
    }

    abstract unSeed(): Promise<void>;



    public onUp(error: any, result: any) {
        LogHelper.error(error, result);
    }

    public onDown(error: any, result: any) {
        LogHelper.error(error, result);
    }


    // Setter

    public setService(service:Service) {
        this.service = service;
    }


    //  Getter

    public async countCollection(): Promise<number> {
        return await this.service.appModel.connection.collection(this.service.appModel.collectionName).countDocuments();
    }


    // Conditions

    public async isModelConnectionActive(): Promise<boolean> {
        return this.service && this.service.appModel.connection !== null;
    }

    public async collectionEmpty(): Promise<boolean> {
        return await this.countCollection() === 0;
    }

    public async collectionNotEmpty(): Promise<boolean> {
        return await this.countCollection() > 0;
    }
}