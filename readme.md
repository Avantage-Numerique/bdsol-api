# L'API de la BDSOL

## Installation de l'api et du frontend en `dev`

Les directives assument que vous vous rendez au bon endroit sur votre disque dur de travail, afin d'effectuer les commandes.

1. Déterminer l'endroit sur votre environnement pour cloner et installer le projet.
2. Se rendre dans le dossier cloner du projet `cd chemin/vers/votre/env/dev`
3. `git clone https://github.com/Avantage-Numerique/bdsol-api.git ./`
4. Il faut ensuite installer les package de l'API : `cd ./api` et ensuite `npm install`
5. Il faut ensuite installer les package du frontend : `cd ./frontend` et ensuite `npm install`

## Démarrer l'environnement de travail.

### Sans Docker

1. Démarrer l'api en mode dev : `cd ./api` et ensuite `npm run serve-ts`
   1. Il faut changer la variable d'environnement de l'API `DB_DRIVER='fakeusers'`
2. Démarrer le frontend en mode dev : `cd ./frontend` et ensuite `npm run dev`

### Avec Docker
1. `docker compose build`
2. `docker compose up`

#### Pour voir la BD
La base de donnée est en MongoDB. Le plus simple est d'utiliser un UI comme : [Compass](https://www.mongodb.com/products/compass)

##### MongoDB notes
Lorsqu'on est dans l'environnement docker le port est `27017` et lorsque nous sommes dans l'environnement exterieur, le port ouvert est `27018`.

##### L'adresse de connexion 
```url
mongodb://localhost:27018/?readPreference=primary&appname=mongo&directConnection=true&ssl=false
```
---

## Code de succès et d'erreur

Les codes d'erreurs et de succès sont basés sur les standards HTTP.
[Voir les codes sur la documentation de Mozilla](https://developer.mozilla.org/fr/docs/Web/HTTP/Status).

### Codes implémentés

#### Pour `/login`

##### Code : **200** : lorsque les informations sont OK

```json
{
  "userConnectedToken": "theJWTTOKEN signed",
  "code": 200,
  "message": "OK",
  "fields": {
    "username": true,
    "password": true
  }
}
```

##### Code : **401** : lorsque les informations ne sont pas OK.

```json
{
  "userConnectedToken": null,
  "code": 401,
  "message": "Vos informations de connexion sont incorrectes, vérifiez votre utilisateur et mot de passe.",
  "fields": {
    "username": {
      "status": false,
      "message": ""
    },
    "password": {
      "status": false,
      "message": ""
    }
  }
}
```

### Un résumé :

- 1xx: Information
- 2xx: Succès
- 3xx: Redirection
- 4xx: Client Erreur
- 5xx: Server Erreur


# Outils pour coordonner le développement
Version 0.0.5 : on a décidé d'utiliser Docker pour garder les containers séparés, mais toujours dans le même environnement.

## Plan de travail
- [X] Établir un environnement reproduisable pour bien testé le front-end et le backend.
- [X] établir les dépendances et restrictions de versions : **[Node](https://nodejs.org/fr/) 16 pour l'api et l'app**
   - [X] Ports **`3000` front end et `8000` pour API**
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

##### Behavioural testing
- [Jasmine](https://jasmine.github.io/pages/getting_started.html)


## À faire
- [ ] Tests à faire API
  - [ ] Endpoint Login positif, négatif
  - [ ] Fake db driver
  - [ ] 
- [ ] Ajout d'un système de traduction pour les strings statique
- [ ] Ajout d'un système de traduction pour la structure de données.