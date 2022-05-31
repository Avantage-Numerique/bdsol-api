Retour à la base de [Documention de l'API](documentation-api.md)

---

# Authenficiation

## URL définies

### POST `/login`

#### structure demandé
```json
{
  "username": "string",
  "password": "string"
}
```

#### Retour si tout a fonctionné
Code : **200** : lorsque les informations sont OK

```json
{
  "error": false,
  "code": 200,
  "errors": [],
  "message": "OK",
  "data": {
    "user": {
      "token": "string"
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
  "data": {
      "user": {
          "token": "undefined"
      }
  }
}
```

### POST `/logout`
Cette fonction n'est pas implémenté encore. l'url retourne toujours cette réponse pour l'instant.

```json
{
  "error": false,
  "code": 200,
  "message": "Vos informations de connexion sont incorrectes, vérifiez votre utilisateur et mot de passe.",
  "data": {
      "user": {
          "token": "string"
      }
  }
}
```

#### structure demandé
```json
{
  "username": "string"
}
```


#### Retour