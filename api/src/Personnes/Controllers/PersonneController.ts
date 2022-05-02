import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne"
import ServiceResponse from "../../Database/Responses/ServiceResponse";
import PersonneService from "../Services/PersonneService";
import {PersonneSchema} from "../Schemas/PersonneSchema";
import { Error } from "../../Error/Error";

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
     *      @param {name:value} requestData - attributs requis à la création d'une personne
     * 
     * Retourne :
     *      @return {ServiceResponse}
    */
    public async create(requestData:any):Promise<ServiceResponse> {
        let messageValidate = this.validateData(requestData);
        if (!messageValidate.isValid)
            return Error.NotAcceptable(messageValidate.message);

        let formatedData = this.formatRequestDataForDocument(requestData);
        let createdDocumentResponse = await this.service.insert(formatedData);
        
        if (createdDocumentResponse !== undefined &&
            !createdDocumentResponse.error)
            return createdDocumentResponse;

        return Error.NotAcceptable('Échec de la création d\'une Personne');
    }

    
    /** 
     * @method update permet de modifier et mettre à jour les attributs d'une personne dans la base de donnée.
     * 
     * Paramètres :
     *      @param {name:value} requestData - id et attributs à modifier.
     * 
     * Retourne :
     *      @return {ServiceResponse} 
     */
    public async update(requestData:any):Promise<ServiceResponse> {
        
        //Validation des données
        let messageUpdate = this.validateData(requestData);
        if (!messageUpdate.isValid)
            return Error.NotAcceptable(messageUpdate.message);

        //Validation ID
        if (requestData.id === undefined)
        return Error.NotAcceptable("Aucun no. d'identification fournit");
        
        let formatedData = this.formatRequestDataForDocument(requestData);
        let updatedModelResponse:any = await this.service.update(requestData.id, formatedData);

        if (updatedModelResponse !== undefined &&
            !updatedModelResponse.error)
            return updatedModelResponse;


        return Error.NotAcceptable('Échec de l\'update d\'une Personne');
    
    }

    /**
     * @method search permet d'effectuer une recherche afin de retourner la première personne répondant au critère de recherche.
     * @todo La recherche par id n'est pas implémentée
     * 
     * Paramètre : 
     *      @param {name:value} requestData - { "nom":"Jean" (*Critère de recherche*) }
     * 
     * Retourne : 
     *      @default critères vide: Retourne le premier résultat
     *      @return {ServiceResponse}
    */
 
    public async search(requestData:any):Promise<ServiceResponse> {
        LogHelper.log("Début de la recherche dans la liste");
        if (requestData.id !== undefined){
            LogHelper.debug("La recherche par id n'est pas implémentée");
        }
        
        let query = this.tempQueryBuilder(requestData);
 
        return await this.service.get(query);
    }

    /**
     * @method list permet d'obtenir une liste de personne pouvant être filtré.
     * @todo La recherche par id n'est pas implémentée
     * 
     * Paramètres : 
     *      @param {name:value} requestData - { "nom":"Jean" (*Critère de recherche*) }
     * 
     * Retourne : 
     *      @return 
    */
    public async list(requestData:any):Promise<ServiceResponse> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");
        if (requestData.id !== undefined){
            LogHelper.debug("La recherche par id n'est pas implémentée");
        }

        let query = this.tempQueryBuilder(requestData);

        return await this.service.all(query);
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
     * @method validateData valide les éléments pour l'entitée Personne s'ils sont présent.
     * 
     * Paramètres :
     *      @param {name:value} requestData - attributs de personne à valider
     * 
     * Retourne : validité et message d'erreur
     *      @return {objet} { isValid, message } :
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
                requestData.prenom === undefined &&
                requestData.surnom === undefined &&
                requestData.description === undefined){
                    isValid = false;
                    message += "Data doit contenir un champ à modifier. ";
                }

            //Si n'est pas vide
            else{
                
                //Validation Nom
                //Le (if nom !== undefined) est inutile (à effacer au besoin)
                if (requestData.nom !== undefined){
                    if (!Personne.isNomOrPrenomValid(requestData.nom)){
                        isValid = false;
                        message += "Le paramètre 'nom' est problématique. "
                    }
                }

                //Validation prénom
                if(requestData.prenom !== undefined){
                    if (!Personne.isNomOrPrenomValid(requestData.prenom)){
                        isValid = false;
                        message += "Le paramètre 'prenom' est problématique";
                    }
                }
            }
        }
        //Si n'est pas un objet
        else{
            isValid = false;
            message += "La requête n'est pas un objet."
        }

        return { isValid, message };      
    }


    /** 
     * @method formatRequestDataForDocument insère dans le schéma les données de la requête.
     * 
     * Paramètres :
     *      @param {name:value} requestData - attributs de Personne
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

    /**
     * @method tempQueryBuilder Forme la requête de condition à envoyer à mongoose.
     * 
     * Paramètre :
     * @param {name:value} query  - Les critère de recherche
     * 
     * Retourne :
     * @return {objet} finalQuery est la totalité des conditions associé à la recherche
     */
    public tempQueryBuilder(query:any) {

        let finalQuery = {"nom":{},"prenom":{},"surnom":{},"description":{}, "createdAt":{}, "updatedAt":{}};

        /*if ( query.id !== undefined) {
            finalQuery._id = { $regex: query.id };
           }
        else{
            finalQuery._id = { $regex: ""};
        }*/
        if ( query.nom !== undefined) {
            finalQuery.nom = { $regex: query.nom , $options : 'i' };
           }
        else{
            finalQuery.nom = { $regex: "" };
        }
        if ( query.prenom !== undefined) {
            finalQuery.prenom = { $regex : query.prenom , $options : 'i' };
        }
        else{
            finalQuery.prenom = { $regex: "" };
        }
        if ( query.surnom !== undefined) {
            finalQuery.surnom = { $regex: query.surnom , $options : 'i' };
        }
        else{
            finalQuery.surnom = { $regex: "" };
        }
        if ( query.description !== undefined) {
            finalQuery.description = { $regex: query.description , $options : 'i' };
        }
        else{
            finalQuery.description = { $regex: "" };
        }
        if ( query.createdAfter !== undefined) {
            finalQuery.createdAt = { $gt : query.createdAfter+"T-23:59:59.999+00:00" };
        }
        else{
            finalQuery.createdAt = { $regex: "" };
        }
        //if ( query.createdBefore !== undefined) {
        //    finalQuery.createdAt = { $lt : query.createdBefore+"T-23:59:59.999+00:00" };
        //}
        //else{
        //    finalQuery.createdAt = { $regex: "" };
        //}
        if ( query.updatedAfter !== undefined) {
            finalQuery.updatedAt = { $gt : query.updatedAfter+"T-23:59:59.999+00:00" };
        }
        else{
            finalQuery.updatedAt = { $regex: "" };
        }
        if ( query.updatedBefore !== undefined) {
            finalQuery.updatedAt = { $lt : query.updatedBefore+"T-23:59:59.999+00:00" };
        }
        else{
            finalQuery.updatedAt = { $regex: "" };
        }
        return finalQuery;
    }

}

export default PersonneController;