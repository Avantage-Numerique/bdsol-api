import mongoose from "mongoose";
import {Schema} from "mongoose";
import {ProjectSchema} from "../Schemas/ProjectSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import ProjectsService from "../Services/ProjectsService";
import { Member } from "../../Database/Schemas/MemberSchema";
import { Status } from "../../Moderation/Schemas/StatusSchema";
import { middlewarePopulateProperty, taxonomyPopulate } from "../../Taxonomy/Middlewares/TaxonomiesPopulate";
import { populateUser } from "../../Users/Middlewares/populateUser";
import { User } from "../../Users/UsersDomain";
import { Sponsor } from "../../Database/Schemas/SponsorSchema";
import { ScheduleBudget } from "../../Database/Schemas/ScheduleBudgetSchema";
import { Location } from "../../Database/Schemas/LocationSchema";

class Project extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Project;

    /** @public @static Model singleton instance constructor */
    public static getInstance(): Project {
        if (Project._instance === undefined) {
            Project._instance = new Project();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Project._instance.registerPreEvents();
            Project._instance.registerEvents();

            //Setting virtuals
            Project._instance.schema.virtual("type").get( function () { return Project._instance.modelName });

            Project._instance.initSchema();

            //Index
            Project._instance.schema.index({ "name":1 });
            //index text for search ?
        }
        return Project._instance;
    }

    /** @public Model lastName */
    modelName: string = 'Project';

    /** @public Collection Name in database*/
    collectionName: string = 'Projects';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: ProjectsService;
    mongooseModel: mongoose.Model<any>;

    /** @public Database schema */
    schema: Schema =
        new Schema<ProjectSchema>({
            name: {
                type: String,
                minlenght: 2,
                required: true
            },
            entityInCharge: {
                type: mongoose.Types.ObjectId,
            },
            producer: {
                type: mongoose.Types.ObjectId,
                ref: "Organisation" //Investigate refPath or dynamic populate model call
            },
            alternateName: {
                type: String
            },
            description: {
                type: String
            },
            url: {
                type: String
            },
            contactPoint: {
                type: String
            },
            location: {
                type: Location.schema
            },
            team: {
                type: [Member.schema],
                ref: "Person"
            },
            mainImage: {
                type: mongoose.Types.ObjectId,
                ref: "Media"
            },
            sponsor: {
                type: [Sponsor.schema]
            },
            scheduleBudget: {
                type: ScheduleBudget.schema
            },
            skills: {
                type: [mongoose.Types.ObjectId],
                ref: "Taxonomy"
            },
            status: {
                type: Status.schema
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
        return ["name",
        "alternateName",
        "description",
        "url",
        "contactPoint",
        "location",
        "team",
        "sponsor",
        "scheduleBudget",
        "skills",];
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
            alternateName: document.alternateName ?? '',
            description: document.description ?? '',
            url: document.url ?? '',
            contactPoint: document.contactPoint ?? '',
            location: document.location ?? '',
            team: document.team ?? '',
            mainImage: document.mainImage ?? '',
            sponsor: document.sponsor ?? '',
            scheduleBudget: document.scheduleBudget ?? '',
            skills: document.skills ?? '',
            status: document.status ?? '',
            createdAt: document.createdAt ?? '',
            updatedAt: document.updatedAt ?? '',
        }
    }

    public async documentation(): Promise<any> {
        return "";
    }

    public registerPreEvents() {
        if (this.schema !== undefined) {

            //Pre save, verification for occupation
            //Verify that occupations in the array exists and that there are no duplicates
            //this.schema.pre('save', async function (next: any): Promise<any> {
                    /*const idList = this.occupations.map( (el:any) => {
                        return el.skills.map( (id:any) =>{
                            return new mongoose.Types.ObjectId(id);
                        })
                    });
                    await middlewareTaxonomy(idList, TaxonomyController, "occupations.skills");
                    return next();*/
            //});

            //Pre update verification for occupation //Maybe it should be in the schema as a validator
            //this.schema.pre('findOneAndUpdate', async function (next: any): Promise<any> {
                    /*const person: any = this;
                    const updatedDocument = person.getUpdate();
                    if (updatedDocument["occupations"] != undefined){
                        const idList = updatedDocument.occupations.map( (el:any) => {
                            return el.skills.map( (id:any) =>{
                                return new mongoose.Types.ObjectId(id);
                            })
                        });
                        await middlewareTaxonomy(idList, TaxonomyController, "occupations.skills");
                    }
                    return next();*/
            //});
        }
    }


    /**
     * Register mongoose events, for now pre-save, pre-findOneAndUpdate
     */
    public registerEvents(): void {
        this.schema.pre('find', function() {
            middlewarePopulateProperty(this, 'team.member', "firstName lastName status");
            taxonomyPopulate(this, 'skills');
            middlewarePopulateProperty(this, 'mainImage');

            populateUser(this, "status.requestedBy", User.getInstance().mongooseModel)
            populateUser(this, "status.lastModifiedBy", User.getInstance().mongooseModel)
        });

        this.schema.pre('findOne', function() {
            middlewarePopulateProperty(this, 'team.member', "firstName lastName status");
            taxonomyPopulate(this, 'skills');
            middlewarePopulateProperty(this, 'mainImage');

            populateUser(this, "status.requestedBy", User.getInstance().mongooseModel)
            populateUser(this, "status.lastModifiedBy", User.getInstance().mongooseModel)
        });
    }
}

export default Project;