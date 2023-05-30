//import commander from 'commander';
//import mongoose from 'mongoose';
//import migrate from 'commands/migrate';

export const cli = (args:any) => {
    console.log(args);
}

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