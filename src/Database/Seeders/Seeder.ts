import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {Service} from "@database/DatabaseDomain";
import {SeederContract} from "../Contracts/SeederContract";

export abstract class Seeder implements SeederContract {

    abstract service: Service;
    abstract name: string;

    /**
     * Wall method to define if this can be done or not.
     */
    public async conditions(): Promise<boolean> {
        return await this.isModelConnectionActive() &&
            await this.seederConditions();
    }

    /**
     * Abstract to setup conditions in heir classes.
     */
    abstract seederConditions(): Promise<boolean>;


    /**
     * Execute the seeding process of this seeder.
     */
    public async up(): Promise<void> {
        if (await this.conditions()) {
            await this.seed();
        } else {
            LogHelper.debug(`Seeder condition didn't passed ${this.name}`);
        }
    }

    /**
     * Concrete seeding method define in heir classe execute in up method if the conditions passes.
     */
    abstract seed(): Promise<void>;


    /**
     * Execute on the reverse seed : unseed if conditions passes.
     */
    public async down(): Promise<void> {
        if (await this.conditions()) {
            await this.unSeed();
        }
    }

    /**
     * Concrete unseeding method define in heir classe execute in up method if the conditions passes.
     */
    abstract unSeed(): Promise<void>;


    /**
     * Event not called yet, to be execute on seed up
     * @param error
     * @param result
     */
    public onUp(error: any, result: any) {
        LogHelper.error(error, result);
    }

    /**
     * Event not called yet, to be executed on seed down
     * @param error
     * @param result
     */
    public onDown(error: any, result: any) {
        LogHelper.error(error, result);
    }


    //  Getter

    /**
     * Getter like to count the target collection.
     */
    public async countCollection(): Promise<number> {
        return await this.service.appModel.connection.collection(this.service.appModel.collectionName).countDocuments();
    }


    // Conditions

    /**
     * Check if the service is set and if the connection is set on the service's model
     */
    public async isModelConnectionActive(): Promise<boolean> {
        return this.service && this.service.appModel.connection !== null;
    }

    /**
     * Check if the collection is empty from countCollection method.
     */
    public async collectionEmpty(): Promise<boolean> {
        return await this.countCollection() <= 0;
    }

    /**
     * Check if the collection is not empty, from the countCollection method.
     */
    public async collectionNotEmpty(): Promise<boolean> {
        return await this.countCollection() > 0;
    }
}