Retour à la base de [Documention de l'API](documentation-api.md)

# Personnes

## URL définies

### POST `/taxonomy/create`

#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "category": { "type": "string" },
              "name": { "type": "string" },
              "slug": { "type": "string" },
              "description": { "type": "string" },
              "source": { "type": "string" }
          },
          "required": ["category", "name", "slug"]
      },
      "required": ["data"]
  }
}
```

### POST `/taxonomy/update`

#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "ObjectId" },
              "category": { "type": "string" },
              "name": { "type": "string" },
              "slug": { "type": "string" },
              "description": { "type": "string" },
              "source": { "type": "string" }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```

### POST `/taxonomy/search`

#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "ObjectId" },
              "category": { "type": "string" },
              "name": { "type": "string" },
              "slug": { "type": "string" },
              "description": { "type": "string" },
              "source": { "type": "string" }
          }
      },
      "required": ["data"]
  }
}
```

### POST `/taxonomy/list`

#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "ObjectId" },
              "category": { "type": "string" },
              "name": { "type": "string" },
              "slug": { "type": "string" },
              "description": { "type": "string" },
              "source": { "type": "string" }
          }
      },
      "required": ["data"]
  }
}
```

### POST `/taxonomy/delete`
#### structure demandé
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

### POST `/taxonomy/getinfo`

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

### GET `/taxonomy/getdoc`
Renvoie ce fichier de documentation