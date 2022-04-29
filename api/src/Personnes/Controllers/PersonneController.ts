import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne"
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import PersonneService from "../Services/PersonneService";
import {PersonneSchema} from "../Schemas/PersonneSchema";
import { HttpError } from "../../Error/HttpError";

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
     *      @param {object} requestData - attributs requis à la création d'une personne
     * 
     * Retourne :
     *      @return {ApiResponseContract}
    */
    public async create(requestData:any):Promise<ApiResponseContract> {
        let messageValidate = this.validateData(requestData);
        if (!messageValidate.isValid)
            return HttpError.NotAcceptable(messageValidate.message);

        let formatedData = this.formatRequestDataForDocument(requestData);
        let createdDocumentResponse = await this.service.insert(formatedData);
        
        if (createdDocumentResponse !== undefined &&
            !createdDocumentResponse.error)
            return createdDocumentResponse;

        return HttpError.NotAcceptable('Échec de la création d\'une Personne');
    }

    
    /** 
     * @method update permet de modifier et mettre à jour les attributs d'une personne dans la base de donnée.
     * 
     * Paramètres :
     *      @param {object} requestData - id et attributs à modifier.
     * 
     * Retourne :
     *      @return {ApiResponseContract} 
     */
    public async update(requestData:any):Promise<ApiResponseContract> {

        //Validation ID
        if (requestData.id === undefined)
        return HttpError.NotAcceptable("Aucun no. d'identification fournit");
        
        //Validation des données
        let messageUpdate = this.validateData(requestData);
        if (!messageUpdate.isValid)
            return HttpError.NotAcceptable(messageUpdate.message);

        let formatedData = this.formatRequestDataForDocument(requestData);
        let updatedModelResponse:any = await this.service.update(requestData.id, formatedData);

        if (updatedModelResponse !== undefined &&
            !updatedModelResponse.error)
            return updatedModelResponse;


        return HttpError.NotAcceptable('Échec de l\'update d\'une Personne');
    
    }


    /**
     * @method list permet d'obtenir une object de personne.
     * @todo
     * 
     * Paramètres : 
     *      @param {object} requestData - Doit présentement contenir tout les attributs (nom, prénom, surnom, desc.) objet query:{ {"nom":"qqch"}, {*Champs à chercher*} }
     * 
     * Retourne : 
     *      @return 
    */
    public async list(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");

        let {query} = requestData;
        //let finalQuery = new Object();
        
        //Devrait être un genre de ( foreach element in query do finalQuery.add(objet.name, objet.value) où objet est name:value => {"nom":"richard"}
        let finalQuery = {"nom":{},"prenom":{},"surnom":{},"description":{}};
        if ( query.nom !== undefined) {
         finalQuery.nom = { $regex: query.nom };
        }
        else{
            finalQuery.nom = { $regex: ""};
        }
        if ( query.prenom !== undefined) {
         finalQuery.prenom = { $regex: query.prenom };
        }
        else{
            finalQuery.prenom = { $regex: ""};
        }
        if ( query.surnom !== undefined) {
         finalQuery.surnom = { $regex: query.surnom };
        }
        else{
            finalQuery.surnom = { $regex: ""};
        }
        if ( query.description !== undefined) {
         finalQuery.description = { $regex: query.description };
        }
        else{
            finalQuery.description = { $regex: ""};
        }

        return await this.service.all(finalQuery);
    }

    /**
     * @method find permet d'effectuer une recherche afin de retourner la première personne répondant au critère de recherche.
     * @todo Permettre à la requête d'envoyer seulement les champs à chercher plutot que la totalité des champs
     * 
     * Paramètres : 
     *      @param {object} requestData - Doit présentement contenir tout les attributs (nom, prénom, surnom, desc.) objet query:{ {"nom":"qqch"}, {*Champs à chercher*} }
     * 
     * Retourne : 
     *      @return {ApiResponseContract}
    */

    public async find(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la recherche dans la liste");

        let {query} = requestData;
        //let finalQuery = new Object();
        
        //Devrait être un genre de ( foreach element in query do finalQuery.add(objet.name, objet.value) où objet est name:value => {"nom":"richard"}
        let finalQuery = {"nom":{},"prenom":{},"surnom":{},"description":{}};

        //get the model's searchable fields.
        //


        /**
         *
         for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}
         */

        if ( query.nom !== undefined) {
         finalQuery.nom = { $regex: query.nom };
        }
        else{
            finalQuery.nom = { $regex: ""};
        }
        if ( query.prenom !== undefined) {
         finalQuery.prenom = { $regex: query.prenom };
        }
        else{
            finalQuery.prenom = { $regex: ""};
        }
        if ( query.surnom !== undefined) {
         finalQuery.surnom = { $regex: query.surnom };
        }
        else{
            finalQuery.surnom = { $regex: ""};
        }
        if ( query.description !== undefined) {
         finalQuery.description = { $regex: query.description };
        }
        else{
            finalQuery.description = { $regex: ""};
        }

        return await this.service.get(finalQuery);
        //return Error.NotAcceptable();
    }

    /**
     * @method delete permet d'effectuer une suppression de la fiche d'une personne dans la base de données.
     * Paramètres : 
     *
     * Retourne : 
     *      @return void
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
     *      @param {object} requestData - attributs de personne à valider
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
     *      @param {object} requestData - attributs de Personne
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