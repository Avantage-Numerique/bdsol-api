Retour à la base de [Documention de l"API](readme.md)

# Médias 
Présentement utilisé seulement dans les licences médias.
Implémenté dans le domaine StaticContent.

Présentement les données sont entré et fetch directement dans un json.

## GET `/medias/:entity/:id/:fileName`
Get du média afin d"être vue dans le browser.

### Retour si tout a fonctionné

Code : **200** : lorsque les informations sont OK<br>
**Renvoie le fichier visible dans le browser.**


## GET `/medias/data/:id`
Route publique qui renvoie les données médias grâce au id du média.

### Retour si tout a fonctionné

Code : **200** : lorsque les informations sont OK

```json
{
    "error": false,
    "code": 200,
    "message": "OK",
    "errors": {},
    "data": {
        "title": "nerferino le pas beau",
        "alt": "un gun nerf steampunk",
        "description": "",
        "path": "./localStorage/public/persons/63e400c93cd9fd5e5379d35a",
        "url": "/medias/persons/63e400c93cd9fd5e5379d35a/mainImage--512538-avatar-embleme-clementine-peel-sur-blanc.png",
        "licence": "",
        "fileType": "image",
        "fileName": "mainImage--512538-avatar-embleme-clementine-peel-sur-blanc",
        "extension": "png",
        "slug": "[ADDED in APP single view from the target ID]",
        "entityId": "63e400c93cd9fd5e5379d35a",
        "entityType": "persons",
        "uploadedBy": "",
        "status": {
            "state": "pending",
            "_id": "63ed521dadb068ff8b782ff6"
        },
        "createdAt": "2023-02-15T21:43:57.879Z",
        "updatedAt": "2023-02-15T21:43:57.879Z"
    }
}
```