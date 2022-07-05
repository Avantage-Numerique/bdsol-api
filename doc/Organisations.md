Retour à la base de [Documention de l'API](documentation-api.md)

---

# Organisations

## URL définies

### POST `/organisations/create`

#### structure demandée
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
              "fondationDate": {"type": "Date" }
          },
          "required": ["name"]
      },
      "required": ["data"]
  }
}
```

### POST `/organisations/update`

#### structure demandée
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id": { "type": "objectId" },
              "name": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "fondationDate": { "type": "Date" }
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
#### structure demandée
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id": { "type": "objectId" },
              "name": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "fondationDate": { "type": "Date" }
          }
      },
      "required": ["data"]
  }
}
```

### POST `/organisations/list`
Il est possible d'utiliser les opérateurs gte (>=) et lte. Voir `/organisations/search`.
#### structure demandée
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id": { "type": "objectId" },
              "name": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "fondationDate": { "type": "Date" }
          }
      },
      "required": ["data"]
  }
}
```

### POST `/organisations/delete`
#### structure demandée
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id": { "type": "objectId" }
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