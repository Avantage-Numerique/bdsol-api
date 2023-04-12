import {Service} from "../../Database/DatabaseDomain";
import Project from "../Models/Project";

class ProjectsService extends Service {
    /** @private @static Singleton instance */
    private static _instance: ProjectsService;

    constructor(entity: Project) {
        super(entity);
    }

    /** @public @static Singleton constructor for ProjectsService */
    public static getInstance(model: any): ProjectsService {
        if (ProjectsService._instance === undefined) {
            ProjectsService._instance = new ProjectsService(model);
        }
        return ProjectsService._instance;
    }
}

export default ProjectsService;