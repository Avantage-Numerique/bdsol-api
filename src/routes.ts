import express from "express";
import EmbedTaxonomiesMetas from "@src/Schedule/Jobs/EmbedTaxonomiesMetas";
import EmailNotification from "@src/Notifications/EmailNotification";
import {StatusCodes} from "http-status-codes";

const ApiRouter = express.Router();

// Would this print the doc or not ?
ApiRouter.get("/", async (req, res) => {
    const version = process.env.VERSION || 'not set';
    const port = process.env.PORT || 'not set';
    res.send(`BDSOL API (version ${version}) écoute sur le port: ${port}`)//@todo create a default get html return.
});

// Could be usefull to get the up status here.
ApiRouter.get("/test", async (req, res) => {
    res.send(`Testing or do I ? :face-machiavélique-un-peu-trop-intense-pour-la-situation-mais-cest-drole-parce-que-cest-comme-dans-un-film:`);
});

ApiRouter.get('/42',async (req, res) => {
    res.send('<style> body {white-space : pre; background-color : #22211f; color : white}</style>'+
    '<h1>The Answer to the Ultimate Question of Life, the Universe, and Everything.</h1>'+
    '<pre><h1 style="font-size:66">'+
    " ___   ___    _______  "+"<br/>"+
    "|\\  \\ |\\  \\  /  ___  \\    "+"<br/>"+
    "\\ \\  \\\\_\\  \\/__/|_/  /|   "+"<br/>"+
    " \\ \\______  \\__|//  / /  "+"<br/>"+
    "  \\|_____|\\  \\  /  /_/__  "+"<br/>"+
    "         \\ \\__\\|\\________\\"+"<br/>"+
    "          \\|__| \\|_______|"+"<br/>"+
    '</h1></pre>'
    );
});

ApiRouter.get("/embed-taxonomies-metas", async (req, res) => {
    res.send(`Embeding taxonomies metas`);
    await EmbedTaxonomiesMetas();
});

ApiRouter.get("/test-email", async (req, res) => {

    const testNotification:EmailNotification = new EmailNotification(
        {
            recipient:"marcandre.martin@gmail.com"
        },{
            title:"Salut man",
            context: {
                title:"Hola amigo",
                body: "Bleep bleep,blip, blip"
            },
            template: "base"
        }
    );
    const content:string = await testNotification.preview();
    testNotification.send();
    res.set('Content-Type', 'text/html');
    return res.status(StatusCodes.OK).send(await testNotification.preview());
});

export {ApiRouter};