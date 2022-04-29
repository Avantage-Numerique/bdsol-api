Retour à la base de [Documention de l'API](documentation-api.md)

---

# Personnes

## URL définies

### POST `/personne/create`

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


### POST `/personne/update`

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


### POST `/personne/search`

#### structure demandé
```json
{
  "data": {
    "id": "objectId # ID unique de la personne à rechercher.",
    "nom": "string",
    "prenom": "string",
    "surnom": "string",
    "description": "string - long"
  }
}
```


#### Retour

### POST `/personne/list`

#### structure demandé
```json
{
  "data": {
    "id": "objectId # ID unique de la personne à rechercher.",
    "nom": "string",
    "prenom": "string",
    "surnom": "string",
    "description": "string - long"
  }
}
```


#### Retour
