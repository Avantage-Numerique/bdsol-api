import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne"
import ServiceResponse from "../../Database/Responses/ServiceResponse";
import PersonneService from "../Services/PersonneService";
import {StatusCodes} from "http-status-codes";
import {PersonneSchema} from "../Schemas/PersonneSchema";

class PersonneController {

    /** @public PersonneService */
    public service:PersonneService;

    /** @constructor */
    constructor() {
        this.service = new PersonneService(Personne.getInstance());
    }


    /**
     * @method create permet de créer et d'insérer une nouvelle entité "Personne" dans la base de donnée à partir de la requête.
     * 
     * Paramètres : 
     *      @param {liste} requestData - attributs requis à la création d'une personne
     * 
     * Retourne :
     *      @return {ServiceResponse}
    */
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

    
    /** 
     * @method update permet de modifier et mettre à jour les attributs d'une personne dans la base de donnée.
     * 
     * Paramètres :
     *      @param {liste} requestData - id et attributs à modifier.
     * 
     * Retourne :
     *      @return {ServiceResponse} 
     */
    public async update(requestData:any):Promise<ServiceResponse> {
        
        //Validation ID
        if (requestData.id === undefined)
        return this.errorNotAcceptable("Aucun no. d'identification fournit");
        
        //Validation des données
        let messageUpdate = this.validateData(requestData);
        if (!messageUpdate.isValid)
            return this.errorNotAcceptable(messageUpdate.message);

        let formatedData = this.formatRequestDataForDocument(requestData);
        let updatedModelResponse:any = await this.service.update(requestData.id, formatedData);

        if (updatedModelResponse !== undefined &&
            !updatedModelResponse.error)
            return updatedModelResponse;


        return this.errorNotAcceptable('Échec de l\'update d\'une Personne');
    
    }


    /**
     * @method list permet d'obtenir une liste de personne.
     * @todo
     * Paramètres : 
     *      @param {type}
     * 
     * Retourne : 
     *      @return 
    */
    public async list():Promise<void> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");
        LogHelper.log("Réussite de la requête d'obtention de la liste");
        LogHelper.log("Échec de la requête d'obtention de la liste");
        return;
    }

    /**
     * @method find permet d'effectuer une recherche afin de retourner la ou les personnes qui répondent aux critères de recherche.
     * @todo
     * Paramètres : 
     *      @param {type}
     * 
     * Retourne : 
     *      @return 
    */

    public async find():Promise<void> {
        LogHelper.log("Début de la recherche dans la liste");
        LogHelper.log("X résultat trouvé");
        LogHelper.log("Aucun résultat trouvé");
        LogHelper.log("Échec de la recherche. Cause : ______");
        return;
    }

    /**
     * @method delete permet d'effectuer une suppression de la fiche d'une personne dans la base de données.
     * @todo
     * Paramètres : 
     *      @param 
     * 
     * Retourne : 
     *      @return 
    */
    public async delete():Promise<void> {
        LogHelper.log("Début de la suppression d'une personne");
        LogHelper.log("Réussite de la suppression d'une personne");
        LogHelper.log("Échec de la suppression d'une personne");
        return;
    }

    
    /** 
     * @method errorNotAcceptable log erreur $message et retourne une réponse d'erreur au fureteur internet.
     * 
     * Paramètres :
     *      @param {string} $message - erreur à mettre dans les logs @default 'Les données partagé sont erronés ou manquantes.'
     * 
     * Retourne :
     *      @returns {ServiceResponse}
     */
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


    /**
     * @method validateData valide les éléments pour l'entitée Personne s'ils sont présent.
     * 
     * Paramètres :
     *      @param {liste} requestData - attributs de personne à valider
     * 
     * Retourne : validité et message d'erreur
     *      @return {objet} { isValid, message } :
     *          @desc isValid (boolean): représentant si les données sont validée
     *          @desc message (string) : décrivant l'échec ou réussite de la validation 
     */
    public validateData(requestData:any): {isValid:boolean, message:string} {

        LogHelper.log(`Validating ${typeof requestData}`, requestData);

        if (typeof requestData !== 'object')
            return {isValid:false, message:"La requête n'est pas un objet."};

        //Validation Nom
        if(requestData.nom !== undefined){
            if (!Personne.isNomOrPrenomValid(requestData.nom))
                return {isValid:false, message:"Le paramètre 'nom' est problématique"};
        }

        //Validation prénom
        if(requestData.prenom !== undefined){
            if (!Personne.isNomOrPrenomValid(requestData.prenom))
                return {isValid:false, message:"Le paramètre 'prenom' est problématique"};
        }

        //Validation terminée et réussie
        return {isValid:true, message:"OK"};          
    }


    /** 
     * @method formatRequestDataForDocument insère dans le schéma les données de la requête.
     * 
     * Paramètres :
     *      @param {liste} requestData - attributs de Personne
     * 
     * Retourne :
     *      @return {PersonneSchema} l'interface Schéma contenant les données de la requête
     */
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