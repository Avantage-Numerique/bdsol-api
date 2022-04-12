import User from "../Models/User";
import {UserDocument} from "../Schemas/UserSchema";
import UsersService from "../Services/UsersService";

/**
 * First pitch, in parallele with fred, for a crud controller.
 * Next step will be to create a CrudController, to abstract the core that will be designed here.
 */
export default class UserController {

    public service:UsersService;

    constructor() {
        this.service = new UsersService(User.getInstance());
    }

    public create(requestData:any) {

    }

    /**
     * Update the user information
     * Password shall now be updated this way.
     * @todo add error if password is added here.
     * @param id the document id of the user.
     * @param requestData the data to update.
     */
    public update(id:string, requestData:any) {
        let formatedData = this.formatRequestDataForDocument(requestData);
        let updatedModel = this.service.update(id, formatedData);

        return {
            code:1
        }
    }

    public get(requestData:any) {

    }

    public delete(userID:string) {

    }

    public formatRequestDataForDocument(requestData:any) {
        return {
            username: requestData.username,
            email: requestData.email,
            password: requestData.password,
            name: requestData.name,
            role: requestData.role,
            avatar: requestData.avatar
        } as UserDocument;
    }

}