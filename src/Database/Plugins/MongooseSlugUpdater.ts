
//import * as mongooseSlugUpdaterNodePlugin from "../../node_modules/mongoose-slug-updater";

export class MongooseSlugUpdater {

    public plugin:any;

    public async loadDependancy() {
        this.plugin = require('../../../node_modules/mongoose-slug-updater');
    }

    public assign(mongoose:any):any {
        return mongoose.plugin(this.plugin);
    }

}