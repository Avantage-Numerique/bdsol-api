import mongoose, {Schema} from "mongoose";
import AbstractModel from "@core/Model";
import type {DbProvider} from "@database/DatabaseDomain";
import {EquipmentSchema} from "@src/Equipments/Schemas/EquipmentSchema";
import EquipmentsService from "@src/Equipments/Services/EquipmentsService";

class Equipment extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Equipment;

    /** @public @static Model singleton instance constructor */
    public static getInstance(): Equipment {
        if (Equipment._instance === undefined) {
            Equipment._instance = new Equipment();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Equipment._instance.registerEvents();

            //Setting virtuals
            //Equipment._instance.schema.virtual("Equipment").get( function () { return Equipment._instance.modelName });

            Equipment._instance.initSchema();

            //Index
            //Equipment._instance.schema.index({ "Equipment.Equipment":1});
        }
        return Equipment._instance;
    }

    /** @public Model lastName */
    modelName: string = 'Equipment';

    /** @public Collection Name in database*/
    collectionName: string = 'Equipments';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: EquipmentsService;
    mongooseModel: mongoose.Model<any>;

    /** @public Database schema */
    schema: Schema =
        new Schema<EquipmentSchema>({},
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

export default Equipment;