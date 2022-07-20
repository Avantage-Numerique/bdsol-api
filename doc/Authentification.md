Retour à la base de [Documention de l'API](documentation-api.md)

# Authenficiation

## POST `/login`

### structure demandé

```json
{
    "username": "string",
    "password": "string"
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
            "token": "string",
            "username": "string",
            "avatar": "string:url",
            "name": "string",
            "id": "string"
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

---

## POST `/verify-token`

### structure demandé

```json
{
    "token": "string"
}
```

### Retour si tout a fonctionné

Code : **200** : lorsque le token est valide

```json
{
    "error": false,
    "code": 200,
    "errors": [],
    "message": "OK",
    "data": {}
}
```
Note ici on pourrait ajouter une information sur le nombre de temps qu'il reste au token ?


### Retour s'il y aune erreur

Code : **401** : lorsque le token n'est pas valide

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

Code : **501** : Changer le driver dans le fichier `.env`.

---
## POST `/logout`

Cette fonction n'est pas implémenté encore. l'url retourne toujours cette réponse positive pour l'instant.

```json
{
    "error": false,
    "code": 200,
    "message": "Vos informations de connexion sont incorrectes, vérifiez votre utilisateur et mot de passe.",
    "data": {
        "user": {
            "token": "undefined"
        }
    }
}
```

### structure demandé

```json
{
    "username": "string"
}
```

### Retour