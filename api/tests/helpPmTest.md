# Documentation d'aide sur les tests automatisé dans PostMan
[Documentation Postman](https://learning.postman.com/docs/writing-scripts/script-references/postman-sandbox-api-reference/)

[Chainer les scripts](https://learning.postman.com/docs/running-collections/building-workflows/)

[Collection Runner](https://learning.postman.com/docs/running-collections/intro-to-collection-runs/)

[Structure des scripts Postman](https://learning.postman.com/docs/writing-scripts/intro-to-scripts/)

Syntaxe utilisée par l'objet postman `pm`<br>
[Syntaxe ChaiJS expect BDD ](https://www.chaijs.com/api/bdd/)


## Base de l'objet `pm` (postman) les plus utilisés :
Premièrement, il est important de se définir une variable contenant la réponse de l'api en json et de la convertir en objet javacript pour la manipuler. <br>
On effectue l'opération qui suit :
```javascript
//Retourne la réponse json en objet javascript !
const jsonResponse = pm.response.json();
//Même possible de faire ceci
const jsonData = jsonReponse.data;
```
Ayant maintenant un objet à manipuler, il est possible de faire plusieurs assertions pour vérifier différente propriété.<br>
Voici plusieurs **cas d'utilisation** d'assertions :

```javascript
//Ajoute un test
pm.test('Test Name', function() {
    //Assertion directement avec la réponse :
    pm.response.to.have.status(200);

    //Assertion 'expect' avec la variable assignée plutôt.
    pm.expect(jsonResponse.message).to.equal("Création de l'item réussi");
    pm.expect(jsonData.nom).to.equal("Jean-Marc");

    //Assertion 'to have/not/below/be/include'
    pm.response.to.not.be.error;
    pm.response.to.have.jsonBody('');
    pm.response.to.not.have.jsonBody('error');
    pm.expect(pm.response.responseTime).to.be.below(200); //Performance test
    pm.expect(jsonData.form.customerName).to.not.include("examplePassword"); //(postman-> intro/API tests/SQL injection security check)
    
    //Format (Voir l'utilisation de schéma!)
    pm.expect(jsonData).to.be.an('object');
    pm.expect(jsonData.nom).to.be.a('string');

    //Schéma prédéfini dans la variable 'schema'
    pm.expect(response).to.have.jsonSchema(schema);
});
```
Assertion sur une fonction **async** :
```javascript
pm.test('async test', function (done) {
  setTimeout(() => {
    pm.expect(pm.response.code).to.equal(200);
    done();
  }, 1500);
});
```
### À noté :
- `pm.response.to.have.status(201);` renverra la réponse --> 

        AssertionError: expected response to have status code 201 but got 200
- `pm.expect(pm.response.code).to.equal(201);` renverra la réponse -->
    
        AssertionError: expected 200 to equal 201
- `pm.expect(false, 'nooo why fail??').to.be.ok;` *(noter le message d'erreur personnalisé)* renverra la réponse -->

        AssertionError: nooo why fail??: expected false to be truthy

Il sera pertinent d'utiliser différentes fonctions `pm.test` pour séparer des sections d'assertions. Par exemple, une pour valider le status de retour, une autre le schéma et les données etc. Cela permettra de cibler plus facilement l'erreur en cause d'un test échoué.

## Certaines méthodes/attributs de l'objet `pm` 
- **Accéder aux informations de la réponse http**
`pm.response`
    - `.code` *:Number*
    - `.status` *:String*
    - `.headers` *:HeaderList*
    - `.responseTime` *:Number*
    - `.responseSize` *:Number*
    - `.text()` *:function --> String*
    - `.json()` *:function --> Object*


- **Accéder aux informations de la requête http**
`pm.request`
    - `.url` *:Url*
    - `.headers` *:HeaderList*
    - `.method` *:String (http request method)*
    - `.body` *:RequestBody*

- **Accéder aux informations du script**
`pm.info`
    - `.requestId`

- **Accéder aux informations des cookies**
`pm.cookies`
    - `.has(variableName:String)`
    - `.get(variableName:String)`
    - `.toObject()`

## Base des variables dans postman :
Au dessus du menu de droite se trouve un **icone d'oeil** où il est possible d'observer et de modifier les variables d'environnement et global.

Les variables dans postman sont disponible et utilisable dans différent scope afin de permettre aux différentes requêtes d'intéragir ensembles.

Pour faire appel à la valeur d'une variable, on utilise `{{varName}}`

Cette structure permet d'effectuer des actions sur les variables : `pm.scope.action()`

### scope:
L'utilisation des variables se fait en ordre d'importance hiérarchique *(si une variable possède le même nom dans plusieurs scope)* : 

`(global --> collection --> environnement --> data --> local)`

- `environment` Manipule les variables de l'environnement actif (Détruit après l'exécution du Runner?).
- `variables` Manipule les variables dans les différent scopes.
- `collectionVariables` Manipule les variables de collections.
- `globals` Manipule les variables globales.
- `iterationData` Permet d'accéder et manipuler les variables d'un [data file](https://learning.postman.com/docs/running-collections/working-with-data-files/)

### action:
- `.has(variableName:string)` *:boolean (est dans le scope?)*
- `.get (variableName:string)` *:Retourne la valeur de la variable*
- `.set(variableName:string, variableValue:*)` :*function*

    **IMPORTANT ! :** la valeur de la variable assignée par `pm.variables.set` ne persiste que dans l'exécution de la requête ou dans l'exécution d'une collection de requête.

- `.replaceIn("Hi, my name is {{firstName}} and I am {{age}}.");`

     *:Valeur résolue dynamiquement dans le script {{$VarName}}.*
- `.toObject()` *:Object contenant toute les variables du scope et leur valeurs.*
- `.unset(variableName:string)` *Retire la variable du scope.*
- `.clear()` *Retire toute les variables du scope.*

### Exemples d'utilisation de variables :
Voici l'utilisation typique fait lors de requête chainée :
- Dans la requête **create**, on insère dans la BD des données. On vérifie d'abord l'exactitude de celle-ci dans la réponse et on crée ensuite nos variables d'environnement en les assignant pour les utilisé lors d'autre requête.
- Dans la requête **get (search)**, on peut rechercher les informations inserée lors du create et en vérifier l'exactitude.
- Dans la requête **Delete**, on peut tenter de rechercher l'item que l'on vient de supprimer et s'assurer qu'il n'existe plus.
- Dans la requête **Update**, Appliquer une modification sur des données et voir si les données ont changé.
```javascript
//Exécuter lors d'un create
pm.environment.set("itemId", jsonResponse.item_id);
pm.environment.set("itemName", jsonResponse.name);

//Assertion dans le "get" (search)
pm.test("Item name is correct", function () {
    let response = pm.response.json();
    let savedItemName = pm.environment.get("itemName");
    pm.expect(response.name).to.equal(savedItemName);
});

//Assertion dans le Delete
pm.test("Cart does not include deleted item", function () {
    let savedItemId = pm.environment.get("itemId");
    pm.response.to.not.include(savedItemId);    
});

```

## Schémas
Lorsqu'on bâtit un *schéma*, il est **important de le vérifier** en s'assurant qu'il n'y ait aucune erreur de syntaxe. Auquel cas, les assertions afficheront toujours réussi/échoué.

### Data Types :

Il est possible de spécifier le type de donnée attendu dans le **json** en ajoutant `{ "type": "data_type" }` dans la valeur.<br>
**À noté :** Cette vérification ne s'effectue que si le paramètre est présent. On doit, en complément, ajouter que le champs est requis.

- Number
- String
- Boolean
- Array
- Value *(any?)*
- Object *(clé:valeur)*
- Whitespace <!-- Je met un doute sur Whitespace. -->
- null

### Requis / Required :

Il est aussi possible de spécifier si un champs est **requis** en ajoutant `"required":[]` suivant la structure dans laquelle l'élément est requis.

### Autre vérification possible :
- exclusiveMinimum / exclusiveMaximum
- minimum / maximum
- minlength / maxlength
- pattern *(regex check)*

[Documentation sur la structure du schéma json](https://www.tutorialspoint.com/json/json_schema.htm)

[Exemple d'utilisation](https://javascript.plainenglish.io/how-to-do-schema-validation-in-postman-d7209f4159d0)

### Assertion du schéma
Si l'on construit un schéma et effectue l'assertion `pm.expect(response).to.have.jsonSchema(schema);`, on observera une erreur si les types spécifiés sont erronés ou les champs requis sont manquants.

Voici un exemple de schéma de base :

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
On peut enchainer les tests et même boucler sur le même test. On utilise `postman.setNextRequest(requestName:String):Function` ou bien on peut aussi spécifié `(requestId:String)`.

Avant de se lancer dans les enchainements de tests voici quelques points important :

- setNextRequest n'a **pas d'impact** si la requête est envoyée avec "Send". La fonction est opérationnelle **seulement** lors de l'utilisation du **Runner Postman**.

- Seule la dernière valeur ajoutée dans "setNextRequest" s'effectuera (s'il y en a plusieurs. Par exemple, dans un pre-test, et une dans le test).

- La fonction s'effectuera toujours comme dernière action dans le bloc de code même si du code se trouve après.

- Si l'on passe le nom de la requête en cours, elle loopera sur elle même **indéfiniement**. Il est important d'ajouter une condition d'arrêt.

- `postman.setNextRequest(null)` Arrête l'execution de collection.

- Limité aux test contenu dans le même fichier (Personne/Create/ "only those").

### Exemple d'utilisation et condition d'arrêt

Il est possible d'utiliser plusieurs façon de faire. Le **Body** de la requête peut être par exemple ceci :
```json
{
    "data":{
        "nom": "{{v_nom}}",
        "prenom":"{{v_prenom}}",
        "surnom":"{{v_surnom}}",
        "description":"{{v_description}}"
    }
}
```
Cette implémentation utilisera donc 4 variables d'environnement et on devra manuellement gérer les 4. Celle-ci peut être intéressante et pratique.

Cependant, il semble plus facile de gérer une seule variable. On utilisera donc cette implémentation qui n'utilise qu'une seule variable.

```json
{
    "data":{{v_data}}
}
```
On manipulera une seule variable qui sera un objet Javascript. Cette implémentation nécessite que l'on convertisse notre objet Javascript en Json. On l'effectue de cette façon :
```javascript
let v_data = {};
v_data.nom = "de Martineau";
v_data.prenom = "Yannick";

/*(Objet javascript)
    v_data =
    {
        nom : "de Martineau",
        prenom : "Yannick"
    }
*/
pm.environment.set("v_data", JSON.stringify(v_data));

/*variable d'environnement
  v_data =
  {
      "nom" : "de Martineau",
      "prenom" : "Yannick"
  }
*/
```

Voici une implémentation pour boucler plusieurs fois sur la même requête (un create multiple users) :

*Requête "CreateMultiple" Section Pre-request Script*
```javascript
const tableNom = ["Falconne", "Falconne", "Yitubi"];
const tablePrenom = ["Jimmy", "Theresa", "Markiplier"];
const tableSurnom = ["Jimmy", "Bimbo", "Mark"];
const tableDescription = ["Grand Mafioso et traitre au grand coeur", "Fille du mafieux", "Youtubeur"];

if(!pm.environment.has("index"))
    pm.environment.set("index", Number(0));

const index = pm.environment.get("index");
let v_data = {};
v_data.nom = tableNom[index];
v_data.prenom = tablePrenom[index];
v_data.surnom = tableSurnom[index];
v_data.description = tableDescription[index];

pm.environment.set("v_data", JSON.stringify(v_data));
```
**La requête s'execute et insère une nouvelle personne dans la BD**

*La requête arrive dans la section Test*
```javascript
let index = Number(pm.environment.get("index"));
console.log("Itération numéro " + index);

//Assertions de vérification du create
//pm.test("Validation des données", [...]

//Si nous devons faire d'autre create
if ( NextCreate() )
    postman.setNextRequest("CreateMultiple");
else
{
    // We've gone through all the create
    console.log("No more create to do!");
    postman.setNextRequest(null); //Ou setNextRequest(autre requête)
}

function NextCreate(){
    //Incrémentation
    index++;
    //Met à jour la variable d'environnement
    pm.environment.set("index", index);

    //CONDITION D'ARRÊT!!!
    const nbrDeBoucle = 3;
    if (index < nbrDeBoucle)
        return true
    else
        return false;
}
```
Ayant incrémenter l'index dans les variables d'environnement. Lorsque Postman effectuera de nouveau le create, il prendra les valeurs contenu dans l'index suivant et créera une personne différente.

On peut aussi insérer dans une variable d'environnement le "id" de création qui a été retourné par le serveur comme réponse au create et s'en servir pour une prochaine requête update, search ou delete.