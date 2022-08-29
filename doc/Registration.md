Retour à la base de [Documention de l'API](documentation-api.md)


# Registration

## POST `/register`

### Structure demandée

```json
{
    "data": {
        "username": { "type": "string", "req1uired": true, "unique": true },
        "email": { "type": "string", "req1uired": true, "unique": true },
        "password": { "type": "string", "req1uired": true },
        "avatar": { "type": "string" },
        "name": { "type": "string" },
        "role": { "type": "string" }
    }
}
```

### Retour si tout a fonctionné

Code : **200** : lorsque les informations sont OK

```json
{
    "error": false,
    "code": 200,
    "errors": [],
    "message": "OK",
    "data": {
        "user": {
            "username": "string",
            "avatar": "string:url",
            "name": "string"
        }
    }
}
```

### Retour s'il y aune erreur

Code : **401** : lorsque les informations ne sont pas OK.

```json
{
    "error": true,
    "code": 401,
    "message": "Vos informations de connexion sont incorrectes, vérifiez votre utilisateur et mot de passe.",
    "data": {
        "user": {
            "token": "undefined"
        }
    }
}
```