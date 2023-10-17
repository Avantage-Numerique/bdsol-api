import express from "express";
import EmbedTaxonomiesMetas from "@src/Schedule/Jobs/EmbedTaxonomiesMetas";
import EmailNotification from "@src/Notifications/EmailNotification";
import {StatusCodes} from "http-status-codes";
import {EmailConfirmationContent} from "@src/Templates/Contents/EmailConfirmationContent";

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
            recipient:"marcandre.martin@gmail.com",
            subject: "Mam, Confirmez ce courriel pour votre compte sur avnu.ca"
        },
        EmailConfirmationContent("mam", "http://localhost:8000/verify-account/ef2254979c0f073a1f75bf03a404fa3b2547cb9bc858c54f06f5571a68a892156602c101370f08ef6d0cd15c3004663dbee15fdb052107da5e5bc30cf16ce4a133c250cda6f1478e25c7614326706af37d5fbec12f545040621cdfdd548d32c984116652d1aab97f7f6a734c19c125f2d610e1528d8529822c1a73912e53e389")
    );
    //testNotification.send();
    res.set('Content-Type', 'text/html');
    return res.status(StatusCodes.OK).send(await testNotification.preview());
});

export {ApiRouter};