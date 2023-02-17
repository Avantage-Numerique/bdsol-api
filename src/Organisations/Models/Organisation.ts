import mongoose from "mongoose";
import {Schema} from "mongoose";
import {OrganisationSchema} from "../Schemas/OrganisationSchema";
import {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import * as fs from 'fs';
import TaxonomyController from "../../Taxonomy/Controllers/TaxonomyController";
import OrganisationsService from "../Services/OrganisationsService";
import {middlewareTaxonomy} from "../../Taxonomy/Middlewares/TaxonomyPreSaveOnEntity";
import { Member } from "../../Database/Schemas/MemberSchema";
import { Status } from "../../Database/Schemas/StatusSchema";
import {middlewarePopulateProperty} from "../../Taxonomy/Middlewares/TaxonomiesPopulate";


class Organisation extends AbstractModel {

    /** @protected @static Singleton instance of model Organisation */
    protected static _instance: Organisation;

    /** @public @static Model singleton instance constructor */
    public static getInstance(): Organisation {
        if (Organisation._instance === undefined) {
            Organisation._instance = new Organisation();
            Organisation._instance.registerPreEvents();
            Organisation._instance.registerEvents();

            Organisation._instance.schema.virtual("type").get( function () { return Organisation._instance.modelName });

            Organisation._instance.initSchema();

            Organisation._instance.schema.index({ "offers.offer":1});
            Organisation._instance.schema.index({ "team.member":1});
            Organisation._instance.schema.index(
                { name:"text", description:"text", slug:"text"},
                { 
                    default_language: "french",
                    //Note: if changed, make sure database really changed it by usings compass or mongosh (upon restart doesn't seem like it)
                    weights:{
                        name:4,
                        description:2
                }});
        }
        return Organisation._instance;
    }

    /** @public Model name */
    modelName: string = "Organisation";

    /** @public Collection name in database */
    collectionName: string = 'organisations';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    service: OrganisationsService;
    mongooseModel: mongoose.Model<any>;
    provider: DbProvider;

    /** @public Database schema */
    schema: Schema =
        new Schema<OrganisationSchema>({
                name: {
                    type: String,
                    required: true,
                    index:true,
                    unique: true,
                    //alias: 'nom'
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
                    //alias: 'desc'
                },
                url: {
                    type: String,
                },
                contactPoint: {
                    type: String,
                },
                fondationDate: {
                    type: Date,
                },
                offers: {
                    type: [{
                        offer: {
                            type: mongoose.Types.ObjectId,
                            ref: "Taxonomy"
                        },
                        status: {
                            type: Status.schema,
                        }
                    }],
                    required:true
                },
                team: {
                    type: [Member.schema],
                    ref: "Person"
                },
                mainImage: {
                    type: mongoose.Types.ObjectId,
                    ref : "Media"
                },
                status: {
                    type: Status.schema
                }
            },
            {
                toJSON: { virtuals: true },
                timestamps: true
            });

    /** @public Used to return attributes and rules for each field of this entity. */
    fieldInfo =
        {
            "route": "",
            "field": [
                {
                    "name": "name",
                    "label": "name",
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
                    "name": "url",
                    "label": "Site internet",
                    "type": "String",
                    "rules": []
                },
                {
                    "name": "contactPoint",
                    "label": "Point de contact",
                    "type": "String",
                    "rules": []
                },
                {
                    "name": "fondationDate",
                    "label": "Date de fondation",
                    "type": "Date",
                    "rules": []
                },
                {
                    "name": "offers",
                    "label": "Offre de service",
                    "type": "ObjectId",
                    "rules": []
                }
            ]
        };

    /**
     * @public Rule set for every field of this entity for each route
     * @deprecated*/
    ruleSet: any = {
        "default": {
            "id": ["idValid"],
            "name": ["isString"],
            "description": ["isString"],
            "url": ["isString"],
            "contactPoint": ["isString"],
            "fondationDate": ["isDate"]
        },
        "create": {
            "name": ["isDefined", "minLength:2"],
        },
        "update": {
            "id": ["isDefined"]
        },
        "search": {},
        "list": {},
        "delete": {
            "id": ["isDefined"]
        }
    }

    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields(): object {
        return ["name", "description", "url", "contactPoint", "fondationDate", "offers"];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any): any {
        return {
            _id: document._id ?? '',
            name: document.name ?? '',
            description: document.description ?? '',
            url: document.url ?? '',
            contactPoint: document.contactPoint ?? '',
            fondationDate: document.fondationDate ?? '',
            offers: document.offers ?? '',
            team: document.team ?? '',
            mainImage: document.mainImage ?? '',
            slug: document.slug ?? '',
            status : document.status ?? '',
            type: document.type ?? '',
            createdAt : document.createdAt ?? '',
            updatedAt : document.updatedAt ?? '',
        }
    }

    public async documentation(): Promise<any> {
        return fs.readFileSync('/api/doc/Organisations.md', 'utf-8');
    }

    /**
     * Add listenner to pre and findOneAndUpdate mongoose events.
     * Prendre le array fournit dans data (data.occupation)
     * Pour vérif si les valeurs existe toute.  ( .count ) en filtrant sur les id et compare le nombre de résultat retourné avec le .length
     * Pour vérif si les valeurs ont des doublons :
     * (Possible que sa marche juste avec le .count, si je chercher avec plusieurs filtre id mais qu'il y a 2 fois le même id, sa retourne tu 1 ou 2.
     * Créer un Set avec les valeurs, et comparer .length du set au .length du array. Auquel cas, si doublons, length !=
     * const setNoDoublon = new Set(arrayOccupation);
     * if setNoDoublon.length != arrayOccupation.length { throw error }
     */
    public registerPreEvents() {
        if (this.schema !== undefined) {

            //Pre save, verification for occupation
            //Verify that occupations in the array exists and that there are no duplicates
            this.schema.pre('save', async function (next: any): Promise<any> {
                const idList = this.offers.map( (el:any) => {
                    return new mongoose.Types.ObjectId(el.offer);
                });
                await middlewareTaxonomy(idList, TaxonomyController, "offers.offer");
                return next();
            });

            //Pre update verification for occupation //Maybe it should be in the schema as a validator
            this.schema.pre('findOneAndUpdate', async function (next: any): Promise<any> {
                const organisation: any = this;
                const updatedDocument = organisation.getUpdate();
                if (updatedDocument["offers"] != undefined){
                    const idList = updatedDocument.offers.map( (el:any) => {
                        return el.offer;
                    });
                    await middlewareTaxonomy(idList, TaxonomyController, "offers.offer");
                }

                return next();
            });
        }
    }

    public registerEvents():void {

        this.schema.pre('find', function() {
            middlewarePopulateProperty(this, 'offers.offer', "name category status slug");
            middlewarePopulateProperty(this, 'team.member', "firstName lastName status");
            middlewarePopulateProperty(this, "mainImage");
        });
        
        this.schema.pre('findOne', function() {
            middlewarePopulateProperty(this, 'offers.offer', "name category status slug");
            middlewarePopulateProperty(this, 'team.member', "firstName lastName status");
            middlewarePopulateProperty(this, "mainImage");
        });
    }
}

export default Organisation;