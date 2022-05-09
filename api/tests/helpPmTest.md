# Documentation d'aide des tests automatisé dans PostMan
[Documentation Postman](https://learning.postman.com/docs/writing-scripts/script-references/postman-sandbox-api-reference/)


## Base de l'objet ```pm``` (postman) les plus utilisés :

```javascript
//Retourne l'objet de réponse en Json *!*
const response = pm.response.json();
```
```javascript
//Ajoute une assertions (une condition de test)
pm.test('Test Name', function() {
    //Assertions ici exemple:
    pm.response.to.have.status(200);

    //Autres exemples ( const response = pm.response.json() ) :
    pm.expect(response.message).to.equal("OK");
    pm.expect(response.data.nom).to.equal("Jean-Marc");

    //Schéma défini dans la variable
    pm.expect(response).to.have.jsonSchema(schema);
});
```

- **Accéder aux informations de la réponse http**
`pm.response`
    - `.code` *:Number*
    - `.status` *:String*
    - `.headers` *:HeaderList*
    - `.responseTime` *:Number*
    - `.responseSize` *:Number*
    - `.text()` *:function -> String*
    - `.json()` *:function -> Object*


- **Accéder aux informations de la requête http**
`pm.request`
    - `.url`   *:Url*
    - `.headers` *:HeaderList*
    - `.method` *:String (http request method)*
    - `.body` *:RequestBody*

- **Accéder aux informations du script**
`pm.info`
    - `.todo()`

- **Accéder aux informations des cookies**
`pm.cookies`
    - `.has()`
    - `.get()`
    - `.toObject()`

## Base des variables dans postman :

Les variables dans postman sont disponible et utilisable dans différent scope afin de permettre aux différentes requêtes d'intéragir ensembles.

Pour faire appel à la valeur, on utilise `{{varName}}`

`pm.scope.action()`

### scope:
L'utilisation des variables se fait en ordre d'importance hiérarchique : 

`(global --> collection --> environnement --> data --> local)`

- `environment` Manipule les variables de l'environnement actif (présentement sélectioné).
- `variables` Manipule les variables dans les différent scopes.
- `collectionVariables` Manipule les variables de collections.
- `globals` Manipule les variables globales.
- `iterationData` Permet d'accéder et manipuler les variables d'un [data file](https://learning.postman.com/docs/running-collections/working-with-data-files/)

### action:
- `.has(variableName:string)` *:boolean (est dans le scope?)*
- `.get (variableName:string)` *:Retourne la valeur de la variable*
- `.set(variableName:string, variableValue:*)` :*function*

    **IMPORTANT! :** la valeur de la variable assignée par `pm.variables.set` ne persiste que dans l'exécution de la requête ou dans l'exécution d'une collection de requête.

- `.replaceIn("Hi, my name is {{firstName}} and I am {{age}}.");`

     *:Valeur résolue dynamiquement dans le script {{$VarName}}.*
- `.toObject()` *:Object contenant toute les variables du scope et leur valeurs.*
- `.unset(variableName:string)` *Retire la variable du scope.*
- `.clear()` *Retire toute les variables du scope.*


## Exemple de schéma
On peut spécifier le type de donnée qu'on s'attend dans le **json** et les assertions vérifieront chacun des types. `{ "type": "boolean" }`

[Autres vérification possibles](https://javascript.plainenglish.io/how-to-do-schema-validation-in-postman-d7209f4159d0)

```javascript
const schema = {
    "type": "object",
    "properties": {
        "error": { "type": "boolean" },
        "code": { "type": "number" },
        "message": { "type": "string" },
        "errors": { "type": "array" },
        "data":
        {
            "type": "object",
            "properties":
            {
                "_id": { "type": "string" },
                "nom": { "type": "string" },
                "prenom": { "type": "string" },
                "surnom": { "type": "string" },
                "description": { "type": "string" },
                "createdAt": { "type": "string" },
                "updatedAt": { "type": "string" }
            },
            "required": ["_id", "nom", "prenom", "surnom", "description", "createdAt", "updatedAt"]
        }
    },
    "required": ["error", "code", "message", "errors", "data"]
};
```

## Enchainement de test
On peut enchainer des tests :
`TODO`
postman.setNextRequest(requestName:String):Function ??? Probablement important.