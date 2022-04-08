import mongoose from "mongoose";
import {ConnectOptions} from "mongodb";


class Connection {
    url: string;

    constructor(url:string) {
        this.url = url;
        mongoose.Promise = global.Promise;

        mongoose.connect(this.url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
    }

    connect() {

    }
}

export default Connection;