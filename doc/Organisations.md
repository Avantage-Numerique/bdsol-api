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
              "contactPoint": { "type": "string" }
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
              "contactPoint": { "type": "string" }
          },
          "required": ["id"]
      },
      "required": ["data"]
  }
}
```

#### Retour

### POST `/organisations/search`
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
              "contactPoint": { "type": "string" }
          },
      },
      "required": ["data"]
  }
}
```

### POST `/organisations/list`
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
              "contactPoint": { "type": "string" }
          },
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
