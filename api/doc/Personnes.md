Retour à la base de [Documention de l'API](documentation-api.md)

---

# Personnes

## URL définies

### POST `/personnes/create`

#### structure demandé
```json
{
  "data": {
    "nom": "string",
    "prenom": "string",
    "surnom": "string",
    "description": "string - long"
  }
}
```

#### Retour


### POST `/personnes/update`

#### structure demandé
```json
{
  "data": {
    "id": "objectId # ID unique de la personne à mettre à jour.",
    "nom": "string",
    "prenom": "string",
    "surnom": "string",
    "description": "string - long"
  }
}
```


#### Retour