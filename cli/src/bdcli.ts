#! /usr/bin/env node

//import commander from 'commander';
//import mongoose from 'mongoose';
//import migrate from 'commands/migrate';

const version = process.env.npm_package_version ?? "0.0.0 hardcoded";
const name = process.env.npm_package_name ?? "BDCLI hardcoded";

export const cli = (args:any) => {
    console.log(args);
}

import { Command } from "commander";

//add the following line
const mainCommand = new Command();

console.log(`${name} ${version}`);

mainCommand.version(version)
    .description("An example CLI for managing a directory")
    .option("-l, --ls  [value]", "List directory contents")
    .option("-m, --mkdir <value>", "Create a directory")
    .option("-t, --touch <value>", "Create a file")
    .parse(process.argv);

const options = mainCommand.opts();

/*commander
    .command('migrate')
    .description('Run schema migration')
    .action(async () => {
        await migrate();
    });

commander.parse(process.argv);*/

//export { commander };

/*
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

 */

/*
"scripts": {
  "start": "ts-node index.ts",
  "migrate": "ts-node src/cli.ts"
}

 */