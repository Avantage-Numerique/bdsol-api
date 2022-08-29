Retour à la base de [Documention de l'API](documentation-api.md)

# Taxonomies

## Implémenter pour l'instant 
- Occupations, slug : `occupations`
- Domains, slug : `domains`
- Abilities, slug : `abilities`
- Skills, slug : `skills`

## URI définies

### POST `/taxonomy/create`

#### Structure demandéee
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

#### Structure demandéee
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

#### Structure demandéee
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

#### Structure demandéee
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
#### Structure demandéee
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




### GET `/:taxonomy`

Renvoie toutes les taxonomies ajoutées dans la catégorie spécifiée par le paramètre :taxonomy.

#### Structure demandéee
`:taxonomy` Une chaine de caractère, sans accent, ni espace contenu dans les taxonomies implémentés pour l'instant.


### GET `/:taxonomy/:slug`

Renvoie une taxonomy contenu dans la taxonomy spécicifée.

#### Structure demandéee
`:taxonomy` Une chaine de caractère, sans accent, ni espace contenu dans les taxonomies implémentés pour l'instant.
`:slug` Une chaine de caractère, sans accent, ni espace contenu dans la BD et assigné à la taxonomy implémenté pour l'instant.



### GET `/taxonomy/getdoc`
Renvoie ce fichier de documentation