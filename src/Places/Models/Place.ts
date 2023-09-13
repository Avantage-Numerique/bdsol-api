import mongoose, {Schema} from "mongoose";
import AbstractModel from "@core/Model";
import type {DbProvider} from "@database/DatabaseDomain";
import {PlaceSchema} from "@src/Places/Schemas/PlaceSchema";
import PlacesService from "@src/Places/Services/PlacesService";
import { middlewarePopulateProperty } from "@src/Taxonomy/Middlewares/TaxonomiesPopulate";
import { Meta } from "@src/Moderation/Schemas/MetaSchema";

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
            Place._instance.schema.virtual("type").get( function () { return Place._instance.modelName });

            Place._instance.initSchema();

            //Index
            //Place._instance.schema.index({ "Place.Place":1});
        }
        return Place._instance;
    }

    public registerIndexes():void {
        //Indexes
        Place._instance.schema.index(
            { name:"text", slug:"text", city:"text", province:"text", country:"text", description:"text" },
            {
                default_language: "french",
                //Note: if changed, make sure database really changed it by usings compass or mongosh (upon restart doesn't seem like it)
                weights:{
                    name: 1,
                    city: 1,
                    province: 1,
                    country: 1,
                    slug: 1,
                    description: 1
                }
            });
    }
    public dropIndexes(): void {
        return;
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
        new Schema<PlaceSchema>({
            name: {
                type: String,
                minlength: 2,
                required: true
            },
            description: {
                type: String
            },
            slug: {
                type: String,
                slug: "name",
                slugPaddingSize: 3,
                index: true,
                unique: true
            },
            mainImage: {
                type: mongoose.Types.ObjectId,
                ref : "Media"
            },
            address: {
                type: String
            },
            city: {
                type: String
            },
            region: {
                type: String
            },
            mrc: {
                type: String
            },
            province: {
                type: String
            },
            postalCode: {
                type: String
            },
            country: {
                type: String
            },
            latitude: {
                type: String
            },
            longitude: {
                type: String
            },
            meta:{
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
        return ["name","description","address","region","mrc","province","country","postalCode"];
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
            name: document.name ?? '',
            description: document.description ?? '',
            slug: document.slug ?? '',
            mainImage: document.mainImage ?? '',
            address: document.address ?? '',
            city: document.city ?? '',
            region: document.region ?? '',
            mrc: document.mrc ?? '',
            province: document.province ?? '',
            postalCode: document.postalCode ?? '',
            country: document.country ?? '',
            latitude: document.latitude ?? '',
            longitude: document.longitude ?? '',
            meta: document.meta ?? '',
            type: document.type ?? '',
            createdAt: document.createdAt ?? '',
            updatedAt: document.updatedAt ?? ''

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
            middlewarePopulateProperty(this, "mainImage");
        });

        this.schema.pre('findOne', function() {
            middlewarePopulateProperty(this, 'mainImage');
        });
    }
}

export default Place;