class MonitoringService {
    /** @private @static Singleton instance */
    private static _instance: MonitoringService;

    constructor() {

    }

    /** @public @static Singleton constructor for StaticContentsService */
    public static getInstance(): MonitoringService {
        if (MonitoringService._instance === undefined) {
            MonitoringService._instance = new MonitoringService();
        }
        return MonitoringService._instance;
    }

}

export default MonitoringService;