import mongoose, {Schema} from "mongoose";
import AbstractModel from "@core/Model";
import type {DbProvider} from "@database/DatabaseDomain";
import {EventSchema} from "@src/Events/Schemas/EventSchema";
import EventsService from "@src/Events/Services/EventsService";

class Event extends AbstractModel {

    /** @protected @static Singleton instance */
    protected static _instance: Event;

    /** @public @static Model singleton instance constructor */
    public static getInstance(): Event {
        if (Event._instance === undefined) {
            Event._instance = new Event();

            //events must be defined before assigning to mongoose : https://mongoosejs.com/docs/middleware.html#defining
            Event._instance.registerEvents();

            //Setting virtuals
            //Event._instance.schema.virtual("Event").get( function () { return Event._instance.modelName });

            Event._instance.initSchema();

            //Index
            //Event._instance.schema.index({ "Event.Event":1});
        }
        return Event._instance;
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
        new Schema<EventSchema>({},
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
        return [""];
    }

    public registerIndexes():void {
        return;
    };

    public dropIndexes():void {
        return;
    };

    /**
     * @public @method dataTransfertObject Format the document for the public return.
     * @todo faire une version qu'on a un objet adapté au document et non mandatoir sur toute les propriétés inscrite.
     * @param document
     * @return {any}
     */
    public dataTransfertObject(document: any) {
        return {
            _id: document._id ?? '',
        }
    }

    public async documentation(): Promise<any> {
        return "";
    }


    /**
     * Register mongoose events, for now pre-save, pre-findOneAndUpdate
     */
    public registerEvents(): void {

    }
}

export default Event;