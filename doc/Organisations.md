Retour à la base de [Documention de l'API](documentation-api.md)

# Organisations

## URI définies

### POST `/organisations/create`

#### Structure demandéee
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "name": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "fondationDate": { "type": "Date" },
              "offer": { "type": ["ObjectId"] }
          },
          "required": ["name"]
      },
      "required": ["data"]
  }
}
```

### POST `/organisations/update`

#### Structure demandéee
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id": { "type": "ObjectId" },
              "name": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "fondationDate": { "type": "Date" },
              "offer": { "type": ["ObjectId"] }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```


### POST `/organisations/search`
Il est possible d'utiliser les opérateurs gte (>=) et lte (<=) afin de trouver, par exemple, une date antérieure ou ultérieure à "X". On ajoute à ce moment `gte:` ou `lte:` avant le paramètre.

**Exemple :**
```json 
"data":{ "fondationDate":"gte:2022-06-14" }
```
#### Structure demandéee
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id": { "type": "ObjectId" },
              "name": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "fondationDate": { "type": "Date" },
              "offer": { "type": ["ObjectId"] }
          }
      },
      "required": ["data"]
  }
}
```

### POST `/organisations/list`
Il est possible d'utiliser les opérateurs gte (>=) et lte. Voir `/organisations/search`.
#### Structure demandéee
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id": { "type": "ObjectId" },
              "name": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "fondationDate": { "type": "Date" },
              "offer": { "type": ["ObjectId"] }
          }
      },
      "required": ["data"]
  }
}
```

### POST `/organisations/delete`
#### Structure demandéee
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id": { "type": "ObjectId" }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```

### POST `/organisations/getinfo`

Si une route est spécifiée (create, update, search, list, delete), les informations des champs seront retournée avec les règles de vérification des champs spécifique à la route, ainsi que les règles par défaut.
Sinon, les champs n'auront que les règles par défaut.

#### Structure demandéee
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "route": { "type": "string",
                         "enum": ["create", "update", "list", "search", "delete"]
              }
          }
      },
      "required": ["data"]
  }
}
```


### GET `/organisations/:slug`

Renvoie une organisation identifiée à la slug précisée.

#### Structure demandéee
`:slug` Une chaine de caractère, sans accent, ni espace




### GET `/organisations/getdoc`
Renvoie ce fichier de documentation