import PublicTemplate from "@src/Templates/PublicTemplate";
import config from "@src/config";
import {getTemplateBaseData} from "@src/Templates/Emails/EmailData";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";
import {MongoDBDriver} from "@database/Drivers/MongoDriver";
import {MongoClient} from "mongodb";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {UsersProvider} from "@database/Providers/UsersProvider";
import {DataProvider} from "@database/Providers/DataProvider";
import MongoDBMetricsMonitor from "@src/Monitoring/Provider/InternalMetricsProvider";

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
        let body:string = `<p>Quelques références pour avoir une image globale de l'API</p>`;

        //const serverStatus: boolean = await this._isMongoServerAccessible();
        //const dataStatus: boolean = await this._pingDatabase();
        //const usersStatus: boolean = await this._pingDatabase("bdsol-users");

        const metricsMonitor = new MongoDBMetricsMonitor();

        // Get metrics
        const metrics = await metricsMonitor.getMetrics();

        //build readable metrics.
        /**
         *     timestamp: string;
         *     uptime: number;
         *     connectionPool: ConnectionPoolMetrics;
         *     performance: PerformanceMetrics | null;
         *     database: DatabaseMetrics | null;
         *     application: ApplicationMetrics;
         *     server: ServerMetrics;
         *     replication: ReplicationMetrics | null;
         *     errors: ErrorMetrics;
         *     health: HealthMetrics;
         */

        body += `<h2>État des services</h2>`;

        const connectedLabel:string = "Connectée";
        const disconnectedLabel:string = "Déconnectée";
        const baseData = getTemplateBaseData();

        return await index.render({
            context: {
                ...baseData,//basic app and api default string and links
                ...DefaultEmailTheme,//basic theme for colors and sizes.
                title: `${title}`,
                body: `${body}`,
                metrics: [
                    {
                        label: "timestamp",
                        value: metrics.timestamp,
                        valueLabel: ``
                    },
                    {
                        label: "uptime",
                        value: metrics.uptime,
                        valueLabel: ``
                    },
                    {
                        label: "connectionPool",
                        value: this.renderObjectAsHTML(metrics.connectionPool),
                        valueLabel: ``
                    },
                    {
                        label: "performance",
                        value: this.renderObjectAsHTML(metrics.performance),
                        valueLabel: ``
                    },
                    {
                        label: "database",
                        value: this.renderObjectAsHTML(metrics.database),
                        valueLabel: ``
                    },
                    {
                        label: "application",
                        value: this.renderObjectAsHTML(metrics.application),
                        valueLabel: ``
                    },
                    {
                        label: "server",
                        value: this.renderObjectAsHTML(metrics.server),
                        valueLabel: ``
                    },
                    {
                        label: "replication",
                        value: this.renderObjectAsHTML(metrics.replication),
                        valueLabel: ``
                    },
                    {
                        label: "errors",
                        value: this.renderObjectAsHTML(metrics.errors),
                        valueLabel: ``
                    },
                    {
                        label: "health",
                        value: this.renderObjectAsHTML(metrics.health),
                        valueLabel: ``
                    },
                ],
                statuses: [
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

    // Generic function to render any object as HTML rows
    renderObjectAsHTML(obj: any, options?: {
        containerTag?: string;
        rowTag?: string;
        keyClass?: string;
        valueClass?: string;
        excludeKeys?: Array<string>;
    }): string {
        const {
            containerTag = 'div',
            rowTag = 'div',
            keyClass = 'key',
            valueClass = 'value',
            excludeKeys = []
        } = options || {};

        const rows: string[] = [];
        if (obj) {
            // Get all enumerable properties of the object
            for (const [key, value] of Object.entries(obj)) {

                let currentKeyClass = keyClass;
                // Skip excluded keys
                if (excludeKeys.includes(key)) {
                    continue;
                }

                // Format the value for display
                let displayValue: string;
                if (value === null) {
                    displayValue = 'null';
                } else if (value === undefined) {
                    displayValue = 'undefined';
                } else if (typeof value === 'object') {
                    displayValue = this.renderObjectAsHTML(value);
                    currentKeyClass = "text-bold";
                } else if (typeof value === 'function') {
                    displayValue = '[Function]';
                } else {
                    displayValue = String(value);
                }

                // Create HTML row
                const row = `
      <${rowTag} class="object-row">
        <span class="${currentKeyClass}">${key}:</span>
        <span class="${valueClass}">${displayValue}</span>
      </${rowTag}>
    `;
                rows.push(row);
            }
        }
        return `<${containerTag} class="object-container">${rows.join('')}</${containerTag}>`;
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
        const client:MongoClient = driver.client;
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