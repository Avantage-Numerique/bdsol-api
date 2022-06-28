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
              "nom": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "dateDeFondation": {"type": "Date" }
          },
          "required": ["nom"]
      },
      "required": ["data"]
  }
}
```

#### Retour


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
              "nom": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "dateDeFondation": { "type": "Date" }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```

#### Retour

### POST `/organisations/search`
Il est possible d'utiliser les opérateurs gte (>=) et lte (<=) afin de trouver, par exemple, une date antérieure ou ultérieure à "X". On ajoute à ce moment `gte:` ou `lte:` avant le paramètre.

**Exemple :**
```json 
"data":{ "dateDeFondation":"gte:2022-06-14" }
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
              "nom": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "dateDeFondation": { "type": "Date" }
          }
      },
      "required": ["data"]
  }
}
```
#### Retour

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
              "nom": { "type": "string" },
              "description": { "type": "string" },
              "url": { "type": "string" },
              "contactPoint": { "type": "string" },
              "dateDeFondation": { "type": "Date" }
          }
      },
      "required": ["data"]
  }
}
```


#### Retour

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
