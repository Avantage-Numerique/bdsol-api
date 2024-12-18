import mongoose, {Schema} from "mongoose";
import AbstractModel from "@core/Model";
import type {DbProvider} from "@database/DatabaseDomain";
import {EventSchema} from "@src/Events/Schemas/EventSchema";
import EventsService from "@src/Events/Services/EventsService";
import {TeamField} from "@src/Team/Schemas/TeamSchema";
import {Meta, SubMeta} from "@src/Moderation/Schemas/MetaSchema";
import * as fs from 'fs';
import {middlewarePopulateProperty, taxonomyPopulate} from "@src/Taxonomy/Middlewares/TaxonomiesPopulate";
import {populateUser} from "@src/Users/Middlewares/populateUser";
import {Schedule} from "@src/Database/Schemas/ScheduleSchema";
import {EventFormatEnum} from "../EventFormatEnum";
import {SocialHandle} from "@src/Database/Schemas/SocialHandleSchema";
import {ContactPoint} from "@src/Database/Schemas/ContactPointSchema";

class Event extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Event;

    /** @public @static Model singleton instance constructor */
    public static getInstance(doIndexes=true): Event {
        if (Event._instance === undefined) {
            Event._instance = new Event();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Event._instance.registerEvents();

            //Setting virtuals
            Event._instance.schema.virtual("type").get( function () { return Event._instance.modelName });

            //Index
            if (doIndexes) Event._instance.registerIndexes();

            Event._instance.initSchema();


        }
        return Event._instance;
    }

    public registerIndexes():void {
        //Indexes
        Event._instance.schema.index(
            { name:"text", alternateNate:"text", slug:"text" },
            {
                default_language: "french",
                //Note: if changed, make sure database really changed it by usings compass or mongosh (upon restart doesn't seem like it)
                weights:{
                    name:3,
                    alternateName:3,
                    slug:3,
                }
            });
    }

    /** @public Model lastName */
    modelName: string = 'Event';

    /** @public Collection Name in database*/
    collectionName: string = 'Events';

    /** @public Connection mongoose */
    connection: mongoose.Connection;
    provider: DbProvider;
    service: EventsService;
    mongooseModel: mongoose.Model<any>;

    /** @public Database schema */
    schema: Schema =
        new Schema<EventSchema>({
            name: {
                type: String,
                minLength: 2,
                required: true
            },
            slug: {
                type: String,
                slug: "name",
                slugPaddingSize: 3,
                index: true,
                unique: true
            },
            alternateName: {
                type: String
            },
            url: {
                type: [SocialHandle.schema]
            },
            description: {
                type: String,
            },
            entityInCharge: {
                type: mongoose.Types.ObjectId,
                //required: true,
                ref: "Organisation"
            },
            organizer: {
                type: mongoose.Types.ObjectId,
                ref: "Organisation"
            },
            eventType: {
                type : [mongoose.Types.ObjectId],
                ref: "Taxonomy"
            },
            eventFormat: {
                type : String,
                enum: EventFormatEnum
            },
            team: TeamField,
            startDate: {
                type: Date
            },
            endDate: {
                type: Date
            },
            contactPoint: {
                type: ContactPoint.schema
            },
            mainImage: {
                type: mongoose.Types.ObjectId,
                ref: "Media"
            },
            attendees : {
                type: [mongoose.Types.ObjectId],
                ref: "Person"
            },
            skills: {
                type: [mongoose.Types.ObjectId],
                ref: "Taxonomy"
            },
            domains: {
                type: [{
                    domain: {
                        type: mongoose.Types.ObjectId,
                        ref: "Taxonomy"
                    },
                    subMeta: SubMeta.schema
                }]
            },
            schedule: {
                type: [Schedule.schema]
            },
            subEvents: {
                type: [mongoose.Types.ObjectId],
                ref: "Event"
            },
            location: {
                type: [mongoose.Types.ObjectId],
                ref: "Place"
            },
            photoGallery:{
                type: mongoose.Types.ObjectId,
                ref: "Media"
            },
            meta: {
                type: Meta.schema
            }
        },
            {
                toJSON: {virtuals: true},
                timestamps: true,
            });

    /** @abstract Used to return attributes and rules for each field of this entity. */
    public fieldInfo: any = [];

    /** @abstract Set of rules that are verified for every field of this entity. */
    public ruleSet: any = [];

    /**
     * @get the field that are searchable.
     * @return {Object} the field slug/names.
     */
    get searchSearchableFields(): object {
        return ["name", "alternateName", "description", "eventType", "startDate", "endDate", "contactPoint"];
    }

    public dropIndexes():void {
        return;
    }

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @todo faire une version qu'on a un objet adapté au document et non mandatoir sur toute les propriétés inscrite.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any) {
        return {
            _id: document._id ?? '',
            name: document.name ?? '',
            slug: document.slug ?? '',
            alternateName: document.alternateName ?? '',
            url: document.url ?? [],
            description: document.description ?? '',
            entityInCharge: document.entityInCharge ?? '',
            organizer: document.organizer ?? '',
            eventType: document.eventType ?? '',
            eventFormat: document.eventFormat ?? '',
            team: document.team ?? [],
            startDate: document.startDate ?? '',
            endDate: document.endDate ?? '',
            contactPoint: document.contactPoint ?? {tel:{num:"", ext:""}, email:{address:""}, website:{url:""}},
            mainImage: document.mainImage ?? '',
            attendees: document.attendees ?? [],
            skills: document.skills ?? [],
            domains: document.domains ?? [],
            schedule: document.schedule ?? [],
            subEvents: document.subEvents ?? [],
            location: document.location ?? [],
            photoGallery: document.photoGallery ?? '',
            meta: document.meta ?? '',
            type: document.type ?? '',
            createdAt: document.createdAt ?? '',
            updatedAt: document.updatedAt ?? ''
        }
    }

    public async documentation(): Promise<any> {
        return fs.readFileSync('/api/doc/Event.md', 'utf-8');
    }


    public registerAggregate() {

    }

    /**
     * Register mongoose events, for now pre-save, pre-findOneAndUpdate
     */
    public registerEvents(): void {

        this.schema.pre('find', function(next) {

            // @ts-ignore //it sucks, but we need this to be the documents so shut up typescript.
            if (this.options?._recursed) {
                return next();
            }
            middlewarePopulateProperty(this, 'team.member');

            taxonomyPopulate(this, 'skills');
            taxonomyPopulate(this, 'domains.domain');

            middlewarePopulateProperty(this, 'mainImage');
            middlewarePopulateProperty(this, 'organizer');
            middlewarePopulateProperty(this, 'attendees');
            middlewarePopulateProperty(this, 'entityInCharge');
            //middlewarePopulateProperty(this, 'subEvents');
            middlewarePopulateProperty(this, 'eventType');
            middlewarePopulateProperty(this, 'location');
            middlewarePopulateProperty(this, 'photoGallery');

            populateUser(this, "meta.requestedBy");
            populateUser(this, "meta.lastModifiedBy");

            next();
        });

        this.schema.pre('findOne', function(next) {

            // @ts-ignore //it sucks, but we need this to be the documents so shut up typescript.
            if (this.options?._recursed) {
                return next();
            }
            middlewarePopulateProperty(this, 'team.member');
            taxonomyPopulate(this, 'skills');
            taxonomyPopulate(this, 'domains.domain');
            middlewarePopulateProperty(this, 'mainImage');
            middlewarePopulateProperty(this, 'organizer');
            middlewarePopulateProperty(this, 'attendees');
            middlewarePopulateProperty(this, 'entityInCharge');
            //middlewarePopulateProperty(this, 'subEvents');
            middlewarePopulateProperty(this, 'eventType');
            middlewarePopulateProperty(this, 'location');
            middlewarePopulateProperty(this, 'photoGallery');
            populateUser(this, "meta.requestedBy");
            populateUser(this, "meta.lastModifiedBy");

            next();
        });
    }
}

export default Event;