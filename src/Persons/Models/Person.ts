import mongoose from "mongoose";
import {Schema} from "mongoose";
import {PersonSchema} from "../Schemas/PersonSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import * as fs from 'fs';
import TaxonomyController from "../../Taxonomy/Controllers/TaxonomyController";
import PersonsService from "../Services/PersonsService";
import {middlewareTaxonomy} from "../../Taxonomy/Middlewares/TaxonomyPreSaveOnEntity";
import { Status } from "../../Database/Schemas/StatusSchema";
import {middlewarePopulateProperty} from "../../Taxonomy/Middlewares/TaxonomiesPopulate";

class Person extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Person;

    /** @public @static Model singleton instance constructor */
    public static getInstance(): Person {
        if (Person._instance === undefined) {
            Person._instance = new Person();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Person._instance.registerEvents();
            Person._instance.registerPreEvents();

            //Setting virtual "fullName" and "type" field
            Person._instance.schema.virtual('fullName').get( function() {
                return this.firstName + ' ' + this.lastName;
            });
            Person._instance.schema.virtual("type").get( function () { return Person._instance.modelName.toLowerCase() });

            Person._instance.initSchema();

            //Index
            Person._instance.schema.index({ "occupations.occupation":1});
            Person._instance.schema.index(
                { firstName:"text", lastName:"text", nickname:"text", slug:"text" },
                { 
                    default_language: "french",
                    //Note: if changed, make sure database really changed it by usings compass or mongosh (upon restart doesn't seem like it)
                    weights:{
                        firstName:3,
                        lastName:3
                }});
        }
        return Person._instance;
    }

    /** @public Model lastName */
    modelName: string = 'Person';

    /** @public Collection lastName in database*/
    collectionName: string = 'people';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: PersonsService;
    mongooseModel: mongoose.Model<any>;

    /** @public Database schema */
    schema: Schema =
        new Schema<PersonSchema>({
                lastName: {
                    type: String,
                    minLength: 2,
                    required: true,
                    //alias: 'nom'
                },
                firstName: {
                    type: String,
                    minLength: 2,
                    required: true,
                    //alias: 'prenom'
                },
                //FirstName in virtuals (getInstance())
                slug: {
                    type: String,
                    slug: ["firstName", "lastName"],
                    slugPaddingSize: 3,
                    index: true,
                    unique: true
                },
                nickname: {
                    type: String,
                    //alias: 'surnom'
                },
                description: String,
                occupations: {
                    type: [{
                        occupation: {
                            type: mongoose.Types.ObjectId,
                            ref: "Taxonomy"
                        },
                        status: Status.schema
                    }]
                },
                mainImage: {
                    type: mongoose.Types.ObjectId,
                    ref : "Media"
                },
                status:{
                    type: Status.schema
                }
            },
            {
                toJSON: { virtuals: true },
                timestamps: true,
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
    ruleSet: any = {
        "default": {
            "id": ["idValid"],
            "lastName": ["isString"],
            "firstName": ["isString"],
            "nickname": ["isString"],
            "description": ["isString"]
        },
        "create": {
            "lastName": ["isDefined", "minLength:2"],
            "firstName": ["isDefined", "minLength:2"],
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
        return ["lastName", "firstName", "nickname", "description", "occupation"];
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
            lastName: document.lastName ?? '',
            firstName: document.firstName ?? '',
            nickname: document.nickname ?? '',
            description: document.description ?? '',
            occupations: document.occupations ?? '',
            mainImage: document.mainImage ?? '',
            slug: document.slug ?? '',
            status: document.status ?? '',
            type: document.type ?? '',
            fullName: document.fullName ?? '',
            createdAt : document.createdAt ?? '',
            updatedAt : document.updatedAt ?? '',
        }
    }

    public async documentation(): Promise<any> {
        return fs.readFileSync('/api/doc/Persons.md', 'utf-8');
    }

    /**
     * Register mongoose events, for now pre-save, pre-findOneAndUpdate
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
                try {
                    const idList = this.occupations.map( (el:any) => {
                        return new mongoose.Types.ObjectId(el.occupation);
                    });
                    await middlewareTaxonomy(idList, TaxonomyController, "occupations.occupation");
                    return next();
                } catch(e) {
                    throw(e);
                }
            });

            //Pre update verification for occupation //Maybe it should be in the schema as a validator
            this.schema.pre('findOneAndUpdate', async function (next: any): Promise<any> {
                try {
                    const person: any = this;
                    const updatedDocument = person.getUpdate();
                    if (updatedDocument["occupations"] != undefined){
                        const idList = updatedDocument.occupations.map( (el:any) => {
                            return new mongoose.Types.ObjectId(el.occupation);
                        });
                        await middlewareTaxonomy(idList, TaxonomyController, "occupations.occupation");
                    }
                    return next();
                } catch (e) {
                    throw(e);
                }
            });
        }
    }

    public registerEvents():void {
        this.schema.pre('find', function() {
            middlewarePopulateProperty(this, 'occupations.occupation', "name category status slug");
            middlewarePopulateProperty(this, "mainImage");
        });
        this.schema.pre('findOne', function() {
            middlewarePopulateProperty(this, 'occupations.occupation', "name category status slug");
            middlewarePopulateProperty(this, 'mainImage');
        });
    }
}

export default Person;