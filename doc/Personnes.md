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
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
              "description": { "type": "string" }
          },
          "required": ["lastName","firstName"]
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
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
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
Il est possible d'utiliser les opérateurs gte (>=) et lte (<=) afin de trouver, par exemple, une date antérieure ou ultérieure à "X". On ajoute à ce moment `gte:` ou `lte:` avant le paramètre.

**Exemple :**
```json 
"data":{ "createdAt":"gte:2022-06-14" }
```
#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "objectID" },
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
              "description": { "type": "string" }
          }
      },
      "required": ["data"]
  }
}
```


#### Retour

### POST `/personnes/list`
Il est possible d'utiliser les opérateurs gte (>=) et lte. Voir `/personnes/search`.
#### structure demandé
```json
{
  "type": "object",
  "properties": {
      "data": {
          "type": "object",
          "properties": {
              "id":{ "type": "objectID" },
              "lastName": { "type": "string" },
              "firstName": { "type": "string" },
              "nickname": { "type": "string" },
              "description": { "type": "string" }
          },
      },
      "required": ["data"]
  }
}
```


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
