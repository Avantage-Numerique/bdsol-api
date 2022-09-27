import express from "express";
import { EndOfLineState } from "typescript";

const ApiRouter = express.Router();

// Would this print the doc or not ?
ApiRouter.get("/", async (req, res) => {
    const version = process.env.VERSION || 'not set';
    const port = process.env.PORT || 'not set';
    res.send(`BDSOL API (version ${version}) écoute sur le port: ${port}`)//@todo create a default get html return.
});

// Could be usefull to get the up status here.
ApiRouter.get("/test", async (req, res) => {
    res.send(`Testing ...`);
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
})

export {ApiRouter};