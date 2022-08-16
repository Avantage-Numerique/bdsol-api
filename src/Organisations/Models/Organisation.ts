import mongoose from "mongoose";
import {Schema} from "mongoose";
import {OrganisationSchema} from "../Schemas/OrganisationSchema";
import {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import * as fs from 'fs';
<<<<<<< .mine
import LogHelper from "../../Monitoring/Helpers/LogHelper";
=======
import { TaxonomyController } from "../../Taxonomy/Controllers/TaxonomyController";
>>>>>>> .theirs

class Organisation extends AbstractModel {

    /** @protected @static Singleton instance of model Organisation */
    protected static _instance:Organisation;

    /** @public @static Model singleton instance constructor */
    public static getInstance():Organisation {
        if (Organisation._instance === undefined) {
            Organisation._instance = new Organisation();
            Organisation._instance.initSchema();
            Organisation._instance.registerPreEvents();
        }
        return Organisation._instance;
    }

    /** @public Model name */
    modelName: string = "Organisation";

    /** @public Collection name in database */
    collectionName: string = 'organisations';
    
    /** @public Connection mongoose */
    connection: mongoose.Connection;
    mongooseModel:mongoose.Model<any>;
    provider: DbProvider;

    /** @public Database schema */
    schema: Schema =
        new Schema<OrganisationSchema>({
                name: {
                    type: String,
                    required: true,
                    alias: 'nom'
                },
                slug: {
                    type: String,
                    slug: "name",
                    slugPaddingSize: 3,
                    index: true,
                    unique: true
                },
                description: {
                    type: String,
                    alias: 'desc'
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
                offer: {
                    type: [mongoose.Types.ObjectId],
                    default: undefined,
                    ref: 'taxonomies'
                }
            },
            {
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
                "name": "offer",
                "label": "Offre de service",
                "type": "ObjectId",
                "rules": []
            }
        ]
    };
    
    /**
     * @public Rule set for every field of this entity for each route
     * @deprecated*/
    ruleSet:any = {
        "default":{
            "id":["idValid"],
            "name":["isString"],
            "description":["isString"],
            "url":["isString"],
            "contactPoint":["isString"],
            "fondationDate":["isDate"]
        },
        "create":{
            "name":["isDefined", "minLength:2"],
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
        return ["name", "description","url","contactPoint", "fondationDate", "offer"];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any):any {
        LogHelper.debug('dataTransfertObject',document);
        return {
            name: document.name ?? '',
            description: document.description ?? '',
            url: document.url ?? '',
            contactPoint: document.contactPoint ?? '',
            fondationDate: document.fondationDate ?? '',
            offer: document.offer ?? ''
        }
    }

    public async documentation():Promise<any>{

        return fs.readFileSync('/api/doc/Organisations.md', 'utf-8');
   }

   public async registerPreEvents()
   {
       if (this.schema !== undefined)
       {
           //Prendre le array fournit dans data (data.occupation)
           //Pour vérif si les valeurs existe toute.  ( .count ) en filtrant sur les id et compare le nombre de résultat retourné avec le .length
           //Pour vérif si les valeurs ont des doublons :
               //(Possible que sa marche juste avec le .count, si je chercher avec plusieurs filtre id mais qu'il y a 2 fois le même id, sa retourne tu 1 ou 2.  
           //Créer un Set avec les valeurs, et comparer .length du set au .length du array. Auquel cas, si doublons, length !=
           // const setNoDoublon = new Set(arrayOccupation);
           //if setNoDoublon.length != arrayOccupation.length { throw error }

           //Pre save, verification for occupation
           //Verify that occupations in the array exists and that there are no duplicates
           await this.schema.pre('save', async function (next: any): Promise<any>
           {
               const organisation: any = this;
               if (organisation.isModified('offer')) {
                   const taxo = TaxonomyController.getInstance();
                   const taxoList = taxo.list({ id : organisation.offer, category: "occupation" }); //"Offer is the same as occupation"
                   const count = (await taxoList).data.length;
                   if (organisation.offer.length != count)
                       throw("Pre save Erreur data occupation existe pas ou doublons"); 
                }
               return next();
           });

           //Pre update verification for occupation
           await this.schema.pre('findOneAndUpdate', async function (next: any): Promise<any>
           {
               const organisation: any = this;
               const data = organisation.getUpdate();
               
               if (data.offer) {
                   const taxo = TaxonomyController.getInstance();
                   const taxoList = taxo.list({ id : data.offer, category: "occupation" }); //"Offer is the same as occupation"
                   const count = (await taxoList).data.length;
                   if (organisation.offer.length != count)
                       throw("Pre save Erreur data occupation existe pas ou doublons"); 
                }
               return next();
           });

       }
   }
}
export default Organisation;