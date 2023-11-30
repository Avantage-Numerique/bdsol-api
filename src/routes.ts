import express from "express";
import EmbedTaxonomiesMetas from "@src/Schedule/Jobs/EmbedTaxonomiesMetas";
import EmailNotification from "@src/Notifications/EmailNotification";
import {StatusCodes} from "http-status-codes";
import {EmailConfirmationContent} from "@src/Templates/Contents/EmailConfirmationContent";
import config from "@src/config";
import PublicTemplate from "@src/Templates/PublicTemplate";
import {EmailData} from "@src/Templates/Emails/EmailData";
import DefaultEmailTheme from "@src/Templates/Themes/DefaultEmailTheme";

const ApiRouter = express.Router();

// Would this print the doc or not ?
ApiRouter.get("/", async (req, res) => {

    /*const index = new PublicTemplate();//tempalte have already a default in the EmailContent.Prepare.
    const title:string = `${config.appName} (version ${config.version})`;
    let body:string = config.environnement === 'development' ? `écoute sur le port: ${config.port}<br />` : '';
    body += EmailData.api.description;
    res.set('Content-Type', 'text/html');
    return res.status(StatusCodes.OK).send(await index.render({
        context: {
            ...EmailData,//basic app and api default string and links
            ...DefaultEmailTheme,//basic theme for colors and sizes.
            title: `${title}`,
            body: `${body}`,
            meta: {
                title: `${title}`,
                description: `${body}`,
                author: `${config.appName}`
            }
        }
    }));*/
    return res.status(StatusCodes.OK).send("OK");
});



ApiRouter.get('/quarante-deux',async (req, res) => {

    const index42 = new PublicTemplate("quarante-deux");//tempalte have already a default in the EmailContent.Prepare.
    const title:string = `The Answer to the Ultimate Question of Life, the Universe, and Everything`;
    let body:string = '';
    res.set('Content-Type', 'text/html');
    return res.status(StatusCodes.OK).send(await index42.render({
        context: {
            ...EmailData,//basic app and api default string and links
            ...DefaultEmailTheme,//basic theme for colors and sizes.
            title: `${title}`,
            body: `${body}`,
            meta: {
                title: `${title}`,
                description: `${body}`,
                author: `${config.appName}`
            }
        }
    }));
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

ApiRouter.get("/sync-db", async (req, res) => {

    const index = new PublicTemplate("default");//tempalte have already a default in the EmailContent.Prepare.
    const title:string = `Synching db`;
    let body:string = 'Sync prod into staging data only.';

    res.set('Content-Type', 'text/html');
    return res.status(StatusCodes.OK).send(await index.render({
        context: {
            ...EmailData,//basic app and api default string and links
            ...DefaultEmailTheme,//basic theme for colors and sizes.
            title: `${title}`,
            body: `${body}`,
            meta: {
                title: `${title}`,
                description: `${body}`,
                author: `${config.appName}`
            }
        }
    }));
});

export {ApiRouter};