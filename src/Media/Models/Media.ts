import mongoose from "mongoose";
import {Schema} from "mongoose";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import { Media as MediaSchema } from "../../Media/MediaSchema";
import MediasService from "../Services/MediasService";

class Media extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Media;

    /** @public @static Model singleton instance constructor */
    public static getInstance(): Media {
        if (Media._instance === undefined) {
            Media._instance = new Media();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Media._instance.registerEvents();
            Media._instance.registerPreEvents();

            Media._instance.initSchema();
        }
        return Media._instance;
    }

    /** @public Model lastName */
    modelName: string = 'Media';

    /** @public Collection lastName in database*/
    collectionName: string = 'medias';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: MediasService;
    mongooseModel: mongoose.Model<any>;

    /** @public Database schema */
    schema: Schema = MediaSchema.schema;

    fieldInfo:any = {};
    ruleSet:any = {};


    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields(): object {
        return [];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any) {
        return {}
    }

    public async documentation(): Promise<any> {
        return;
    }

    /**
     * Register mongoose events, for now pre-save, pre-findOneAndUpdate
     * Prendre le array fournit dans data (data.occupation)
     * Pour vérif si les valeurs existe toute.  ( .count ) en filtrant sur les id et compare le nombre de résultat retourné avec le .length
     * Pour vérif si les valeurs ont des doublons :
     * (Possible que sa marche juste avec le .count, si je chercher avec plusieurs filtre id mais qu'il y a 2 fois le même id, sa retourne tu 1 ou 2.
     * Créer un Set avec les valeurs, et comparer .length du set au .length du array. Auquel cas, si doublons, length !=
     * const setNoDoublon = new Set(arrayOccupation);
     * if setNoDoublon.length != arrayOccupation.length { throw error }
     */
    public registerPreEvents() {
    }

    public registerEvents():void {
    }
}

export default Media;