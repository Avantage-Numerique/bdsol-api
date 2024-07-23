import mongoose, {Schema} from "mongoose";
import AbstractModel from "../../Abstract/Model";
import CommunicationsService from "../Services/CommunicationsService";
import {CommunicationSchema} from "../Schemas/CommunicationSchema";
import {DbProvider} from "@src/Database/DatabaseDomain";
import { EntityTypesEnum } from "@src/Entities/EntityTypes";

class Communication extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Communication;

    /** @public @static Model singleton instance constructor */
    public static getInstance(doIndexes=true): Communication {
        if (Communication._instance === undefined) {
            Communication._instance = new Communication();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Communication._instance.registerEvents();
            Communication._instance.registerPreEvents();

            Communication._instance.schema.virtual("type").get( function () { return Communication._instance.modelName });

            if (doIndexes) Communication._instance.registerIndexes();
            Communication._instance.initSchema();
        }
        return Communication._instance;
    }

    public registerIndexes():void {
        //Indexes
    }

    public dropIndexes() {
        return;
    }

    /** @public Model lastName */
    modelName: string = 'Communication';

    /** @public Collection lastName in database*/
    collectionName: string = 'communications';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: CommunicationsService;
    mongooseModel: mongoose.Model<any>;

    /** @public Database schema */
    schema: Schema =
        new Schema<CommunicationSchema>({
                communicationType: {
                    type: String,
                    enum: ["contact-us", "report"]
                },
                name: {
                    type: String,
                },
                email: {
                    type: String
                },
                message: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: new Date()
                },
                reportedEntityId: {
                    type: mongoose.Types.ObjectId
                },
                reportedEntityType: {
                    type: String,
                    enum: EntityTypesEnum
                },
                reportedEntitySlug: {
                    type: String
                },
                userInfo:{
                    type: {
                        userId: mongoose.Types.ObjectId,
                        ip: String
                    }
                }
            },
            {
                toJSON: { virtuals: true },
                timestamps: true,
            });

    /** @public Used to return attributes and rules for each field of this entity. */
    fieldInfo = {};

    /** @public Rule set for every field of this entity for each route */
    ruleSet: any = {}

    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields(): object {
        return ["name", "email", "message", "date"];
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
            communicationType: document.communicationType ?? '',
            //name: document.name ?? '',
            //email: document.email ?? '',
            //message: document.message ?? '',
            date: document.date ?? '',
            type: document.type ?? '',
            createdAt : document.createdAt ?? '',
            updatedAt : document.updatedAt ?? '',
        }
    }

    public async documentation(): Promise<any> {
        return "";
    }

    public registerPreEvents() {
        if (this.schema !== undefined) {

            //Pre save, verification for occupation
            //Verify that occupations in the array exists and that there are no duplicates
            /* this.schema.pre('save', async function (next: any): Promise<any> {
                    return next();
            }); */

            //Pre update verification for occupation //Maybe it should be in the schema as a validator
            /* this.schema.pre('findOneAndUpdate', async function (next: any): Promise<any> {
                return next();
            }); */
        }
    }

    public registerEvents():void {
       /*  this.schema.pre('find', function() {
        });
        this.schema.pre('findOne', function() {
        }); */
    }
}

export default Communication;