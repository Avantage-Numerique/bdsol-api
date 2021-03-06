# L'API de la BDSOL

## Installation de l'api et du frontend en `dev`
[Voir le répertoire pour la bdsol workspace](https://github.com/Avantage-Numerique/bdsol-workspace)

### Démarrer l'environnement de travail.
1. `docker compose up`

Note : Docker compose up, fait déjà un build en soit. Mais la première fois, c'est un peu plus prudent de regarder le processus de *build* via cette commande.

##### Pour voir la BD
La base de donnée est en MongoDB. MongoDB fournis un outils open source pour consulter et interagir avec la BD<br>
[Compass](https://www.mongodb.com/products/compass)

###### MongoDB notes
Lorsqu'on exécute des commandes entre les conteneurs, dans l'environnement Docker, le port est `27017`. <br>
Lorsqu'on interagi avec la base de données à l'extérieur de Docker, dans votre OS par exemple, le port ouvert est `27018`.

###### L'adresse de connexion pour *Compass*
```url
mongodb://localhost:27018/?readPreference=primary&appname=mongo&directConnection=true&ssl=false
```
### Travailler sur le frontend
[Voir le répertoire pour la bdsol workspace](https://github.com/Avantage-Numerique/bdsol-workspace)


---
## Utilisation de l'API

### Code de succès et d'erreur

Les codes d'erreurs et de succès sont basés sur les standards HTTP.
[Voir les codes sur la documentation de Mozilla](https://developer.mozilla.org/fr/docs/Web/HTTP/Status).

#### Intégration de librairy
Pour gérer mieux les erreurs HTTP : voir : https://www.npmjs.com/package/http-status-codes

### Documentation des retours d'erreurs des points de terminaison à l'API (endpoints)

[Voir la documentation des URI définis.](api/doc/documentation-api.md)

### Début du travail pour les point de terminaison CRUD

Code : **202** : Tout est ok, mais le serveur n'a pas terminé<br>
À voir si on le garde, présentement dans le Service abstrait.
[Code 202 pour HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/202)

Code : **404** : lorsqu'on ne trouve pas ce qui a été demandé<br>
Dans les services, présentement dans la méthode : `delete`, si l'item demandé n'existe pas.

Code : **500** : une erreur est survenue

```json
{
  "error": true,
  "code": 500,
  "message": "string",
  "errors": "errors objects"
}
```


### * La logique derrière les code HTTP

- 1xx: Information
- 2xx: Succès
- 3xx: Redirection
- 4xx: Client Erreur
- 5xx: Server Erreur

### Objet de requête bâti par express js
[Documentation](https://expressjs.com/fr/api.html)
* On utilise `req.body`

---
# Outils pour coordonner le développement
Version 0.0.5 : on a décidé d'utiliser Docker pour garder les containers séparés, mais toujours dans le même environnement.

## Plan de travail
- [X] Établir un environnement reproduisable pour bien testé le front-end et le backend.
- [X] établir les dépendances et restrictions de versions : **[Node](https://nodejs.org/fr/) 16 pour l'api et l'app**
    - [X] Ports **`3000` frontend** et **`8000` pour API**
    - [X] Environnement / Type de serveurs : Node pour les deux, [mongodb](https://www.mongodb.com/fr-fr) pour l'instant comme engin de base de données.
    - [ ] Gestion des versions et des dépendances à venir pour l'API

## Objectifs
1. Collaborer dans la mise en place de ces dépendances dans tout le `stack` de l'application.
2. Permettre la prise en main du développement plus rapide et mieux communiquer entre développeurs.
3. Planifier et déterminer les besoins en développement pour mieux préparer l'intégration continue (CI) en staging et en production.

## Testing
En cours de recherche, nos choix technologiques de l'application on dicté ces pistes :
1. **Le front-end étant en nextjs** <br>[Jest](https://jestjs.io/) est le moteur de test établi dans [nextjs](https://nextjs.org/) pour les tests du framework. Donc il serait le choix #1.
2. **L'API est en** [expressjs](https://expressjs.com/fr/). On a le choix de [plusieurs librairies de tests](#recherche-pour-les-tests).

### Recherche pour les tests
Une des sources intéressantes sur le sujet : https://medium.com/serverlessguru/how-to-unit-test-with-nodejs-76967019ba56

#### À faire
- [ ] Faire la comparaison des features : async, components, url, backend, etc.

#### Élagage des outils disponibles

##### Test suits
- [Jest](https://jestjs.io/)
    - [Enzyme](https://enzymejs.github.io/enzyme/) : test components output more easily
- [Chai](https://www.chaijs.com/)
- [Mocha](https://mochajs.org/)
- [Cucumber)(https://www.elliotdenolf.com/posts/cucumberjs-with-typescript/)] Outil plus facile d'accès pour écrire des tests de façon intelligible.

##### Behavioural testing
- [Jasmine](https://jasmine.github.io/pages/getting_started.html)

##### Test MongoDB
- Regarde : https://www.npmjs.com/package/mockingoose


## À faire
- [ ] Contrat pour les requêtes aux services
    - [ ] Abstrait pour fonctionner avec tous les services ?
- [ ] Tests à faire API
    - [ ] Endpoint Login positif, négatif
    - [ ] Fake db driver
    - [ ] 
- [ ] Ajout d'un système de traduction pour les strings statique
- [ ] Ajout d'un système de traduction pour la structure de données.