import AbstractController from "../../Abstract/Controller";
import ProjectsService from "../Services/ProjectsService";
import Project from "../Models/Project";

class ProjectsController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance: AbstractController;

    /** @public PersonsService */
    service: ProjectsService;

    /** @public Model */
    entity: Project;

    name: string = "Project";

    constructor() {
        super();
        this.entity = Project.getInstance();
        this.service = ProjectsService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {ProjectsController} Controller singleton constructor
     */
    public static getInstance(): AbstractController {
        if (ProjectsController._instance === undefined) {
            ProjectsController._instance = new ProjectsController();
        }
        return ProjectsController._instance;
    }
}

export default ProjectsController;