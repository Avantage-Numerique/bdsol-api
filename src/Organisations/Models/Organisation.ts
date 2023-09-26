import mongoose, {Schema} from "mongoose";
import {OrganisationSchema} from "../Schemas/OrganisationSchema";
import {DbProvider} from "../../Database/DatabaseDomain";
import AbstractModel from "../../Abstract/Model";
import * as fs from 'fs';
import TaxonomyController from "../../Taxonomy/Controllers/TaxonomyController";
import OrganisationsService from "../Services/OrganisationsService";
import {middlewareTaxonomy} from "@src/Taxonomy/Middlewares/TaxonomyPreSaveOnEntity";
import {Member} from "@src/Team/Schemas/MemberSchema";
import {Meta, SubMeta} from "@src/Moderation/Schemas/MetaSchema";
import {middlewarePopulateProperty, taxonomyPopulate} from "@src/Taxonomy/Middlewares/TaxonomiesPopulate";
import {populateUser} from "@src/Users/Middlewares/populateUser";
import {User} from "@src/Users/Models/User";
import {SkillGroup} from "@src/Taxonomy/Schemas/SkillGroupSchema";


class Organisation extends AbstractModel {

    /** @protected @static Singleton instance of model Organisation */
    protected static _instance: Organisation;

    /** @public @static Model singleton instance constructor */
    public static getInstance(doIndexes=true): Organisation {
        if (Organisation._instance === undefined) {
            Organisation._instance = new Organisation();
            Organisation._instance.registerPreEvents();
            Organisation._instance.registerEvents();

            Organisation._instance.schema.virtual("type").get( function () { return Organisation._instance.modelName });
            if (doIndexes) Organisation._instance.registerIndexes();
            Organisation._instance.initSchema();
        }
        return Organisation._instance;
    }

    public registerIndexes():void {
        //Indexes
        this.schema.index({ "offers.skills":1});
        this.schema.index({ "team.member":1});
        this.schema.index(
            { name:"text", description:"text", slug:"text"},
            {
                default_language: "french",
                //Note: if changed, make sure database really changed it by usings compass or mongosh (upon restart doesn't seem like it)
                weights:{
                    name:4,
                    description:2
                }});
    }

    public dropIndexes():void {
        return;
    }

    /** @public Model name */
    modelName: string = "Organisation";

    /** @public Collection name in database */
    collectionName: string = 'organisations';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    service: OrganisationsService;
    mongooseModel: mongoose.Model<any>;
    provider: DbProvider;

    /** @public Database schema */
    schema: Schema =
        new Schema<OrganisationSchema>({
                name: {
                    type: String,
                    required: true,
                    index:true,
                    unique: true,
                    //alias: 'nom'
                },
                slug: {
                    type: String,
                    slug: "name",
                    slugPaddingSize: 2,
                    index: true,
                    unique: true
                },
                description: {
                    type: String,
                    //alias: 'desc'
                },
                url: {
                    type: String,
                },
                contactPoint: {
                    type: String,
                },
                fondationDate: {
                    type: Date,
                },
                // DRY this with groupName to have this "skillGroup as
                offers: {
                    type: [SkillGroup.schema],
                },
                domains: {
                    type: [{
                        domain: {
                            type: mongoose.Types.ObjectId,
                            ref: "Taxonomy"
                        },
                        subMeta: SubMeta.schema,
                        _id:false
                    }]
                },
                team: {
                    type: [Member.schema],
                    ref: "Person"
                },
                mainImage: {
                    type: mongoose.Types.ObjectId,
                    ref : "Media"
                },
                catchphrase: {
                    type: String
                },
                location: {
                    type: [mongoose.Types.ObjectId],
                    ref: "Place"
                },
                meta: {
                    type: Meta.schema
                }
            },
            {
                toJSON: { virtuals: true },
                timestamps: true
            });

    /** @deprecated */
    fieldInfo = {};

