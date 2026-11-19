import AbstractModel from "@src/Abstract/Model";
import { DbProvider } from "@src/Database/DatabaseDomain";
import mongoose, { ClientSession, Schema } from "mongoose";
import AutoIncrementService from "./AutoIncrementService";
import { AutoIncrementSchema } from "./AutoIncrementSchema";
import ReservedUri from "./ReservedURI";

class AutoIncrement extends AbstractModel {
    protected static _instance: AutoIncrement;
    private constructor() {
        super();
    }

    public static getInstance(doIndexes = true): AutoIncrement {
        if (AutoIncrement._instance === undefined) {
            AutoIncrement._instance = new AutoIncrement();
        }
        return AutoIncrement._instance;
    }

    /** @public Model name */
    modelName: string = "AutoIncrement";
    /** @public Collection lastName in database*/
    collectionName: string = "autoincrements";
    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: AutoIncrementService;
    mongooseModel: mongoose.Model<any>;

    schema: Schema = new Schema<AutoIncrementSchema>(
        {
            key: {
                type: String,
                required: true,
                unique: true,
            },
            seq: {
                type: Number,
                default: 1,
            },
        },
        {
            timestamps: true,
        }
    );

    public registerIndexes(): void {}
    public dropIndexes() {}
    ruleSet: any = {};
    fieldInfo = {
        route: "",
        field: [],
    };
    get searchSearchableFields() {
        return [];
    }
    public dataTransfertObject(document: any) {
        return {};
    }
    public async documentation(): Promise<any> {
        //return fs.readFileSync("/api/doc/AutoIncrement.md", "utf-8");
    }

    public static async getNextURIGlobalNumber(session?: ClientSession): Promise<string> {
        const reservedSeq = ReservedUri.map((elem) => elem.seq);
        let globalUriDoc;
        do {
            globalUriDoc = await AutoIncrement.getInstance().mongooseModel.findOneAndUpdate(
                { key: "global-uri" },
                { $inc: { seq: 1 } },
                {
                    upsert: true,
                    new: true,
                    session,
                }
            );
        } while (reservedSeq.includes(globalUriDoc.seq));

        return `http://avnu.ca/entity/${globalUriDoc.seq}`;
    }
}
export default AutoIncrement;
