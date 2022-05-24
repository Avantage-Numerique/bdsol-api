import LogHelper from "../../Monitoring/Helpers/LogHelper";
import Personne from "../Models/Personne"
import {ApiResponseContract} from "../../Http/Responses/ApiResponse";
import {StatusCodes, ReasonPhrases} from "http-status-codes";
import {ErrorResponse} from "../../Http/Responses/ErrorResponse";
import PersonnesService from "../Services/PersonnesService";
import {PersonneSchema} from "../Schemas/PersonneSchema";
import QueryBuilder from "../../Database/QueryBuilder/QueryBuilder";

class PersonnesController {

    /** @public PersonneService */
    public service:PersonnesService;

    /** @constructor */
    constructor() {
        this.service = new PersonnesService(Personne.getInstance());
    }


    /**
     * @method create permet de créer et d'insérer une nouvelle entité "Personne" dans la base de donnée à partir de la requête.
     * 
     * Paramètres : 
     *      @param {name:value} requestData - attributs requis à la création d'une personne
     * 
     * Retourne :
     *      @return {ApiResponseContract}
    */
    public async create(requestData:any):Promise<ApiResponseContract> {
        const messageValidate = this.validateData(requestData);
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

            return ErrorResponse.create(
                new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Les données semblent être ok, mais la création n\'a pas eu lieu.'
                );
    }

    
    /** 
     * @method update permet de modifier et mettre à jour les attributs d'une personne dans la base de donnée.
     * 
     * Paramètres :
     *      @param {name:value} requestData - id et attributs à modifier.
     * 
     * Retourne :
     *      @return {ApiResponseContract} 
     */
    public async update(requestData:any):Promise<ApiResponseContract> {
        
        //Validation des données
        const messageUpdate = this.validateData(requestData);
        if (!messageUpdate.isValid)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                messageUpdate.message
                );

        //Validation ID
        if (requestData.id === undefined || requestData.id.length != 24)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "id non valide"
            );

        const formatedData = this.formatRequestDataForDocument(requestData);
        const updatedModelResponse:any = await this.service.update(requestData.id, formatedData);

        if (updatedModelResponse !== undefined)
            return updatedModelResponse;

        return ErrorResponse.create(
            new Error(ReasonPhrases.INTERNAL_SERVER_ERROR),
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Les données semblent être ok, mais la mise à jour n\'a pas eu lieu.'
            );
    
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
     *      @return {ApiResponseContract}
    */
 
    public async search(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la recherche dans la liste");

        if (typeof requestData === undefined || typeof requestData !== 'object')
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "La requête n'est pas un objet. "
                );

        //Verification data est vide
        if (requestData.nom === undefined &&
            requestData.prenom === undefined &&
            requestData.surnom === undefined &&
            requestData.description === undefined &&
            requestData.id === undefined &&
            requestData.createdAt === undefined &&
            requestData.updatedAt === undefined)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "La requête ne peut être vide"
                );

        //Validation date
        if (requestData.createdAt !== undefined &&
            //typeof requestData.createdAt == 'string' &&
            ( requestData.createdAt.substring(0,1) != '<' && requestData.createdAt.substring(0,1) != '>' ))
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de createdAt doit être '<' ou '>'"
                );

        if (requestData.updatedAt !== undefined &&
            //typeof requestData.updatedAt == 'string' &&
            ( requestData.updatedAt.substring(0,1) != '<' && requestData.updatedAt.substring(0,1) != '>' ))
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de updatedAt doit être '<' ou '>'"
                );

        //Validation ID
        if (requestData.id !== undefined && requestData.id.length != 24)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "id non valide"
            );  
        const query = QueryBuilder.build(requestData);

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
    public async list(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la requête d'obtention de la liste de personne");
        if (typeof requestData === undefined || typeof requestData !== 'object')
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "La requête n'est pas un objet. "
                );

        //Verification data est vide
        if (requestData.nom === undefined &&
            requestData.prenom === undefined &&
            requestData.surnom === undefined &&
            requestData.description === undefined &&
            requestData.id === undefined &&
            requestData.createdAt === undefined &&
            requestData.updatedAt === undefined)
                return ErrorResponse.create(
                    new Error(ReasonPhrases.BAD_REQUEST),
                    StatusCodes.BAD_REQUEST,
                    "La requête ne peut être vide"
                    );

        //Validation date
        if (requestData.createdAt !== undefined &&
            //typeof requestData.createdAt == 'string' &&
            ( requestData.createdAt.substring(0,1) != '<' && requestData.createdAt.substring(0,1) != '>' ))
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de createdAt doit être '<' ou '>'"
                );

        if (requestData.updatedAt !== undefined &&
            //typeof requestData.updatedAt == 'string' &&
            ( requestData.updatedAt.substring(0,1) != '<' && requestData.updatedAt.substring(0,1) != '>' ))
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "Le premier caractère de updatedAt doit être '<' ou '>'"
                );
            
        //Validation ID
        if (requestData.id !== undefined && requestData.id.length != 24)
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "id non valide"
            );  

        const query = QueryBuilder.build(requestData);

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
     public async delete(requestData:any):Promise<ApiResponseContract> {
        LogHelper.log("Début de la suppression d'une personne");

        if (typeof requestData === undefined || typeof requestData !== 'object')
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "La requête n'est pas un objet. "
                );

        //Verification data est vide
        if (requestData.id === undefined || requestData.id.length != 24 )
            return ErrorResponse.create(
                new Error(ReasonPhrases.BAD_REQUEST),
                StatusCodes.BAD_REQUEST,
                "id non valide"
            );  
        
        return await this.service.delete(requestData.id);
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
                requestData.prenom === undefined &&
                requestData.surnom === undefined &&
                requestData.description === undefined) {
                    isValid = false;
                    message += "Data doit contenir un champ. ";
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
                        message += "Le paramètre 'prenom' est problématique. ";
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
}

export {PersonnesController};