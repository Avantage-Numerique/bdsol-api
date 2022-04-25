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

    /** Méthode create permet de créer et d'insérer une nouvelle entité "Personne" dans la base de donnée à partir de la requête. 
     * Paramètres : 
     *      @requestData = { data: { *champs requis à la création d'une personne* } }
     * 
     * Retourne :
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

    
    /** Méthode update permet de modifier et mettre à jour les champs d'une personne dans la base de donnée.
     * Paramètres :
     *      @requestData = { data:{ {id:}, {updatedValues:} } } 
     *          @id = identifiant de la personne à modifier
     *          @updatedValues = champs à modifier.
     * 
     * Retourne :
     */
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

    /** Méthode list permet d'obtenir une liste de personne à des fin d'affichage. 
     * Paramètres : 
     * Retourne :
    */
    public async list():Promise<void> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");
        LogHelper.log("Réussite de la requête d'obtention de la liste");
        LogHelper.log("Échec de la requête d'obtention de la liste");
        return;
    }

    /** Méthode find permet d'effectuer une recherche afin de retourner la ou les personnes qui répondent aux critères de recherche.
     * Paramètres : 
     * Retourne :
    */
    public async find():Promise<void> {
        LogHelper.log("Début de la recherche dans la liste");
        LogHelper.log("X résultat trouvé");
        LogHelper.log("Aucun résultat trouvé");
        LogHelper.log("Échec de la recherche. Cause : ______");
        return;
    }

    /** Méthode delete permet d'effectuer une suppression de la fiche d'une personne dans la base de données. 
     * Paramètres : 
     * Retourne :
    */
    public async delete():Promise<void> {
        LogHelper.log("Début de la suppression d'une personne");
        LogHelper.log("Réussite de la suppression d'une personne");
        LogHelper.log("Échec de la suppression d'une personne");
        return;
    }
    
    /** Méthode errorNotAcceptable écrit l'erreur dans les logs et retourne une réponse d'erreur au fureteur internet.
     * Paramètres :
     *      @message = erreur à mettre dans les logs (Défaut : 'Les données partagé sont erronés ou manquantes.' )
     * 
     * Retourne :
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

    /** Méthode validateData si les éléments à valider se trouve dans la requête, alors effectue la validation de ceux-ci
     * Paramètres : 
     * Retourne : validité et message d'erreur
     *      @objet = { isValid: , message: }
     *          @isValid = boolean représentant si les données sont validée
     *          @message = message d'erreur décrivant l'échec de validité ou de réussite 
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

    /** Méthode formatRequestDataForDocument insère dans le schéma les données de la requête.
     * Paramètres : @requestData = { data: { champs de Personne }}
     * Retourne : @PersonneSchema = l'interface Schéma contenant les données de la requête */
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