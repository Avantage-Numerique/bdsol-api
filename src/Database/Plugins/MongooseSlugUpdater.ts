
//import * as mongooseSlugUpdaterNodePlugin from "../../node_modules/mongoose-slug-updater";

export class MongooseSlugUpdater {

    public plugin:any;

    public async load() {
        if (this.plugin === undefined) {
            //this.plugin = require('../../../node_modules/mongoose-slug-updater');
            this.plugin = require('mongoose-slug-updater');
        }
    }

    public async assign(mongoose:any):Promise<any> {
        await this.load();
        return mongoose.plugin(this.plugin);
    }

}