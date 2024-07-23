import AbstractController from "@core/Controller";
import EventsService from "@src/Events/Services/EventsService";
import Event from "@src/Events/Models/Event";

class EventsController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance: AbstractController;

    /** @public PersonsService */
    service: EventsService;

    /** @public Model */
    entity: Event;

    name: string = "Event";

    constructor() {
        super();
        this.entity = Event.getInstance();
        this.service = EventsService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {EventsController} Controller singleton constructor
     */
    public static getInstance(): AbstractController {
        if (typeof EventsController._instance === "undefined") {
            EventsController._instance = new EventsController();
        }
        return EventsController._instance;
    }
}

export default EventsController;