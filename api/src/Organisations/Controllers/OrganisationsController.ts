import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Organisation from "../Models/Organisation"
import OrganisationsService from "../Services/OrganisationsService";
import HttpError from "../../Error/HttpError";
import { OrganisationSchema } from "../Schemas/OrganisationSchema";
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
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
     *      @param {name:value} requestData - id et attributs à modifier.
     * 
     * Retourne :
     *      @return {ServiceResponse} 
     */
     public async update(requestData:any):Promise<ApiResponseContract> {
        
        //Validation des données
        const messageUpdate = this.validateData(requestData);
        if (!messageUpdate.isValid)
            return HttpError.NotAcceptable(messageUpdate.message);

        //Validation ID
        if (requestData.id === undefined)
        return HttpError.NotAcceptable("Aucun no. d'identification fournit");
        
        const formatedData = this.formatRequestDataForDocument(requestData);
        const updatedModelResponse:any = await this.service.update(requestData.id, formatedData);

        if (updatedModelResponse !== undefined &&
            !updatedModelResponse.error)
            return updatedModelResponse;


        return HttpError.NotAcceptable('Échec de l\'update d\'une Organisation');
    
    }


    /**
     * @method create permet de créer et d'insérer une nouvelle entité "Organisation" dans la base de données
     * 
     * Paramètres :
     *      @param {name:value} requestData - Attributs requis à la création d'une organisation
     * 
     * Retourne :
     *      @return {ServiceResponse}
     */
    public async create(requestData:any):Promise<ApiResponseContract> {
        const messageValidate = this.validateData(requestData);
        if (!messageValidate.isValid)
            return HttpError.NotAcceptable(messageValidate.message);

        const formatedData = this.formatRequestDataForDocument(requestData);
        const createdDocumentResponse = await this.service.insert(formatedData);
        
        if (createdDocumentResponse !== undefined &&
            !createdDocumentResponse.error)
            return createdDocumentResponse;

        return HttpError.NotAcceptable('Échec de la création d\'une Organisation');
    }

    /**
     * @method validateData valide les éléments pour l'entitée Personne s'ils sont présent.
     * 
     * Paramètres :
     *      @param {name:value} requestData - attributs de personne à valider
     * 
     * Retourne : validité et message d'erreur
     *      @return {object} { isValid, message } :
     *          @desc isValid (boolean): représentant si les données sont validée
     *          @desc message (string) : décrivant l'échec ou réussite de la validation 
     */
         public validateData(requestData:any): {isValid:boolean, message:string} {

            LogHelper.log(`Validating ${typeof requestData}`, requestData);
            let isValid = true;
            let message = "";
    
            if (typeof requestData === 'object')
            {
                //Verification data est vide
                if (requestData.nom === undefined &&
                    requestData.description === undefined &&
                    requestData.url === undefined &&
                    requestData.contactPoint === undefined){
                        isValid = false;
                        message += "Data doit contenir un champ. ";
                    }
    
                //Si n'est pas vide
                else{
                    //Validation Nom
                    //Le (if nom !== undefined) est inutile (à effacer au besoin)
                    if (requestData.nom !== undefined){
                        if (typeof requestData.nom !== "string" ||
                            requestData.nom.length <= 2){
                            isValid = false;
                            message += "Le paramètre 'nom' est problématique. "
                        }
                    }
                }
            }
            //Si n'est pas un objet
            else{
                isValid = false;
                message += "La requête n'est pas un objet. "
            }
    
            return { isValid, message };      
        }

    /** 
     * @method formatRequestDataForDocument insère dans le schéma les données de la requête.
     * 
     * Paramètres :
     *      @param {name:value} requestData - attributs de l'organisation
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