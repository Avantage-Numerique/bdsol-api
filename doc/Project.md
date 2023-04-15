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


