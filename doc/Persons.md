Retour à la base de [Documention de l'API](readme.md)

# Persons

## URL définies

### POST `/persons/create`

#### Structure demandée
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
              "description": { "type": "string" },
              "occupation": { "type": ["ObjectId"] }
          },
          "required": ["lastName","firstName"]
      },
      "required": ["data"]
  }
}
```

### POST `/persons/update`

#### Structure demandée
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "ObjectId" },
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
              "description": { "type": "string" },
              "occupation": { "type": ["ObjectId"] }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```


### POST `/persons/search`
Il est possible d'utiliser les opérateurs gte (>=) et lte (<=) afin de trouver, par exemple, une date antérieure ou ultérieure à "X". On ajoute à ce moment `gte:` ou `lte:` avant le paramètre.

**Exemple :**
```json 
"data":{ "createdAt":"gte:2022-06-14" }
```
#### Structure demandée
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "ObjectId" },
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
              "description": { "type": "string" },
              "occupation": { "type": ["ObjectId"] }
          }
      },
      "required": ["data"]
  }
}
```

### POST `/persons/list`
Il est possible d'utiliser les opérateurs gte (>=) et lte. Voir `/persons/search`.
#### Structure demandée
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "ObjectId" },
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
              "description": { "type": "string" },
              "occupation": { "type": ["ObjectId"] }
          }
      },
      "required": ["data"]
  }
}
```

### POST `/persons/delete`
#### Structure demandée
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "ObjectID" }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```

### POST `/persons/getinfo`

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



### GET `/persons/:slug`

Renvoie une person identifiée à la slug précisée.

#### Structure demandéee
`:slug` Une chaine de caractère, sans accent, ni espace



### GET `/persons/getdoc`
Renvoie ce fichier de documentation