Retour à la base de [Documention de l'API](readme.md)

# Utilisateurs (users)

## URL définies

### POST `/users/create`

#### Structure demandée
```json
{
    "type": "object",
    "properties": {
        "data": {
            "type": "object",
            "properties": {
                "username": { "type": "string" },
                "email": { "type": "string" },
                "password": { "type": "string" },
                "avatar": { "type": "string" },
                "name": { "type": "string" },
                "lastName": { "type": "string" },
                "firstName": { "type": "string" },
                "role": { "type": "string" }
            },
            "required": ["username", "email", "password"]
        },
        "required": ["data"]
    }
}
```

### POST `/users/update`

#### Structure demandée

```json
{
    "type": "object",
    "properties": {
        "data": {
            "type": "object",
            "properties": {
                "id":{ "type": "objectID" },
                "username": { "type": "string" },
                "email": { "type": "string" },
                "password": { "type": "string" },
                "avatar": { "type": "string" },
                "name": { "type": "string" },
                "lastName": { "type": "string" },
                "firstName": { "type": "string" },
                "role": { "type": "string" }
            },
            "required": ["id"]
        },
        "required": ["data"]
    }
}
```

### POST `/users/getinfo`
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