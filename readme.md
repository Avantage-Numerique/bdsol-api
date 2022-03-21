# L'API de la BDSOL

## Code de succès et d'erreur

Les codes d'erreurs et de succès sont basé sur les standards HTTP.
[Voir les codes sur la documentation de Mozilla](https://developer.mozilla.org/fr/docs/Web/HTTP/Status).

### Codes implémentés

#### /login

##### Code : **200** : lorsque les informations sont OK

```json
{
  "userConnectedToken": "theJWTTOKEN signed",
  "code": 200,
  "message": "OK",
  "fields": {
    "username": true,
    "password": true
  }
}
```

##### Code : **401** : lorsque les informations ne sont pas OK.

```json
{
  "userConnectedToken": null,
  "code": 401,
  "message": "Vos informations de connection sont incorrect, vérifiez votre utilisateur et mot de passe.",
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

### Un résumé :

- 1xx: Information
- 2xx: Succès
- 3xx: Redirection
- 4xx: Client Erreur
- 5xx: Server Erreur
