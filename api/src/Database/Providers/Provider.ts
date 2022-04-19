import mongoose from "mongoose";


export default interface Provider {
    connection:mongoose.Connection;
    urlPrefix:string;
    url:string;
    databaseName:string;

    connect():mongoose.Connection;

}