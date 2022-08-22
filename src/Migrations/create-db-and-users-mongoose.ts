import LogHelper from "../Monitoring/Helpers/LogHelper";
import {fakeUser} from "./FakeEntity/fakeUser";
import config from "../config";
import {DbProvider} from "../Database/DatabaseDomain";
import type {MigrationContract} from "../Database/DatabaseDomain";
import {User} from "../Users/Models/User";


export default class CreateDbAndEntityMongoose implements MigrationContract {

    public provider:DbProvider;

    constructor(provider:DbProvider)
    {
        //LogHelper.log(`CreateDbAndUsersMongoose ${service} création`);
        this.provider = provider;
    }

    public async userConditions():Promise<boolean>
    {
        if (this.provider !== null)
        {
            const userModel:User = User.getInstance();
            const userCount:number = await this.provider.connection.collection(userModel.collectionName).countDocuments();
            LogHelper.info(`Conditions for Migration ${CreateDbAndEntityMongoose.name} checks`, "usercount", userCount);

            return config.environnement === 'development' &&
                userCount <= 0;
        }
        return false;
    }

    public async up()
    {
        if (await this.userConditions())
        {
            LogHelper.log(`Appel de la migration ${CreateDbAndEntityMongoose.name}`);
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
        if (this.provider !== null && this.provider.service !== null && this.provider.service.model !== null){
            LogHelper.log("Ajout de users à la BD");
            await this.provider.service.insert(fakeUser);
        }
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