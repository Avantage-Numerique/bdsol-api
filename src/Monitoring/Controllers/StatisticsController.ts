import PublicTemplate from "@src/Templates/PublicTemplate";
import config from "@src/config";
import { getTemplateBaseData } from "@src/Templates/Emails/EmailData";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";
import { MongoDBDriver } from "@database/Drivers/MongoDriver";
import { Db, Document, Filter } from "mongodb";
import { TaxonomiesCategoriesEnum } from "@src/Taxonomy/TaxonomiesCategoriesEnum";

interface TaxonomyStat {
    name: TaxonomiesCategoriesEnum;
    total: number;
}

interface StatRow {
    name: string;
    total: number;
    label?: string;
}

class StatisticsController {
    /** @private @static Singleton instance */
    private static _instance: StatisticsController;

    public name: string = "MonitoringController";

    private constructor() {}

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {StatisticsController} Controller singleton constructor
     */
    public static getInstance(): StatisticsController {
        if (StatisticsController._instance === undefined) {
            StatisticsController._instance = new StatisticsController();
        }
        return StatisticsController._instance;
    }

    /**
     * Get a public template, pass variable to statistics.njk, and render it.
     * @param startDateStr
     * @param endDateStr
     * @return {Promise<string>}
     */
    public async renderIndex(startDateStr = "", endDateStr = ""): Promise<string> {
        const index = new PublicTemplate("statistics"); //template
        const baseData = getTemplateBaseData();

        const title: string = `Statistiques`;
        const body: string = `<p>Statistiques d'avnu générique, d'utilisations et sur les données.</p>`;

        return await index.render({
            context: {
                ...baseData, //basic app and api default string and links
                ...DefaultEmailTheme, //basic theme for colors and sizes.
                title: `${title}`,
                body: `${body}`,
                filters: { startDate: startDateStr, endDate: endDateStr },
                stats: await this.getStatistics(startDateStr, endDateStr),
                meta: {
                    title: `${title}`,
                    description: `${body}`,
                    author: `${config.appName}`,
                },
            },
        });
    }

    /**
     * Manage the db connection + all the query that is needed for stats.
     * @param startDateStr
     * @param endDateStr
     * @return {Promise<{
     *             general?: Array<StatRow>;
     *             taxonomies?: Array<StatRow>;
     *             users?: Array<StatRow>;
     *             userHistories?: Array<StatRow>;
     *         }>} the stats object
     */
    public async getStatistics(
        startDateStr = "",
        endDateStr = ""
    ): Promise<{
        general?: Array<StatRow>;
        taxonomies?: Array<StatRow>;
        users?: Array<StatRow>;
        userHistories?: Array<StatRow>;
    }> {
        const createdAt: { $gte?: Date; $lte?: Date } = {};
        if (startDateStr) createdAt.$gte = new Date(startDateStr);
        if (endDateStr) createdAt.$lte = new Date(endDateStr);
        const hasFilters = Object.keys(createdAt).length > 0;
        const filters = hasFilters ? { createdAt } : {};

        const driver = new MongoDBDriver(config.db);
        const resultsStats: {
            general?: Array<StatRow>;
            taxonomies?: Array<StatRow>;
            users?: Array<StatRow>;
            userHistories?: Array<StatRow>;
        } = {};
        try {
            const client = await driver.connect();
            const dbData: Db = client.db("bdsol-data");

            resultsStats.general = await this.getEntitiesStatistics(dbData, hasFilters, filters);
            resultsStats.taxonomies = await this.getTaxonomiesStatistics(dbData, hasFilters, filters);
            resultsStats.userHistories = await this.getTotalUsersHistories(dbData, hasFilters, filters);

            const dbUser: Db = client.db("bdsol-users");
            resultsStats.users = await this.getTotalUsers(dbUser, hasFilters, filters);

            return resultsStats;
        } finally {
            await driver.close();
        }
    }

    /**
     * Gather traxonomies statistic by aggregating their $sum and grouping them out.
     * @param db {Db} the connected db object.
     * @param hasFilters {boolean}
     * @param filters {Filter<Document>}
     */
    public async getTaxonomiesStatistics(
        db: Db,
        hasFilters: boolean,
        filters: Filter<Document> = {}
    ): Promise<TaxonomyStat[]> {
        const categories = Object.values(TaxonomiesCategoriesEnum) as TaxonomiesCategoriesEnum[];

        const rows = await db
            .collection("taxonomies")
            .aggregate<{ _id: TaxonomiesCategoriesEnum; total: number }>([
                ...(hasFilters ? [{ $match: filters }] : []), // narrow first, fewer docs to group
                { $match: { category: { $in: categories } } }, // guard against orphan/legacy values not in the enum
                { $group: { _id: "$category", total: { $sum: 1 } } },
            ])
            .toArray();

        const totals = new Map(rows.map((r) => [r._id, r.total]));

        return categories.map((name) => ({
            name,
            total: totals.get(name) ?? 0,
        }));
    }

    public async getEntitiesStatistics(db: Db, hasFilters: boolean, filters: any): Promise<Array<StatRow>> {
        return this.getEntitiesStatisticsByCollections(
            db,
            [
                //"userhistories",//will move that to a "user based stats".
                "equipment",
                "events",
                "media",
                "organisations",
                "people",
                "places",
                "projects",
                "taxonomies",
            ],
            hasFilters,
            filters
        );
    }

    public async getTotalUsers(db: Db, hasFilters: boolean, filters: Filter<Document> = {}): Promise<Array<StatRow>> {
        return this.getEntitiesStatisticsByCollections(db, ["users"], hasFilters, filters);
    }

    public async getTotalUsersHistories(
        db: Db,
        hasFilters: boolean,
        filters: Filter<Document> = {}
    ): Promise<Array<StatRow>> {
        return this.getEntitiesStatisticsByCollections(db, ["userhistories"], hasFilters, filters);
    }

    /**
     * Dry method to loop through an array of Collections and get the total of each collections setup in an
     * @param db
     * @param collections
     * @param hasFilters
     * @param filters
     */
    public async getEntitiesStatisticsByCollections(
        db: Db,
        collections: Array<string>,
        hasFilters: boolean,
        filters: any
    ): Promise<Array<StatRow>> {
        return await Promise.all(
            collections.map(async (name) => ({
                name: name,
                label: "",
                total: hasFilters
                    ? await db.collection(name).countDocuments(filters)
                    : await db.collection(name).estimatedDocumentCount(),
            }))
        );
    }
}

export default StatisticsController;
