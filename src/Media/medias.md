# Médias

Domaine de gestion des médias pour l'API. Implémentation pour Image en premier.

## Données qu'on receuille et possible.

```json
{
    "title": "String",
    "alt": "String",
    "description": "String",
    "path": "String",
    "url": "String",
    "licence": "String (Enum - LicenceList)",
    "fileType": "String (Enum, MimeType)",
    "fileName": "String",
    "extension": "String (Enum fileExtensionList)",
    "slug": "String",
    "entityId": "String (objectId)",
    "entityType": "String",
    "uploadedBy": "String (objectId)",
    "dbStatus": "String [ in use, archived, to delete, pending ]",
    "meta": {},
    "timestamps": {}
}
```

Notez que les fichiers ont des données en exif d'inclus.

## Plan d'implémentation

- [x] Ajouter la route pour get un fichier afin que l'API devienne le CDN de ce fichier.
    - [x] Déterminer le patern de l'URI `/:entity/:id/:fileName`
- [x] Ajouter le chemin pour querir les données sur le médias
    - [x] L'ajouter avec un slug ? Présentement fait avec un ID.
