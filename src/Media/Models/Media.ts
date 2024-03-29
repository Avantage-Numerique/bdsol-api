import mongoose, {Schema} from "mongoose";
import type {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import {MediaSchema} from "../Schemas/MediaSchema";
import MediasService from "../Services/MediasService";
import {Status} from "@src/Moderation/Schemas/StatusSchema";
import {licenceList} from "../List/LicenceList";
import {fileExtensionList, fileTypeList} from "../List/FileList";
import {middlewarePopulateProperty} from "@src/Taxonomy/Middlewares/TaxonomiesPopulate";
import {EntityTypesEnum} from "@src/Entities/EntityTypes";


class Media extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Media;

    /** @public @static Model singleton instance constructor */
    public static getInstance(): Media {
        if (Media._instance === undefined) {
            Media._instance = new Media();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Media._instance.registerEvents();

            Media._instance.schema.virtual("type").get( function () { return Media._instance.modelName });

            Media._instance.registerIndexes();
            Media._instance.initSchema();
        }
        return Media._instance;
    }

    public registerIndexes():void {
        return;
    }

    public dropIndexes():void {
        return;
    }

    /** @public Model lastName */
    modelName: string = 'Media';

    /** @public Collection lastName in database*/
    collectionName: string = 'media';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: MediasService;
    mongooseModel: mongoose.Model<any>;
    
    /** @public Database schema */
    schema: Schema =
        new Schema<MediaSchema>(
            {
                title: {
                    type: String
                },
                alt: {
                    type: String
                },
                description: {
                    type: String
                },
                path: {
                    type: String
                },
                url: {
                    type: String
                },
                licence: {
                    type: String,
                    enum: licenceList
                },
                fileType: {
                    type: String,
                    enum: fileTypeList
                },
                fileName: {
                    type: String
                },
                extension: {
                    type: String,
                    enum: fileExtensionList
                },
                slug: {
                    type: String,
                    slug: ["entityId"],
                    slugPaddingSize: 3,
                    index: true,
                    unique: true
                },
                entityId: {
                    type: mongoose.Types.ObjectId,
                    refPath:"entityType"
                    //required: true
                },
                entityType: {
                    type: String,
                    required: true,
                    enum: EntityTypesEnum
                },
                uploadedBy: {
                    type: mongoose.Types.ObjectId,
                    //required: true
                },
                dbStatus: {
                    type: String,
                    enum: [ "in use", "archived", "to delete", "pending" ]
                },
                status: {
                    type: Status.schema,
                    //required: true
                }
            },
            {
                timestamps: true
            }
        );

    fieldInfo:any = {};
    ruleSet:any = {};


    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields(): object {
        return ["title",
            "alt",
            "description",
            "path",
            "licence",
            "fileType",
            "extension",
            "slug",
            "entityId",
            "entityType",
            "uploadedBy",
            "status"];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any) {
        return {
            _id: document._id ?? '',
            title: document.title ?? '',
            alt: document.alt ?? '',
            description: document.description ?? '',
            path: document.path ?? '',
            url: document.url ?? '',
            licence: document.licence ?? '',
            fileType: document.fileType ?? '',
            fileName: document.fileName ?? '',
            extension: document.extension ?? '',
            slug: document.slug ?? '',
            entityId: document.entityId ?? '',
            entityType: document.entityType ?? '',
            uploadedBy: document.uploadedBy ?? '',
            status: document.status ?? '',
            type: document.type ?? '',
            createdAt : document.createdAt ?? '',
            updatedAt : document.updatedAt ?? '',
        }
    }

    public async documentation(): Promise<any> {
        return;
    }



    public registerEvents():void {
        this.schema.pre('find', function() {
            //middlewarePopulateProperty(this, "entityId");
        });
        this.schema.pre('findOne', function() {
            middlewarePopulateProperty(this, "entityId");
        });
    }
}

export default Media;