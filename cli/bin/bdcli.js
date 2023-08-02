#! /usr/bin/env node
"use strict";
//import commander from 'commander';
//import mongoose from 'mongoose';
//import migrate from 'commands/migrate';
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const version = (_a = process.env.npm_package_version) !== null && _a !== void 0 ? _a : "0.0.0 hardcoded";
const name = (_b = process.env.npm_package_name) !== null && _b !== void 0 ? _b : "BDCLI hardcoded";
const cli = (args) => {
    console.log(args);
};
exports.cli = cli;
const commander_1 = require("commander");
//add the following line
const mainCommand = new commander_1.Command();
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
//# sourceMappingURL=bdcli.js.map