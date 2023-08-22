import mongoose, {Schema} from "mongoose";
import AbstractModel from "@core/Model";
import type {DbProvider} from "@database/DatabaseDomain";
import {PlaceSchema} from "@src/Places/Schemas/PlaceSchema";
import PlacesService from "@src/Places/Services/PlacesService";

class Place extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Place;

    /** @public @static Model singleton instance constructor */
    public static getInstance(): Place {
        if (Place._instance === undefined) {
            Place._instance = new Place();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Place._instance.registerEvents();

            //Setting virtuals
            //Place._instance.schema.virtual("Place").get( function () { return Place._instance.modelName });

            Place._instance.initSchema();

            //Index
            //Place._instance.schema.index({ "Place.Place":1});
        }
        return Place._instance;
    }

    /** @public Model lastName */
    modelName: string = 'Place';

    /** @public Collection Name in database*/
    collectionName: string = 'Places';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: PlacesService;
    mongooseModel: mongoose.Model<any>;

    /** @public Database schema */
    schema: Schema =
        new Schema<PlaceSchema>({},
            {
                toJSON: {virtuals: true},
                timestamps: true,
            });

    /** @abstract Used to return attributes and rules for each field of this entity. */
    public fieldInfo: any = [];

    /** @abstract Set of rules that are verified for every field of this entity. */
    public ruleSet: any = [];


    public registerIndexes(): void {
        return;
    };

    public dropIndexes(): void {
        return;
    };

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
    public registerEvents(): void {

    }
}

export default Place;