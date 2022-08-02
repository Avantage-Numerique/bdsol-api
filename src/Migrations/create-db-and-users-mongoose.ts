import LogHelper from "../Monitoring/Helpers/LogHelper";
import {fakeUser} from "../Users/fakeUser";
import config from "../config";
import {DbProvider, Service} from "../Database/DatabaseDomain";
import type {MigrationContract} from "../Database/DatabaseDomain";
import {User} from "../Users/Models/User";

export default class CreateDbAndUsersMongoose implements MigrationContract {

    public usersService:Service|null;
    public provider:DbProvider|null;

    constructor(provider:DbProvider|null = null)
    {
        //LogHelper.log(`CreateDbAndUsersMongoose ${service} création`);
        this.provider = provider;
    }

    public async conditions():Promise<boolean> {
        if (this.provider !== null)
        {
            const userModel:User = User.getInstance();
            const userCount:number = await this.provider.connection.collection(userModel.collectionName).count();

            LogHelper.info(`[BD] [DEV] Conditions for Migration ${CreateDbAndUsersMongoose.name} checks`, "usercount", userCount);
            return config.environnement === 'development' &&
                userCount <= 0;
        }
        return false;
    }

    public async up()
    {
        if (await this.conditions()) {
            LogHelper.info(`[BD] [DEV] Appel de la migration ${CreateDbAndUsersMongoose.name}`);
            await this.fake();
        }
    }

    public async down()
    {
        //clear fake
        //clear document ?
    }


    public async fake()
    {
        if (this.provider !== null)
        {
            if (this.provider.service !== null && this.provider.service.model !== null) {
                LogHelper.log(`Aucun utilisateurs de créer, on ajoute deux utilisateurs test pour l'environnement ${config.environnement}`);

                await this.provider.service.insert(fakeUser);
                return true;
            }
        }
        LogHelper.log(`No need to execute Migration ${CreateDbAndUsersMongoose.name}`);
        return false;
    }



    public onUp(error:any, result:any)
    {
        LogHelper.error(error, result);
    }

    public onDown(error:any, result:any)
    {
        LogHelper.error(error, result);
    }
}