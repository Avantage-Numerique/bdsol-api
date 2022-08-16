import mongoose from "mongoose";
import {Schema} from "mongoose";
import { PersonneSchema } from "../Schemas/PersonneSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import * as fs from 'fs';
import { TaxonomyController } from "../../Taxonomy/Controllers/TaxonomyController";
import LogHelper from "../../Monitoring/Helpers/LogHelper";

class Personne extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance:Personne;

    /** @public @static Model singleton instance constructor */
    public static getInstance():Personne {
        if (Personne._instance === undefined) {
            Personne._instance = new Personne();
            Personne._instance.initSchema();
            Personne._instance.registerPreEvents();
        }
        return Personne._instance;
    }

    /** @public Model lastName */
    modelName:string = 'Personne';

    /** @public Collection lastName in database*/
    collectionName:string = 'personnes';

    /** @public Connection mongoose */
    connection:mongoose.Connection;
    provider:DbProvider;
    mongooseModel:mongoose.Model<any>;

    /** @public Database schema */
    schema:Schema =
        new Schema<PersonneSchema>({
            lastName: {
                type: String,
                required: true,
                alias: 'nom'
            },
            firstName: {
                type: String,
                required: true,
                alias: 'prenom'
            },
            slug: {
                type: String,
                slug: ["firstName", "lastName"],
                slugPaddingSize: 3,
                index: true,
                unique: true
            },
            nickname: {
                type: String,
                alias: 'surnom'
            },
            description: String,
            occupation: {
                type: [mongoose.Types.ObjectId],
                default:undefined,
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
                "name": "lastName",
                "label": "Nom",
                "type": "String",
                "rules": []
            },
            {
                "name": "firstName",
                "label": "Prénom",
                "type": "String",
                "rules": []
            },
            {
                "name": "nickname",
                "label": "Surnom",
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
                "name": "occupation",
                "label": "Occupation",
                "type": "ObjectId",
                "rules": []
            }
        ]
    };

    /** @public Rule set for every field of this entity for each route */
    ruleSet:any = {
        "default":{
            "id":["idValid"],
            "lastName":["isString"],
            "firstName":["isString"],
            "nickname":["isString"],
            "description":["isString"]
        },
        "create":{
            "lastName":["isDefined", "minLength:2"],
            "firstName":["isDefined", "minLength:2"],
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
        return ["lastName", "firstName","nickname","description", "occupation"];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @todo faire une version qu'on a un objet adapté au document et non mandatoir sur toute les propriétés inscrite.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any) {
        return {
            lastName: document.lastName,
            firstName: document.firstName,
            nickname: document.nickname,
            description: document.description,
            occupation: document.occupation
        }
    }

    public async documentation():Promise<any>{

        return fs.readFileSync('/api/doc/Personnes.md', 'utf-8');
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
                const personne: any = this;
                if (personne.isModified('occupation')) {
                    const taxo = TaxonomyController.getInstance();
                    const taxoList = await taxo.list({ id : personne.occupation, category: "occupation" }); //Taxonomies.OCCUPATION
                    const count = taxoList.data.length;

                    LogHelper.debug("Pre save taxoList", taxoList);
                    console.log(taxoList);
                    LogHelper.debug("Pre save", personne.occupation, personne.occupation.length, count);
                    if (personne.occupation.length != count)
                        throw("Pre save Erreur data occupation existe pas ou doublons");
                }
                return next();
            });

            //Pre update verification for occupation
            await this.schema.pre('findOneAndUpdate', async function (next: any): Promise<any>
            {
                const personne: any = this;
                const data = personne.getUpdate();
                
                if (data.occupation) {
                    const taxo = TaxonomyController.getInstance();
                    const taxoList = taxo.list({ id : data.occupation, category: "occupation" });
                    const count = (await taxoList).data.length;
                    if (data.occupation.length != count)
                        throw("Pre save Erreur data occupation existe pas ou doublons");
                }
                return next();
            });
        }
    }

}
export default Personne;