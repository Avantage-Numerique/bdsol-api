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
              "nom": { "type": "string" },
              "prenom": { "type": "string" },
              "surnom": { "type": "string" },
              "description": { "type": "string" }
          },
          "required": ["nom","prenom"]
      },
      "required": ["data"]
  }
}
```

#### Retour


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
              "nom": { "type": "string" },
              "prenom": { "type": "string" },
              "surnom": { "type": "string" },
              "description": { "type": "string" }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```


#### Retour


### POST `/personnes/search`

#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "objectID" },
              "nom": { "type": "string" },
              "prenom": { "type": "string" },
              "surnom": { "type": "string" },
              "description": { "type": "string" }
          }
      },
      "required": ["data"]
  }
}
```


#### Retour

### POST `/personnes/list`

#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "objectID" },
              "nom": { "type": "string" },
              "prenom": { "type": "string" },
              "surnom": { "type": "string" },
              "description": { "type": "string" }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```


#### Retour
### POST `/personnes/list/all`

#### structure demandé
aucun paramètre dans le post est nécessaire.


#### Retour


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