# L'API de la BDSOL

[![Build Status](https://github.com/Avantage-Numerique/bdsol-api/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Avantage-Numerique/bdsol-api/actions)

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

---
## Collaboration et support


## Chartes décisionnelles avant de demander de l'aide

## TLTR
1. Une question, un bogue, une nouvelle notion ou une inquiétude survient ~ déclencheur
2. Documenter le problème dans vos notes
3. Vérifie dans la documentation interne ou de l'outil ciblé par la situation  ~ max 15 minutes
4. Recherche sur le web (Stack overflow, github, github gist, autre) ~ max 20 minutes
5. Essaye au moins de régler le problème avec des hypothèses ~ maximum 20 minutes
6. Demander à un collègue et collaborer pour trouver une solution ~ maximum 20 minutes
7. Contacter un expert ou une rencontre pour trouver une solution en équipe.

## Microdétails

## Déclencheurs
1. Je rencontre un bogue
2. J'ai de la difficulté à reproduire un bogue
3. Je commence une tâche, sans maîtriser ou connaître les toutes les notions nécessaires pour y arriver.
4. J'ai de la difficulté à élaborer un algorithme et/ou à établir la logique et la suite des choses à faire.

### Documenter le problème
1. Le plus possible
   1. Étapes pour reproduire,
   2. Scope (url, fichiers, projet)
   3. Observations
   4. Thread stack overflow, issues github, pull request, article de blogue, etc.

## Suite des événements et possibilités
1. J'isole mon contexte et mon environnement afin d'être en mesure de bien décrire et d'énoncer le problème.
   1. À quel endroit je rencontre le problème
   2. Quelles sont les étapes à reproduire avant de rencontrer le problème
      1. Soyez précis : URL, context (navigateur, application, etc.)
3. Quels éléments décrivent le mieux le problème à cet endroit.
   4. Qu'est-ce qu'on devrait observer pour que le problème soit résolu.
2. Est-ce que je suis en mesure d'imaginer une source pour le problème ?
   1. Sinon, demande de l'aide avec ce que tu as au point #1.
3. Quels autres test ou hypothèse je pourrais faire pour identifier le problème ?
   1. Est-ce qu'il y a une suite d'action qui permet d'accomplir la tâche sans que le problème survienne ?
   2. Dans mon environnement local, à quelles classes, librairie ou autre je pourrais associer le problème ?
4. Identifier, si cette hypothèse n'est pas testable ou semble trop abstraite
5. Trouver les mots clés et rechercher sur le web : / stack overflow / Github / Github Gist / Autres.
6. Tester au moins une solution trouvée grâce à votre recherche sur le web
7. Noter et ajouter les résultats de votre recherche à votre énonciation du problème.
8. Modifier l'énoncé de votre problème selon votre recherche et vos observations.
9. Partager votre problème à un pair grâce à votre énoncé et les résultats de votre recherche

## Source
1. https://www.forbes.com/sites/elanagross/2016/07/19/how-asking-for-help-the-right-way-advances-your-career/ **Be specific and strategic.**
2. Est-ce qu'on les présente en BPMN chart : https://www.lucidchart.com/pages/business-process-mapping
3. Chartes de base : https://karajlovett.com/asking-for-help-at-work-when-you-need-it/
   1. **Clearly define the problems.** When you ask for help at work, first state why you need help and any other factors that are preventing you from doing your job effectively. Having those identified and agreed upon at the beginning will help you to have a fruitful discussion with your team or manager.
   2.  **Develop possible solutions.** This extra step shows that you’re not trying to get out of work or are being lazy. It also makes it more likely that one of your solutions will be chosen by your team and manager. With that said, make sure you know which solution you prefer most.
   3.  **Avoid the blame game.** During your explanation of the problem, be sure not to blame others implicitly or explicitly. Instead, focus on the situation and the problems the situation is causing for you. How is this affecting your wellbeing? How is it impeding you from doing other parts of your job? How has it caused you rework and added time to your workday?
   4.  **Be Professional**
   5.  **Be Polite**
   6.  **Schedule a Conversation**
4. Dans le podcast : Freelance to founder : https://millo.co/podcasts/freelancetofounder?episode=productivity-secrets