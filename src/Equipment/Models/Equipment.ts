import mongoose, {Schema} from "mongoose";
import AbstractModel from "@core/Model";
import type {DbProvider} from "@database/DatabaseDomain";
import {EquipmentSchema} from "@src/Equipment/Schemas/EquipmentSchema";
import EquipmentService from "@src/Equipment/Services/EquipmentService";
import {Meta} from "@src/Moderation/Schemas/MetaSchema";
import {populateUser} from "@src/Users/Middlewares/populateUser";
import {middlewarePopulateProperty, taxonomyPopulate} from "@src/Taxonomy/Middlewares/TaxonomiesPopulate";
import {SocialHandle} from "@src/Database/Schemas/SocialHandleSchema";

class Equipment extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Equipment;

    /** @public @static Model singleton instance constructor */
    public static getInstance(doIndexes=true): Equipment {
        if (Equipment._instance === undefined) {
            Equipment._instance = new Equipment();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Equipment._instance.registerEvents();

            //Setting virtuals
            Equipment._instance.schema.virtual("type").get( function () { return Equipment._instance.modelName });
            Equipment._instance.schema.virtual("name").get( function () { return this.brand + ' ' + this.modelName + ' ' + this.label });
            
            //Index
            if (doIndexes) Equipment._instance.registerIndexes();
            Equipment._instance.initSchema();

        }
        return Equipment._instance;
    }

    public registerIndexes(): void {
        //Indexes
        Equipment._instance.schema.index(
            { brand:"text", model:"text", label:"text", slug:"text" },
            {
                default_language: "french",
                //Note: if changed, make sure database really changed it by usings compass or mongosh (upon restart doesn't seem like it)
                weights:{
                    brand:5,
                    model:5,
                    label:3
                }
            });
        return;
    }

    public dropIndexes(): void {
        return;
    }

    /** @public Model lastName */
    modelName: string = 'Equipment';

    /** @public Collection Name in database*/
    collectionName: string = 'equipment';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: EquipmentService;
    mongooseModel: mongoose.Model<any>;

    /** @public Database schema */
    schema: Schema =
        new Schema<EquipmentSchema>({
            //name (virtual)
            equipmentType: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "Taxonomy"
            },
            label: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            brand: {
                type: String
            },
            modelName: {
                type: String
            },
            slug: {
                type: String,
                slug: ["brand", "modelName", "label"],
                slugPaddingSize: 3,
                index: true,
                unique: true
            },
            mainImage: {
                type: mongoose.Types.ObjectId,
                ref : "Media"
            },
            url: {
                type: [SocialHandle.schema]
            },
            meta: {
                type: Meta.schema
            }
        },
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
        return ["name","brand","model","label", "slug"];
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
            equipmentType: document.equipmentType ?? '',
            name: document.name ?? '',
            label: document.label ?? '',
            description: document.description ?? '',
            brand: document.brand ?? '',
            modelName: document.modelName ?? '',
            slug: document.slug ?? '',
            mainImage: document.mainImage ?? '',
            url: document.url ?? [],
            meta: document.meta ?? {},
            createdAt: document.createAt ?? '',
            updatedAt: document.updatedAt ?? '',
            type: document.type ?? '',
        }
    }

    public async documentation(): Promise<any> {
        return "";
    }


    /**
     * Register mongoose events, for now pre-save, pre-findOneAndUpdate
     */
    public registerEvents(): void {
        this.schema.pre('find', function() {
            taxonomyPopulate(this, 'equipmentType');
            middlewarePopulateProperty(this, "mainImage");
            populateUser(this, "meta.requestedBy");
            populateUser(this, "meta.lastModifiedBy");
        });
        this.schema.pre('findOne', function() {
            taxonomyPopulate(this, 'equipmentType');
            middlewarePopulateProperty(this, 'mainImage');
            populateUser(this, "meta.requestedBy");
            populateUser(this, "meta.lastModifiedBy");
        });
    }
}

export default Equipment;