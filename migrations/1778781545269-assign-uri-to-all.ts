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

//Find each entity that have reserved a uri and if they don't have uri, assign it to them.
async function assignReservedUris(reservedUriList: ReservedUriType[]): Promise<void> {
    const modelInstances = EntityModelFactory.getAllModels();
    //for each entity that want to reserve a uri
    for (const reserved of reservedUriList) {
        //Check if entityType exist, targetObjectId or targetSlug
        if (!reserved.entityType) {
            LogHelper.warn("[Migration][Assign Reserved URI]", "Skipping reserved URI without entityType", reserved);
            continue;
        }

        if (!reserved.targetObjectId && !reserved.targetSlug) {
            LogHelper.warn("[Migration][Assign Reserved URI]", "Skipping reserved URI without target", reserved);
            continue;
        }

        const modelEntry = modelInstances.find((elem) => elem?.type === reserved.entityType);

        //If model instance found
        if (!modelEntry) {
            LogHelper.warn("[Migration][Assign Reserved URI]", "Model not found for", reserved.entityType);
            continue;
        }

        //Build query based on id or slug
        const query: any = {};
        if (reserved.targetObjectId) {
            query._id = reserved.targetObjectId;
        } else if (reserved.targetSlug) {
            query.slug = reserved.targetSlug;
        }

        const entity = await modelEntry.instance.mongooseModel.findOne(query);

        //If entity not found
        if (!entity) {
            LogHelper.error("[Migration][Assign Reserved URI]", "Entity not found", reserved);
            continue;
        }

        const uri = buildUri(reserved.seq);
        //If entity already has uri skip
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

        //Check if uri that we want to assign already exist
        if (existingUriEntity) {
            LogHelper.error("[Migration][Assign Reserved URI]", "URI already exists on another entity:", uri);
            continue;
        }
        //Assign reserved uri to entity
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

//Assign uri in sequence to every entity of the database (that can have a uri) in order of createdAt ASC
async function assignSequentialUris(reservedUriList: ReservedUriType[]): Promise<void> {
    //Get the next number in the sequence for uri (if it fails cancel assignation)
    const session = await AutoIncrement.getInstance().connection.startSession();
    let globalUriDoc;
    try {
        session.startTransaction();
        globalUriDoc = await AutoIncrement.getNextURIGlobalNumber(session);
        await session.commitTransaction();
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
    //Next number to assign in the sequence
    let currentSeq = Number(globalUriDoc.split("/").pop());

    //Create a set of reserved number to skip
    const reservedSeqSet = new Set(reservedUriList.map((elem) => elem.seq));

    //For each model get entities
    const modelInstances = EntityModelFactory.getAllModels();
    const allEntities: any[] = [];
    for (const modelEntry of modelInstances) {
        if (!modelEntry) {
            LogHelper.error("[Migration][Assign Squential URI]", "one model instance is undefined in", modelInstances);
            continue;
        }
        //If model doesn't support "uri" skip to next model
        if (!modelEntry.instance.schema.path("uri")) continue;

        //Find every entity that has no uri
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
        //Push entities lean into array
        allEntities.push(...mappedEntities);

        LogHelper.log(`[Migration][Assign URI] type [${modelEntry.type}] loaded ${mappedEntities.length} entities`);
    }

    //Order array into ASC createdAt
    allEntities.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    LogHelper.log("[Migration][Assign URI]", "Total entities to assign URI:", allEntities.length);
    LogHelper.log("[Migration][Assign URI]", "Starting to assign URI");

    //For all entities in order, assign a uri
    for (const entity of allEntities) {
        //If reserved go next
        while (reservedSeqSet.has(currentSeq)) {
            currentSeq++;
        }
        //Assign uri
        const uri = buildUri(currentSeq);
        await entity.model.collection.updateOne(
            { _id: entity._id },
            {
                $set: {
                    uri,
                },
            }
        );
        LogHelper.log("Assigned sequential URI:", uri, "to entity ", entity._id.toString(), entity.entityType);
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
