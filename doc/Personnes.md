Retour à la base de [Documention de l'API](documentation-api.md)

---

# Personnes

## URL définies

### POST `/personnes/create`

#### structure demandé
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
              "description": { "type": "string" }
          },
          "required": ["lastName","firstName"]
      },
      "required": ["data"]
  }
}
```

### POST `/personnes/update`

#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "objectID" },
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
              "description": { "type": "string" }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```


### POST `/personnes/search`
Il est possible d'utiliser les opérateurs gte (>=) et lte (<=) afin de trouver, par exemple, une date antérieure ou ultérieure à "X". On ajoute à ce moment `gte:` ou `lte:` avant le paramètre.

**Exemple :**
```json 
"data":{ "createdAt":"gte:2022-06-14" }
```
#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "objectID" },
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
              "description": { "type": "string" }
          }
      },
      "required": ["data"]
  }
}
```

### POST `/personnes/list`
Il est possible d'utiliser les opérateurs gte (>=) et lte. Voir `/personnes/search`.
#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "objectID" },
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
              "description": { "type": "string" }
          },
      },
      "required": ["data"]
  }
}
```

### POST `/personnes/delete`
#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "objectID" }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```

### POST `/personnes/getinfo`
Si une route est spécifiée (create, update, search, list, delete), les informations des champs seront retournée avec les règles de vérification des champs spécifique à la route, ainsi que les règles par défaut.
Sinon, les champs n'auront que les règles par défaut.
#### structure demandée
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