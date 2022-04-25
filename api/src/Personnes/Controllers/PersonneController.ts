import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne"
import ServiceResponse from "../../Database/Responses/ServiceResponse";
import PersonneService from "../Services/PersonneService";
import {StatusCodes} from "http-status-codes";
import {PersonneSchema} from "../Schemas/PersonneSchema";

class PersonneController {

    // Service attribute + constructeur userservice user. getinstance()
    public service:PersonneService;

    constructor(){
        this.service = new PersonneService(Personne.getInstance());
    }

    public async create(requestData:any):Promise<ServiceResponse> {
        if (!this.validateData(requestData))
            return this.errorNotAcceptable();

        let formatedData = this.formatRequestDataForDocument(requestData);
        let createdDocumentResponse = await this.service.insert(formatedData);
        
        if (createdDocumentResponse !== undefined &&
            !createdDocumentResponse.error) {

            return createdDocumentResponse;
        }
        return this.errorNotAcceptable('Les données semblent être ok, mais la création n\'a pas eu lieu.');
    }

    /**
     *
     * @param id
     * @param requestData
     */
    public async update(id:string, requestData:any):Promise<ServiceResponse> {

        if (!this.validateData(requestData)) {
            return this.errorNotAcceptable();
        }
        if (id === undefined) {
            return this.errorNotAcceptable();
        }

        let formatedData = this.formatRequestDataForDocument(requestData);

        let updatedModelResponse:any = await this.service.update(id, formatedData);

        if (updatedModelResponse !== undefined &&
            !updatedModelResponse.error) {

            return updatedModelResponse
        }

        return this.errorNotAcceptable('Les données semblent être ok, mais la mise à jour n\'a pas eu lieu.');
    
    }

    public async list():Promise<void> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");
        LogHelper.log("Réussite de la requête d'obtention de la liste");
        LogHelper.log("Échec de la requête d'obtention de la liste");
        return;
    }

    public async find():Promise<void> {
        LogHelper.log("Début de la recherche dans la liste");
        LogHelper.log("X résultat trouvé");
        LogHelper.log("Aucun résultat trouvé");
        LogHelper.log("Échec de la recherche. Cause : ______");
        return;
    }

    public async delete():Promise<void> {
        LogHelper.log("Début de la suppression d'une personne");
        LogHelper.log("Réussite de la suppression d'une personne");
        LogHelper.log("Échec de la suppression d'une personne");
        return;
    }

    public errorNotAcceptable($message:string = 'Les données partagé sont erronés ou manquantes.'):ServiceResponse {
        return {
            error: true,
            code: StatusCodes.NOT_ACCEPTABLE,
            message: $message,
            errors: [],
            data: {}
        } as ServiceResponse;
    }


    public validateData(requestData:any):boolean {
        // get required data and format data
        // parsed them
        // Return if validation passed or not.

        LogHelper.log(`Validating ${typeof requestData}`, requestData);
        //first test
        return typeof requestData === 'object' &&
            requestData.username !== null &&
            requestData.username !== undefined &&
            typeof requestData.username === 'string';
    }

    public formatRequestDataForDocument(requestData:any) {
        return {
            nom: requestData.nom,
            prenom: requestData.prenom,
            surnom: requestData.surnom,
            description: requestData.description
        } as PersonneSchema;
    }



}

export default PersonneController;