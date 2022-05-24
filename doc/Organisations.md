Retour à la base de [Documention de l'API](documentation-api.md)

---

# Organisations

## URL définies

### POST `/organisations/create`

#### structure demandée
```json
{
  "data": {
    "nom": "string",
    "description": "string - long",
    "url": "string",
    "contactPoint": "string"
  }
}
```

#### Retour


### POST `/organisations/update`

#### structure demandée
```json
{
  "data": {
    "id": "objectId # ID unique de l'organisation à mettre à jour.",
    "nom": "string",
    "description": "string - long",
    "url": "string",
    "contactPoint": "string"
  }
}
```


#### Retour
