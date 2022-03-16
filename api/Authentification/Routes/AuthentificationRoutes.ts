import express from "express";
import config from '../../config';
import * as jwt from 'jsonwebtoken';
import users from '../Models/UserModel';

// add { mergeParams: true } to get the main route params.
const AuthentificationRouter = express.Router();

//  LOGIN
AuthentificationRouter.get('/login', (req, res) => {
    console.log('[WARNING] trying to access login with get method');
    return res.send('There is no place in eightyworld for login.');
});

AuthentificationRouter.post('/login', (req, res) => {

    const { username, password } = req.body;
    console.log(req.body);

    // add encryption on send form till checking here.
    console.log(`${username} trying to connect ...`);

    // TEMP DB BYPASS to make this working quicker.
    const user = users.find(
        u => { return u.username === username && u.password === password }
    );

    if (user) {

        console.log(`Les infomration de ${username} fonctionne, generating the JWT ...`);

        // Generate an access token
        const userConnectedToken = jwt.sign({ username: user.username,  role: user.role }, config.tokenSecret);

        res.json({
            userConnectedToken
        });

    } else {
        res.send({
            message: 'Vos informations de connection sont incorrect, vérifiez votre utilisateur et mot de passe.'//@todo Add this string to a string manager.
        });
    }
});

export default AuthentificationRouter;