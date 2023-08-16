import {Service} from "@database/DatabaseDomain";
import Event from "@src/Events/Models/Event";

class EventsService extends Service {
    /** @private @static Singleton instance */
    private static _instance: EventsService;

    constructor(entity: Event) {
        super(entity);
    }

    /** @public @static Singleton constructor for EventsService */
    public static getInstance(model: any): EventsService {
        if (typeof EventsService._instance === "undefined") {
            EventsService._instance = new EventsService(model);
        }
        return EventsService._instance;
    }
}

export default EventsService;