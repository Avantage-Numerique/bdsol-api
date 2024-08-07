import PublicTemplate from "@src/Templates/PublicTemplate";
import config from "@src/config";
import {getTemplateBaseData} from "@src/Templates/Emails/EmailData";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";
import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import {MongoClient} from "mongodb";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {UsersProvider} from "@database/Providers/UsersProvider";
import {DataProvider} from "@database/Providers/DataProvider";

class MonitoringController {

    /** @private @static Singleton instance */
    private static _instance: MonitoringController;

    public name: string = "MonitoringController";

    public mongoDriver: MongoDBDriver;
    public mongoClient: MongoClient;

    constructor() {

    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {MonitoringController} Controller singleton constructor
     */
    public static getInstance(): MonitoringController {
        if (MonitoringController._instance === undefined) {
            MonitoringController._instance = new MonitoringController();
        }
        return MonitoringController._instance;
    }

    public async statusesLayout(): Promise<string> {

        const index = new PublicTemplate("status");//tempalte have already a default in the EmailContent.Prepare.
        const title:string = `Status de ${config.appName}`;
        let body:string = `<h2>État des services</h2>`;

        //const serverStatus: boolean = await this._isMongoServerAccessible();
        //const dataStatus: boolean = await this._pingDatabase();
        //const usersStatus: boolean = await this._pingDatabase("bdsol-users");

        const connectedLabel:string = "Connectée";
        const disconnectedLabel:string = "Déconnectée";
        const baseData = getTemplateBaseData();

        return await index.render({
            context: {
                ...baseData,//basic app and api default string and links
                ...DefaultEmailTheme,//basic theme for colors and sizes.
                title: `${title}`,
                body: `${body}`,
                statuses: [
                    /*{
                        label: "Serveur base de donnée",
                        value: serverStatus,
                        valueLabel: serverStatus ? connectedLabel : disconnectedLabel
                    },
                    {
                        label: "Données accessible ?",
                        value: dataStatus,
                        valueLabel: dataStatus ? connectedLabel : disconnectedLabel
                    },
                    {
                        label: "Authentification",
                        value: usersStatus,
                        valueLabel: usersStatus ? connectedLabel : disconnectedLabel
                    },*/
                    {
                        label: "Données",
                        value: DataProvider.instance()?.connection.readyState,
                        valueLabel: `${(DataProvider.instance()?.connection.readyState === 1 ? connectedLabel : disconnectedLabel)} (${DataProvider.instance()?.connection.readyState})`
                    },
                    {
                        label: "Authentification",
                        value: UsersProvider.instance()?.connection.readyState,
                        valueLabel: `${(UsersProvider.instance()?.connection.readyState === 1 ? connectedLabel : disconnectedLabel)} (${DataProvider.instance()?.connection.readyState})`
                    },
                ],
                meta: {
                    title: `${title}`,
                    description: `${body}`,
                    author: `${config.appName}`
                }
            }
        });
    }

    private async _isMongoServerAccessible():Promise<boolean> {
        this.mongoDriver = new MongoDBDriver(config.db);
        this.mongoClient = this.mongoDriver.client;

        try {
            const connectionReturn:any = await this.mongoClient.connect();
            LogHelper.info(`Pinging mongodb serveur`, connectionReturn);
            return true;
        } catch (e) {
            LogHelper.error(`Pinging mongodb serveur`, e);
            return false;
        } finally {
            // Ensures that the client will close when you finish/error
            await this.mongoClient.close();
        }

        return false;
    }

    private async _pingDatabase(dbName:string="bdsol-data"):Promise<boolean> {
        const driver:MongoDBDriver = new MongoDBDriver(config.db);
        let client:MongoClient = driver.client;
        let ping:any;
        try {
            await client.connect();
            ping = await client.db(dbName).command({ ping: 1 });
            LogHelper.info(`Pinging mongodb serveur ${dbName}`, ping);
            return ping?.ok === 1;
        } catch (e) {
            return false;
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
}

export default MonitoringController;