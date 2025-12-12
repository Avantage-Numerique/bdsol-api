import AbstractModel from "@core/Model";

class OntologyController {
    /** @private @static Singleton instance */
    private static _instance: OntologyController;

    name: string = "Ontology";

    public model: any; //@todo create or find the best type for this.
    public appModel: AbstractModel;

    private constructor() {
        this.init();
    }

    public init() {
        this.name = "OntologyController";
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {ControllerContract} Controller singleton constructor
     */
    public static getInstance(): OntologyController {
        if (OntologyController._instance === undefined) {
            OntologyController._instance = new OntologyController();
        }
        return OntologyController._instance;
    }
}

export default OntologyController;
