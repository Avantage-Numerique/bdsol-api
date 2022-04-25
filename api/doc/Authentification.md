Retour à la base de [Documention de l'API](documentation-api.md)

---

# Authenficiation

## URL définies

### POST `/login`

#### structure demandé


#### Retour si tout a fonctionné
Code : **200** : lorsque les informations sont OK

```json
{
  "error": false,
  "userConnectedToken": "theJWTTOKEN signed",
  "code": 200,
  "errors": [],
  "message": "OK",
  "data": {
    "fields": {
      "username": true,
      "password": true
    }
  }
}
```

#### Retour s'il y aune erreur
Code : **401** : lorsque les informations ne sont pas OK.

```json
{
  "error": true,
  "userConnectedToken": null,
  "code": 401,
  "message": "Vos informations de connexion sont incorrectes, vérifiez votre utilisateur et mot de passe.",
  "fields": {
    "username": {
      "status": false,
      "message": ""
    },
    "password": {
      "status": false,
      "message": ""
    }
  }
}
```

### POST `/logout`

#### structure demandé


#### Retour