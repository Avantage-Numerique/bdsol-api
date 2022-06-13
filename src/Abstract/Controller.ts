import LogHelper from "../Monitoring/Helpers/LogHelper";
import {ApiResponseContract} from "../Http/Responses/ApiResponse";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {ErrorResponse} from "../Http/Responses/ErrorResponse";
import Validator from "../Validation/Validator";
import AbstractModel from "./Model";
import AbstractService from "./Service";
import Personne from "../Personnes/Models/Personne";
import PersonnesService from "../Personnes/Services/PersonnesService";



abstract class AbstractController {

    public entity:AbstractModel;
    public service:AbstractService;
    

    /** @constructor */
    constructor() {
        this.entity = new Personne();
        this.service = new PersonnesService(this.entity.getInstance());
    }

    /**
     * @method create permet de créer et d'insérer une nouvelle entité "Personne" dans la base de donnée à partir de la requête.
     * 
     * Paramètres : 
     *      @param {key:value} requestData - attributs requis à la création d'une personne
     * 
     * Retourne :
     *      @return {ApiResponseContract}
    */
     public async create(requestData:any):Promise<ApiResponseContract> {
        const messageValidate = Validator.validateData(requestData, this.entity.RuleSet("create"));
        if (!messageValidate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageValidate.message
                );

        //Can I just :  formatedData = {requestData}:Xschema
        const formatedData = this.entity.formatRequestDataForDocument(requestData);
        const createdDocumentResponse = await this.service.insert(formatedData);
        
        if (createdDocumentResponse !== undefined)
            return createdDocumentResponse;

        LogHelper.debug("Le code manque de robustesse. Entity/create");
        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Les données semblent être ok, mais la création n\'a pas eu lieu.'
            );
    }
}