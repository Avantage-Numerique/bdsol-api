import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Organisation from "../Models/Organisation"
import OrganisationsService from "../Services/OrganisationsService";
import { OrganisationSchema } from "../Schemas/OrganisationSchema";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";
import {SuccessResponse} from "../../Http/Responses/SuccessResponse";
import Validator from "../../Validation/Validator";
import QueryBuilder from "../../Database/QueryBuilder/QueryBuilder";

class OrganisationsController {

    /** @public OrganisationService */
    public service:OrganisationsService;

    /** @constructor */
    constructor() {
        this.service = new OrganisationsService(Organisation.getInstance());
    }

    /** 
     * @method update permet de modifier et mettre à jour les attributs d'une organisation dans la base de donnée.
     * 
     * Paramètres :
     *      @param {key:value} requestData - id et attributs à modifier.
     * 
     * Retourne :
     *      @return {ServiceResponse} 
     */
     public async update(requestData:any):Promise<ApiResponseContract> {
        
        //Validation des données
        const messageValidate = Validator.validateData(requestData, Organisation.ruleSet.update);
        if (!messageValidate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageValidate.message
                );
       
        const formatedData = this.formatRequestDataForDocument(requestData);
        const updatedModelResponse:any = await this.service.update(requestData.id, formatedData);
       
        if (updatedModelResponse !== undefined)
            return updatedModelResponse;

        LogHelper.debug("Le code manque de robustesse. Organisations/update");
        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Les données semblent être ok, mais la mise à jour n\'a pas eu lieu.'
            );
    
    }


    /**
     * @method create permet de créer et d'insérer une nouvelle entité "Organisation" dans la base de données
     * 
     * Paramètres :
     *      @param {key:value} requestData - Attributs requis à la création d'une organisation
     * 
     * Retourne :
     *      @return {ServiceResponse}
     */
    public async create(requestData:any):Promise<ApiResponseContract> {
        const messageValidate = Validator.validateData(requestData, Organisation.ruleSet.create);
        if (!messageValidate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageValidate.message
                );

        const formatedData = this.formatRequestDataForDocument(requestData);
        const createdDocumentResponse = await this.service.insert(formatedData);
        
        if (createdDocumentResponse !== undefined)
            return createdDocumentResponse;

        LogHelper.debug("Le code manque de robustesse. Organisations/create");
        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Les données semblent être ok, mais la création n\'a pas eu lieu.'
            );
    }

    /**
     * @method getInfo renvoi la liste des informations des champs de l'entité et les règle de validation de chaque champs.
     * Paramètres : 
     *      @param {object} requestData - contient "method" qui spécifie le retour des règles approprié
     * 
     * Retourne : 
     *      @return 
    */
         public async getInfo(requestData:any):Promise<ApiResponseContract> {
            LogHelper.log("Début de la création des informations du champs");
    
            if (typeof requestData === undefined || typeof requestData !== 'object')
                return ErrorResponse.create(
                    new Error(ReasonPhrases.BAD_REQUEST),
                    StatusCodes.BAD_REQUEST,
                    "La requête n'est pas un objet. "
                    );
    
            //let infoChamp.state = requestData.method;
            //infoChamp.champs = Personne.ruleSet.info.champs;
    
    
            return SuccessResponse.create({infoChamp:"todo"}, StatusCodes.OK, ReasonPhrases.OK);
        }

    /** 
     * @method formatRequestDataForDocument insère dans le schéma les données de la requête.
     * 
     * Paramètres :
     *      @param {key:value} requestData - attributs de l'organisation
     * 
     * Retourne :
     *      @return {OrganisationSchema} l'interface Schéma contenant les données de la requête
     */
    public formatRequestDataForDocument(requestData:any) {
        return {
            nom: requestData.nom,
            description: requestData.description,
            url: requestData.url,
            contactPoint: requestData.contactPoint
        } as OrganisationSchema;
    }

}

export default OrganisationsController;