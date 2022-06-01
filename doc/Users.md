Retour à la base de [Documention de l'API](documentation-api.md)

---
# Utilisateurs (users)

## URL définies

### POST `/users/create`

#### structure demandé
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
                "role": { "type": "string" }
            },
            "required": ["username", "email", "password"]
        },
        "required": ["data"]
    }
}
```

#### Retour


### POST `/users/update`

#### structure demandé

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
                "role": { "type": "string" }
            },
            "required": ["id"]
        },
        "required": ["data"]
    }
}
```


#### Retour