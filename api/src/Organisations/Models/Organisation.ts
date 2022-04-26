import mongoose from "mongoose";
import {Schema} from "mongoose"
import {OrganisationSchema} from "../Schemas/OrganisationSchema"
import Provider from "../../Database/Providers/Provider";
import {DataProvider} from "../../Database/Providers/DataProvider";


class Organisation {
    
    /** @static Nom du modèle */
    static modelName:string = "Organisation";

    /** @static Nom de la collection dans la base de données */
    static collectionName:string = 'organisations';

    /** @static Connection mongoose */
    static connection:mongoose.Connection;

    /** @static Provider */
    static provider:Provider;

    /** @static Schéma pour la base de donnée */
    static schema:Schema = 
        new Schema<OrganisationSchema>({

            nom: { type: String, required: true},
            description: String,
            url: String, //String? TODO
            contactPoint: String //String? TODO
        },
            {
                timestamps: true
        });

    /**
     * @static method
     * @method initSchema
     */
         static initSchema() {

            if (Organisation.providerIsSetup()) {
                Organisation.provider.connection.model(Organisation.modelName, Organisation.schema);
            }
        }

    /**
     * @static method
     * @method getInstance
     */
         static getInstance() {

            Organisation.provider = DataProvider.getInstance();//must have
            if (Organisation.providerIsSetup()) {
                Organisation.initSchema();
                return Organisation.provider.connection.model(Organisation.modelName);
            }
            throw new Error("Organisation Provider is not setup. Can't get Organisation's model");
        }

        /**
     * @static method
     * @method providerIsSetup
     * @return {boolean} isSetup
     */
         static providerIsSetup():boolean {
            return Organisation.provider !== undefined && Organisation.provider.connection !== undefined;
        }
}

export default Organisation;