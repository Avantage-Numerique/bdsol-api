import mongoose from "mongoose";
import {Schema} from "mongoose"
import { TaxonomySchema } from "../Schemas/TaxonomySchema";
import {TaxonomiesCategories, TaxonomiesStatus} from "../TaxonomiesEnum";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model"
import TaxonomyService from "../Services/TaxonomyService";

class Taxonomy extends AbstractModel {

    /** @protected @static Singleton instance of model Taxonomy */
    protected static _instance:Taxonomy;

    /** @public @static Model singleton instance constructor */
    public static getInstance():Taxonomy {
        if (Taxonomy._instance === undefined) {
            Taxonomy._instance = new Taxonomy();
            Taxonomy._instance.initSchema();
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
                enum: TaxonomiesCategories,
                lowercase: true,
                trim: true,
                index: true
            },
            name: {
                type: String,
                required: [true, 'Name required'],
                minlength:[2, 'MinLength 2'],
                alias: 'nom'
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
                alias:'desc'
            },
            source: {
                type: String
            },
            status: {
                type: String,
                enum: TaxonomiesStatus
            },
            addReason: {
                type: String
            }
        },
            {
                timestamps: true,
                strict: true,
                collation: { locale: 'fr_CA' }
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
            category: document.category ?? '',
            name: document.name ?? '',
            slug: document.slug ?? '',
            description: document.description ?? '',
            source: document.source ?? '',
            status: document.status ?? '',
            addReason: document.addReason ?? ''
        }
    }

    public async documentation():Promise<any>{
        return 'not implemented';
   }
}
export default Taxonomy;