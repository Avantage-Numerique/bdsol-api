Retour à la base de [Documention de l'API](readme.md)

# Event

## URI définies
- `/events/`
- `/events/create`
- `/events/update`
- `/events/list`
- `/events/search`
- `/events/delete`


## Choix du schéma
Événement est une entité à part entière, mais est aussi une finalité d'un projet. L'événement a donc beaucoup de similitude avec projet, puisqu'il a lui aussi une entité en charge, et des partenaires.

Un projet pourra être lié vers un événement, il en sera donc le "parent".

Un événement pourra lui aussi avoir des "enfants" événement `subEvents` dans le cas où un festival voudrais spécifié chaque spectacle qu'il présente sous forme d'événement au lieu de plage horaire.


## Schéma de l'objet 
```
{
    _id : ObjectId
    name : string
    slug : string (name)
    alternateName : string
    url: string
    description : string
    entityInCharge : ObjectId
    organizer : ObjectId
    eventType : ObjectId
    team : [Member]
    duration : undefined
    location : undefined
    startDate : Date
    endDate : Date
    contactPoint : string
    mainImage : ObjectId (Media)
    attendees : [ObjectId] (Person)
    domains : [ { domain: ObjectId, Status: {Status.Schema} } ]
    skills : [ObjectId]
    experience : undefined
    schedule: [Schedule]
    subEvents : [ObjectId] (Event)
    status : Status.Schema
    createdAt : Date
    updatedAt : Date
}
```
## Champs
- name : Nom de l'événement
- alternateName : Nom alternatif de l'événement
- description : Description de l'événement
- entityInCharge : Entité en charge de l'événement
- url : Hyperlien vers un site web
- organizer : Organisateur de l'événement
- eventType : Type d'événement
- team : Équipe qui s'occupe de l'événement (bénévole, équipe d'organisation, personne d'un groupe de musique)
- duration : Durée de l'événement (lapse de temps entre le début et la fin)
- location : Endroit où l'événement a lieu
- startDate : Date de début de l'événement
- endDate : Date de fin de l'événement (si l'événement est sur plusieurs jours)
- contactPoint : Moyen de contact de l'événement
- mainImage : Image principale de l'événement
- attendees : Personne présente?
- domains : Domaine associé à l'événement
- skills : Compétences associées à l'événement
- experience : L'expérience que les personnes participantes vont retiré de l'événement
- schedule : Horaire d'une activité de l'événement date et heure de début et de fin avec un nom d'activité
- subEvents : Sous-événement (un spectacle en plusieurs partie, où les autres parties du spectacle serait des événements)
- status : Statut de la fiche d'événement






