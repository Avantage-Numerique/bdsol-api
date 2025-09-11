interface DBProfileConfigType {
    profile: number;
    slowms: number;
    sampleRate: number;
}

class DatabaseMonitoringController {

    // need singleton ?


    public static active: boolean = false;

    public static activate(environment:string) {
        DatabaseMonitoringController.active = true;
        if (environment === 'development') {
            DatabaseMonitoringController.activateForDevelopment();
        }

        if (environment === 'staging') {
            DatabaseMonitoringController.activateForStaging();
        }

        if (environment === 'production') {
            DatabaseMonitoringController.activateForProduction();
        }
    }

    public static deactivate(environment:string) {
        DatabaseMonitoringController.active = false;

        if (environment === 'development') {
            DatabaseMonitoringController.desactivateForDevelopment();
        }

        if (environment === 'staging') {
            DatabaseMonitoringController.desactivateForStaging();
        }

        if (environment === 'production') {
            DatabaseMonitoringController.desactivateForProduction();
        }
    }

    public static config(environment:string) {
        if (environment === 'development') {

        }

        if (environment === 'staging') {

        }

        if (environment === 'production') {

        }
    }

    public static defaultConfig(): DBProfileConfigType {
        // Profile levels:
        // 0: No profiling
        // 1: Profile slow operations only (recommended for dev)
        // 2: Profile all operations (use with caution)
        return {
            profile: 1,
            slowms: 100,
            sampleRate: 1.0
        } as DBProfileConfigType;
    }

    public static activateForDevelopment(): void {

    }

    public static activateForStaging(): void {

    }

    public static activateForProduction(): void {

    }

    public static desactivateForDevelopment(): void {

    }

    public static desactivateForStaging(): void {

    }

    public static desactivateForProduction(): void {

    }

}