import {User} from "../Models/User";
import {UsersService} from "../Services/UsersService";
import AbstractController from "../../Abstract/Controller";

class UsersController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController;

    /** @public OrganisationService */
    service:UsersService;

    /** @public Model */
    entity:User;

    constructor() {
        super();
        this.entity = User.getInstance();
        this.service = new UsersService(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {UsersController} Controller singleton constructor
    */
    public static getInstance():AbstractController {
        if (UsersController._instance === undefined) {
            UsersController._instance = new UsersController();
        }
        return UsersController._instance;
    }
}
export {UsersController};