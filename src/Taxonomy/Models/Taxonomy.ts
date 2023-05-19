import mongoose, {Error} from "mongoose";
import {Schema} from "mongoose"
import { TaxonomySchema } from "../Schemas/TaxonomySchema";
import { TaxonomiesCategoriesEnum } from "../TaxonomiesCategoriesEnum";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model"
import TaxonomyService from "../Services/TaxonomyService";
import { Status } from "../../Moderation/Schemas/StatusSchema";
import * as fs from 'fs';
import {taxonomyPopulate} from "../Middlewares/TaxonomiesPopulate";


class Taxonomy extends AbstractModel {

    /** @protected @static Singleton instance of model Taxonomy */
    protected static _instance:Taxonomy;

    /** @public @static Model singleton instance constructor */
    public static getInstance():Taxonomy {
        if (Taxonomy._instance === undefined) {
            Taxonomy._instance = new Taxonomy();

            Taxonomy._instance.schema.virtual("type").get( function () { return Taxonomy._instance.modelName });

            Taxonomy._instance.registerEvents();

            Taxonomy._instance.initSchema();

            //Taxonomy._instance.schema.path('domains.domain').validate(taxonomyDomainNoSelfReference);

            //Indexes
            Taxonomy._instance.schema.index({ category:1 });
            Taxonomy._instance.schema.index({ name:1, category:1 }, {unique: true});
            Taxonomy._instance.schema.index({ name:"text", description:"text", category:"text", slug:"text" }, { default_language: "french" });
        }
        return Taxonomy._instance;
    }

    /** @public Model name */
    modelName:string = 'Taxonomy';

    /** @public Collection name in database */
    collectionName:string = 'taxonomies';

    /** @public Connection mongoose */
    connection:mongoose.Connection;
    provider:DbProvider;
    service:TaxonomyService;
    mongooseModel:mongoose.Model<any>;


    /** @public Database schema */
    schema:Schema =
        new Schema<TaxonomySchema>({
            category: {
                type: String,
                required: [true, 'Required category (occupation, ...)'],
                enum: TaxonomiesCategoriesEnum,
                lowercase: true,
                trim: true
            },
            name: {
                type: String,
                required: [true, 'Name required'],
                minlength:[2, 'MinLength 2'],
                //alias: 'nom',
            },
            slug: {
                type: String,
                slug: "name",
                slugPaddingSize: 2,
                index: true,
                unique: true
            },
            description: {
                type: String,
                //alias:'desc'
            },
            domains: {
                type: [{
                    domain: {
                        type: mongoose.Types.ObjectId,
                        ref: "Taxonomy",
                        validate: function (value: mongoose.Types.ObjectId | null) {
                            const currentDocument = this as any; // Cast 'this' to any to access the document
                            if (value && value.equals(currentDocument._id)) {
                                throw new Error("Can't assign self as a domain.");
                            }
                            return true
                        }
                    },
                    status: Status.schema
                }]
            },
            //source: {
                //type: String
            //},
            status: {
                type: Status.schema,
                //required: true,
            }
        },
            {
                toJSON: { virtuals: true },
                timestamps: true,
                strict: true,
                //collation: { locale: 'fr_CA' },
        });


    /** @public Used to return attributes and rules for each field of this entity. */
    fieldInfo =
    {
        "state": "",
        "field": [
            {
                "name": "category",
                "label": "Catégorie",
                "type": "String",
                "rules": []
            },
            {
                "name": "name",
                "label": "Nom",
                "type": "String",
                "rules": []
            },
            {
                "name": "slug",
                "label": "Slug",
                "type": "String",
                "rules": []
            },
            {
                "name": "description",
                "label": "Description",
                "type": "String",
                "rules": []
            },
            {
                "name": "source",
                "label": "Sous-Taxonomie lié",
                "type": "String",
                "rules": []
            }
        ]
    };

    /** @public Rule set for every field of this entity for each route */
    ruleSet:any = {
        "default":{
            "id":["idValid"],
            "name":["isString"],
            "description":["isString"],
            "subTaxonomy":["isString"]
        },
        "create":{
            "name":["isDefined", "minLength:2"]
        },
        "update":{
            "id":["isDefined"]
        },
        "search":{
        },
        "list":{
        },
        "delete":{
            "id":["isDefined"]
        }
    }

    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields():object {
        return ["category", "name", "slug", "description", "source"];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any) {
        return {
            _id: document._id ?? '',
            category: document.category ?? '',
            name: document.name ?? '',
            slug: document.slug ?? '',
            description: document.description ?? '',
            source: document.source ?? '',
            status: document.status ?? '',
            type: document.type ?? '',
            domains: document.domains ?? [],
            createdAt : document.createdAt ?? '',
            updatedAt : document.updatedAt ?? '',
        }
    }


    public async documentation():Promise<any>{
        return fs.readFileSync('/api/doc/Taxonomy.md', 'utf-8');
    }


    public registerEvents():void {
        this.schema.pre('find', function() {
            taxonomyPopulate(this, 'domains.domain');
        });

        this.schema.pre('findOne', function() {
            taxonomyPopulate(this, 'domains.domain');
        });
    }
}
export default Taxonomy;