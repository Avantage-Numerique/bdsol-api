

//  LOGIN

const jwt = require("jsonwebtoken");
api.post('/login', (req, res) => {

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
        const userConnectedToken = jwt.sign({ username: user.username,  role: user.role }, tokenSecret);

        res.json({
            userConnectedToken
        });
    } else {
        res.send({
            message: 'Vos informations de connection sont incorrect, vérifiez votre utilisateur et mot de passe.'//@todo Add this string to a string manager.
        });
    }
});