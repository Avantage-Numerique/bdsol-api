import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne"
import ServiceResponse from "../../Database/Responses/ServiceResponse";
import PersonneService from "../Services/PersonneService";
import {StatusCodes} from "http-status-codes";
import {PersonneSchema} from "../Schemas/PersonneSchema";
import { request } from "express";

class PersonneController {

    // Service attribute + constructeur userservice user. getinstance()
    public service:PersonneService;

    constructor(){
        this.service = new PersonneService(Personne.getInstance());
    }

    /** allo */
    public async create(requestData:any):Promise<ServiceResponse> {
        let messageValidate = this.validateData(requestData);
        if (!messageValidate.isValid)
            return this.errorNotAcceptable(messageValidate.message);

        let formatedData = this.formatRequestDataForDocument(requestData);
        let createdDocumentResponse = await this.service.insert(formatedData);
        
        if (createdDocumentResponse !== undefined &&
            !createdDocumentResponse.error)
            return createdDocumentResponse;
        

        return this.errorNotAcceptable('Échec de la création d\'une Personne');
    }

    
    public async update(id:string, requestData:any):Promise<ServiceResponse> {
        let messageUpdate = this.validateData(requestData);
        if (!messageUpdate.isValid)
            return this.errorNotAcceptable(messageUpdate.message);

        if (id === undefined)
            return this.errorNotAcceptable("Aucun no. d'identification fournit");

        let formatedData = this.formatRequestDataForDocument(requestData);

        let updatedModelResponse:any = await this.service.update(id, formatedData);

        if (updatedModelResponse !== undefined &&
            !updatedModelResponse.error)
            return updatedModelResponse;


        return this.errorNotAcceptable('Échec de l\'update d\'une Personne');
    
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
        LogHelper.error("Échec NotAcceptable ", $message);
        return {
            error: true,
            code: StatusCodes.NOT_ACCEPTABLE,
            message: $message,
            errors: [],
            data: {}
        } as ServiceResponse;
    }


    public validateData(requestData:any): {isValid:boolean, message:string} {

        LogHelper.log(`Validating ${typeof requestData}`, requestData);

        if (typeof requestData !== 'object')
            return {isValid:false, message:"La requête n'est pas un objet."};

        //Validation Nom
        if(requestData.nom !== undefined){
            if (!Personne.isNomValid(requestData.nom))
                return {isValid:false, message:"Le paramètre 'nom' est problématique"};
        }

        //Validate prénom
        if(requestData.prenom !== undefined){
            if (!Personne.isNomValid(requestData.prenom))
                return {isValid:false, message:"Le paramètre 'prenom' est problématique"};
        }

        return {isValid:true, message:"OK"};          
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