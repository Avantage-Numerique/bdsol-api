class ReferentialController {
    /** @private @static Singleton instance */
    private static _instance: ReferentialController;

    constructor() {}

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {OrganisationsController} Controller singleton constructor
     */
    public static getInstance(): ReferentialController {
        if (ReferentialController._instance === undefined) {
            ReferentialController._instance = new ReferentialController();
        }
        return ReferentialController._instance;
    }
}

export default ReferentialController;
