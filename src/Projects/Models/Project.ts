import mongoose from "mongoose";
import {Schema} from "mongoose";
import {ProjectSchema} from "../Schemas/ProjectSchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import ProjectsService from "../Services/ProjectsService";

class Project extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Project;

    /** @public @static Model singleton instance constructor */
    public static getInstance(): Project {
        if (Project._instance === undefined) {
            Project._instance = new Project();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Project._instance.registerEvents();

            //Setting virtuals
            //Project._instance.schema.virtual("Project").get( function () { return Project._instance.modelName });

            Project._instance.initSchema();

            //Index
            //Project._instance.schema.index({ "Project.Project":1});
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
        new Schema<ProjectSchema>({},
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
        return [""];
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
        }
    }

    public async documentation(): Promise<any> {
        return "";
    }


    /**
     * Register mongoose events, for now pre-save, pre-findOneAndUpdate
     */
    public registerEvents(): void {

    }
}

export default Project;