    /**  @deprecated*/
    ruleSet: any = {}

    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields(): object {
        return ["name", "description", "url", "contactPoint", "fondationDate", "offers", "domains"];
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any): any {
        return {
            _id: document._id ?? '',
            name: document.name ?? '',
            description: document.description ?? '',
            url: document.url ?? '',
            contactPoint: document.contactPoint ?? '',
            fondationDate: document.fondationDate ?? '',
            offers: document.offers ?? '',
            domains: document.domains ?? '',
            team: document.team ?? '',
            mainImage: document.mainImage ?? '',
            slug: document.slug ?? '',
            catchphrase: document.catchphrase ?? '',
            meta : document.meta ?? '',
            location: document.location ?? [],
            type: document.type ?? '',
            createdAt : document.createdAt ?? '',
            updatedAt : document.updatedAt ?? '',
        }
    }

    public async documentation(): Promise<any> {
        return fs.readFileSync('/api/doc/Organisations.md', 'utf-8');
    }

    /**
     * Add listenner to pre and findOneAndUpdate mongoose events.
     * Prendre le array fournit dans data (data.occupation)
     * Pour vérif si les valeurs existe toute.  ( .count ) en filtrant sur les id et compare le nombre de résultat retourné avec le .length
     * Pour vérif si les valeurs ont des doublons :
     * (Possible que sa marche juste avec le .count, si je chercher avec plusieurs filtre id mais qu'il y a 2 fois le même id, sa retourne tu 1 ou 2.
     * Créer un Set avec les valeurs, et comparer .length du set au .length du array. Auquel cas, si doublons, length !=
     * const setNoDoublon = new Set(arrayOccupation);
     * if setNoDoublon.length != arrayOccupation.length { throw error }
     */
    public registerPreEvents() {
        if (this.schema !== undefined) {

            //Pre save, verification for occupation
            //Verify that occupations in the array exists and that there are no duplicates
            this.schema.pre('save', async function (next: any): Promise<any> {
                const idList = this.offers.map( (el:any) => {
                    return el.skills.map( (id:any) =>{
                        return new mongoose.Types.ObjectId(id);
                    })
                });
                await middlewareTaxonomy(idList.flat(), TaxonomyController, "offers.skills");
                return next();
            });

            //Pre update verification for occupation //Maybe it should be in the schema as a validator
            this.schema.pre('findOneAndUpdate', async function (next: any): Promise<any> {
                const updatedDocument:any = this.getUpdate();
                if (updatedDocument && updatedDocument["offers"] != undefined){
                    const idList = updatedDocument["offers"].map( (el:any) => {
                        return el.skills.map( (id:any) =>{
                            return new mongoose.Types.ObjectId(id);
                        });
                    });
                    await middlewareTaxonomy(idList.flat(), TaxonomyController, "offers.skills");
                }

                return next();
            });
        }
    }

    public registerEvents():void {

        this.schema.pre('find', function() {
            taxonomyPopulate(this, 'offers.skills');
            taxonomyPopulate(this, 'domains.domain');

            middlewarePopulateProperty(this, 'team.member');
            middlewarePopulateProperty(this, "mainImage");
            middlewarePopulateProperty(this, "location");

            populateUser(this, "meta.requestedBy", User.getInstance().mongooseModel);
            populateUser(this, "meta.lastModifiedBy", User.getInstance().mongooseModel);
        });
        
        this.schema.pre('findOne', function() {
            taxonomyPopulate(this, 'offers.skills');
            taxonomyPopulate(this, 'domains.domain');

            middlewarePopulateProperty(this, 'team.member');
            middlewarePopulateProperty(this, "mainImage");
            middlewarePopulateProperty(this, "location");

            populateUser(this, "meta.requestedBy", User.getInstance().mongooseModel);
            populateUser(this, "meta.lastModifiedBy", User.getInstance().mongooseModel);
        });
    }
}

export default Organisation;