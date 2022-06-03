# Documentation d'utilisation pour l'API
version 0.0.5

## Table des matières
- [Authentification](Authentification.md)
- [Utilisateurs](Users.md)
- [Personnes](Personnes.md)


## Structure général des retours de données

```json
{
    "type": "object",
    "properties": {
        "error": { "type": "boolean" },
        "code": { "type": "number" },
        "message": { "type": "string" },
        "errors": { "type": "array" },
        "data": {
            "type": "object",
            "properties": {

            },
        }
    },
    "required": ["error", "code", "message", "errors", "data"]
}

```
- `error`: Boolean : true == il y a une erreur, false == Il n'a pas d'erreur. Data contient ce qui a été demandé.
- `code`: int : Code http du retour
- `message`: string : message
- `errors`: array : S'il y a des erreurs elles seront contenu dans ce Array.
- `data`: object : Les données à transmettre s'il n'y a pas eu d'erreur.