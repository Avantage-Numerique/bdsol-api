import mongoose, {Schema} from "mongoose";
import {StaticContentSchema} from "../Schemas/StaticContentSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import StaticContentsService from "../Services/StaticContentsService";

class StaticContent extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: StaticContent;

    /** @public @static Model singleton instance constructor */
    public static getInstance(): StaticContent {
        if (StaticContent._instance === undefined) {
            StaticContent._instance = new StaticContent();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            StaticContent._instance.registerEvents();
            StaticContent._instance.registerPreEvents();

            //Setting virtuals
            //StaticContent._instance.schema.virtual("StaticContent").get( function () { return StaticContent._instance.modelName });

            StaticContent._instance.initSchema();

            //Index
            //StaticContent._instance.schema.index({ "StaticContent.StaticContent":1});
        }
        return StaticContent._instance;
    }

    public registerIndexes() {
        return true;
    }

    /** @public Model lastName */
    modelName: string = 'StaticContent';

    /** @public Collection Name in database*/
    collectionName: string = 'StaticContents';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: StaticContentsService;
    mongooseModel: mongoose.Model<any>;

    /** @public Database schema */
    schema: Schema =
        new Schema<StaticContentSchema>({},
            {
                toJSON: {virtuals: true},
                timestamps: true,
            });

    /** @abstract Used to return attributes and rules for each field of this entity. */
    public fieldInfo: any = [];

    /** @abstract Set of rules that are verified for every field of this entity. */
    public ruleSet: any = [];

    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields(): object {
        return [""];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @todo faire une version qu'on a un objet adapté au document et non mandatoir sur toute les propriétés inscrite.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any) {
        return {
            _id: document._id ?? '',
        }
    }

    public async documentation(): Promise<any> {
        return "";
    }


    /**
     * Register mongoose events, for now pre-save, pre-findOneAndUpdate
     */
    public registerPreEvents() {
        if (this.schema !== undefined) {

        }
    }

    public registerEvents(): void {

    }
}

export default StaticContent;