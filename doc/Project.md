Retour à la base de (Documention de l'API)(readme.md)

# Project


## Schema
- name : (string) le nom du projet
- alternateName : (string) un nom alternatif
- description : (string) une description du projet
- url : (string) url du projet (redirection vers le un site)
- contactPoint : (string) moyen de contact d'un-e représentant-e du projet
- location : (Location.schema) coordonée d'un endroit où le projet à lieu, si besoin il y a de spécifier un lieu. (pas le lieu de la finalité)
- team : [Member.schema] des membres de l'équipe du projet
- mainImage : (ObjectId) un média image représentant le projet
- sponsor : [Sponsor.schema] partenaire financier ou non du projet
- scheduleBudget : (ScheduleBudget.schema) Échéancier et budget associé aux étapes de réalisation du projet
- skills : [ObjectId] Réfère de compétence nécessaire à l'accomplissement du projet
- status : (Status.schema) Réfère aux statut des derniers changements effectué sur le projet



# Schema associé à Project
## Sponsor
Les sponsor devrait pouvoir être ordonné. On ne semble pas vouloir permettre des les placé en groupe nécessairement (comme par exemple "partenaire OR ..."). Cela suggère que l'on pourrait leur mettre au minimum un champ "order" pour les listé dans l'ordre voulu.

## Schema
- name : (string) Nom du sponsor
- entityId : (ObjectId) S'il y a lieu, l'id de la Person ou Organisation représentant le sponsor (partenaire)
- order : (Number) Nombre représentant l'ordre ascendant de l'affichage des sponsors
- status : (Status.Schema) Statut de l'ajout du sponsor


# ScheduleBudget associé à Project
Le scheduleBudget comprend deux partie. Une pour spécifié la globalité de la chose. Par exemple, le coût total estimé, la date de début, la date de fin prévue, la date de fin (si le projet est terminé) etc.

L'autre partie comprend l'échéancier financier (plannedScheduleBudget) qui devrait être en mesure de représenté différente étape de production du projet, leur coût estimé et leur temps de finalisation. Par exemple, pour une pièce de théâtre, ce pourrait être différente étape de création. Écriture du texte et scénarisation, fabrication de décors, création d'éclairage etc. Et les relié à certains coût et période de temps, si besoin il y a. Par exemple, fabrication de décor, 3 000$, 2 mois.

## Schema
- launchDate : (Date)
- completionEstimateDate : (Date)
- completionDate : (Date)
- estimatedTotalBudget : (Number)
- estimatedTimeToComplete : (string)
- plannedScheduleBudget : [object]
- status : (Status.schema) statut du la modification du budget