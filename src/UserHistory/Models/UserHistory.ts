import mongoose, {Schema} from "mongoose";
import {UserHistorySchema} from "../Schemas/UserHistorySchema";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import UsersHistoryService from "../Services/UsersHistoryService";


class UserHistory extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance:UserHistory;

    /** @public @static Model singleton instance constructor */
    public static getInstance():UserHistory {
        if (UserHistory._instance === undefined) {
            UserHistory._instance = new UserHistory();
            UserHistory._instance.initSchema();
        }
        return UserHistory._instance;
    }

    public registerIndexes():void {
        //Indexes
    }
    public dropIndexes() {
        return true;
    }

    /** @public Model lastName */
    modelName:string = 'UserHistory';

    /** @public Collection lastName in database*/
    collectionName:string = 'userhistories';

    /** @public Connection mongoose */
    connection:mongoose.Connection;
    provider:DbProvider;
    service:UsersHistoryService;
    mongooseModel:mongoose.Model<any>;

    /** @public Database schema */
    schema:Schema =
        new Schema<UserHistorySchema>({
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                //ref: 'users' //Note, c'est dans une autre bd ?
            },
            ipAddress: {
                type: String,
                required: true
            },
            modifDate: {
                type: Date,
                default: Date.now,
                required: true
            },
            action: {
                type: String,
                enum: ['create', 'update', 'delete'],
                required: true
            },
            entityCollection: {
                type: String,
                required: true
            },
            modifiedEntity: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            fields: {
                type: Object,
                required: true
            }
        },
            {
                timestamps: true
        });


    /** @public Used to return attributes and rules for each field of this entity. */
    fieldInfo =
    {
        "route": "",
        "field": [
            {
                "name": "user",
                "label": "Utilisateur",
                "type": "ObjectId",
                "rules": []
            },
            {
                "name": "token",
                "label": "Jeton",
                "type": "String",
                "rules": []
            },
            {
                "name": "ipAddress",
                "label": "Adresse IP",
                "type": "String",
                "rules": []
            },
            {
                "name": "modifDate",
                "label": "Date de modification",
                "type": "Date",
                "rules": []
            },
            {
                "name": "modifiedEntity",
                "label": "Entité modifiée",
                "type": "ObjectId",
                "rules": []
            },
            {
                "name": "fields",
                "label": "Champs modifiés",
                "type": "[Object]",
                "rules": []
            },
        ]
    };

    /** @public Rule set for every field of this entity for each route */
    ruleSet:any = {
        "default":{
            "id":["idValid"],
            "lastName":["isString"],
            "firstName":["isString"],
            "nickname":["isString"],
            "description":["isString"]
        },
        "create":{
            "lastName":["isDefined", "minLength:2"],
            "firstName":["isDefined", "minLength:2"],
        },
        "update":{
            "id":["isDefined"]
        },
        "search":{
        },
        "list":{
        },
        "delete":{
            "id":["isDefined"]
        }
    }

    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields():object {
        return ["not implemented"];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any) {
        return {
            user: document.user ?? '',
            modifDate: document.modifDate ?? '',
            action: document.action ?? '',
            entityCollection: document.entityCollection ?? '',
            modifiedEntity: document.modifiedEntity ?? '',
            fields: document.fields ?? '',
            createdAt : document.createdAt ?? '',
            updatedAt : document.updatedAt ?? '',
        }
    }

    public async documentation():Promise<any>{
        //const response =  fs.readFileSync('/api/doc/Persons.md', 'utf-8');
        return 'Not implemented';
   }
}
export default UserHistory;