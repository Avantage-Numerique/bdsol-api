import { MongoDBDriver } from "@src/Database/Drivers/MongoDriver";
import ReservedUri, { ReservedUriType } from "@src/AutoIncrement/ReservedURI";
import EntityModelFactory from "@src/Abstract/EntityModelFactory";
import config from "@src/config";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import { DBDriver } from "@src/Database/DatabaseDomain";
import { getDbDriver } from "@src/Database/Migrations/MigrationDbConnexion";
import AutoIncrement from "@src/AutoIncrement/AutoIncrement";

const BASE_URI = "http://avnu.ca/entity/";
function buildUri(seq: number): string {
    return BASE_URI + seq;
}

async function assignReservedUris(reservedUriList: ReservedUriType[]): Promise<void> {
    const modelInstances = EntityModelFactory.getAllModels();
    for (const reserved of reservedUriList) {
        if (!reserved.entityType) {
            LogHelper.warn("[Migration][Assign Reserved URI]", "Skipping reserved URI without entityType", reserved);
            continue;
        }

        if (!reserved.targetObjectId && !reserved.targetSlug) {
            LogHelper.warn("[Migration][Assign Reserved URI]", "Skipping reserved URI without target", reserved);
            continue;
        }

        const modelEntry = modelInstances.find((elem) => elem?.type === reserved.entityType);

        if (!modelEntry) {
            LogHelper.warn("[Migration][Assign Reserved URI]", "Model not found for", reserved.entityType);
            continue;
        }

        const query: any = {};

        if (reserved.targetObjectId) {
            query._id = reserved.targetObjectId;
        } else if (reserved.targetSlug) {
            query.slug = reserved.targetSlug;
        }

        const entity = await modelEntry.instance.mongooseModel.findOne(query);

        if (!entity) {
            LogHelper.error("[Migration][Assign Reserved URI]", "Entity not found", reserved);
            continue;
        }

        const uri = buildUri(reserved.seq);

        if (entity.uri && entity.uri !== "") {
            LogHelper.error(
                "[Migration][Assign Reserved URI]",
                "Entity already has URI, skipping:",
                entity._id.toString(),
                entity.uri
            );
            continue;
        }

        const existingUriEntity = await modelEntry.instance.mongooseModel.findOne({
            uri,
        });

        if (existingUriEntity) {
            LogHelper.error("[Migration][Assign Reserved URI]", "URI already exists on another entity:", uri);
            continue;
        }
        await modelEntry.instance.mongooseModel.collection.updateOne(
            { _id: entity._id },
            {
                $set: {
                    uri,
                },
            }
        );
        LogHelper.info("[Migration][Assign Reserved URI]", "Assigned reserved URI:", uri, "to", entity._id.toString());
    }
}

async function assignSequentialUris(reservedUriList: ReservedUriType[]): Promise<void> {
    const modelInstances = EntityModelFactory.getAllModels();
    const allEntities: any[] = [];

    for (const modelEntry of modelInstances) {
        if (!modelEntry) {
            LogHelper.error("[Migration][Assign Squential URI]", "one model instance is undefined in", modelInstances);
            continue;
        }
        if (modelEntry.instance.modelName == "Media") continue;
        const entities = await modelEntry.instance.mongooseModel
            .find({
                $or: [{ uri: { $exists: false } }, { uri: "" }, { uri: null }],
            })
            .select("_id createdAt uri slug")
            .lean();

        const mappedEntities = entities.map((entity: any) => ({
            ...entity,
            entityType: modelEntry.type,
            model: modelEntry.instance.mongooseModel,
        }));

        allEntities.push(...mappedEntities);

        LogHelper.log(`[Migration][Assign URI] type [${modelEntry.type}] loaded ${mappedEntities.length} entities`);
    }

    allEntities.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    LogHelper.log("[Migration][Assign URI]", "Total entities to assign URI:", allEntities.length);
    LogHelper.log("[Migration][Assign URI]", "Starting to assign URI");

    const reservedSeqSet = new Set(reservedUriList.map((elem) => elem.seq));

    const globalUriDoc = await AutoIncrement.getNextURIGlobalNumber();
    let currentSeq = globalUriDoc.split("/").pop();

    for (const entity of allEntities) {
        while (reservedSeqSet.has(currentSeq)) {
            currentSeq++;
        }
        const uri = buildUri(currentSeq);
        await entity.model.collection.updateOne(
            { _id: entity._id },
            {
                $set: {
                    uri,
                },
            }
        );
        console.log("Assigned sequential URI:", uri, "to entity ", entity._id.toString());
        currentSeq++;
    }

    await AutoIncrement.getInstance().mongooseModel.updateOne(
        { key: "global-uri" },
        {
            $set: {
                seq: currentSeq,
            },
        }
    );

    LogHelper.log("Updated global-uri sequence to:", currentSeq);
}

export async function up(): Promise<void> {
    const driver: MongoDBDriver = new MongoDBDriver(config.migrations);
    const name = "Assigning reserved URI then giving a URI to all entity that are missing it, by createdAt ASC";
    const direction = "up";
    try {
        const db: DBDriver = getDbDriver();
        await db.connect(); //check this when it's run in the env. of the API already running.
        if (db?.providers?.data) {
            await assignReservedUris(ReservedUri);
            await assignSequentialUris(ReservedUri);
        }
    } catch (e: any) {
        throw new Error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        await driver.close();
        LogHelper.info(`[DB][Migration][${name}][${direction}] Closing direct MongoClient`);
    }
}

export async function down(): Promise<void> {
    // volontairement vide
}
