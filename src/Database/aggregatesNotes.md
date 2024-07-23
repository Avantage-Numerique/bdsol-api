# Aggregate

## Need to link 1:n inversly

## Test of query
```javascript

{
    $addFields: {
        "domains": {
            $map: {
                input: "$domains",
                    as: "d",
            in: {
                    "domain": "$$d.domain",
                        "subMeta": "$$d.status" // Rename 'status' to 'subMeta'
                }
            }
        }
    }
}
db.organisations.aggregate([
    { $match: { slug: "damn-son" } },
    {
        $lookup: {
            from: 'projects',
            localField: '_id',
            foreignField: 'entityInCharge',
            as: 'projects'
        }
    },
    {
        $lookup: {
            from: 'people',
            localField: 'team.member',
            foreignField: '_id',
            as: 'people'
        }
    },
    {
        $addFields: {
            team: {
                $map: {
                    input: "$team",
                    as: "t",
                    in: {
                        member: {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: "$people",
                                        as: "p",
                                        cond: { $eq: ["$$p._id", "$$t.member"] }
                                    }
                                },
                                0
                            ]
                        },
                        role: "$$t.role",
                        subMeta: "$$t.subMeta",
                    }
                }
            }
        }
    },
    {
        $project: {
            people: 0
        }
    }
]);

In this aggregation:

    The $lookup stage performs the left outer join between the organizations and people collections, storing the joined data in an array called teamMembers.

    The $addFields stage reshapes the team array as previously explained.

    The $replaceRoot stage replaces the root document with a new document created by merging the existing fields ($$ROOT) with the teamMembers field. The $$REMOVE is used to remove the teamMembers field from the root document, effectively keeping all other fields without specifying them individually.

    This way, you maintain all the existing fields in the organizations collection in the output document without explicitly listing them.

]);

db.people.aggregate([
    { $match: { slug: "marcus-sweable" } },
    {
        $lookup: {
            from: 'organisations',
            localField: '_id',
            foreignField: 'team.member',
            as: 'organisations'
        }
    },
    {
        $lookup: {
            from: 'projects',
            localField: '_id',
            foreignField: 'team.member',
            as: 'projects'
        }
    },
    {
        $lookup: {
            from: 'media',
            localField: 'projects.mainImage',
            foreignField: '_id',
            as: 'projectMainImage'
        }
    }
]);
db.people.aggregate([
    { $match: { slug: "patrick-watson" } },
    {
        $lookup: {
            from: 'taxonomies',
            localField: 'occupations.skills',
            foreignField: '_id',
            as: 'skillsData'
        }
    },
    {
        $addFields: {
            "occupations.skills": "$skillsData"
        }
    },
        {
        $project: {
            skillsData: 0
        }
    }
])

{
  "_id": {
    "$oid": "650c5ae42a84656c6057119b"
  },
  "lastName": "Sweable",
  "firstName": "Marcus",
  "nickname": "bibi",
  "description": "<p>asdasdasd boby watson baby</p>",
  "meta": {
    "state": "pending",
    "requestedBy": {
      "$oid": "650c5a97d2490e9347e18495"
    },
    "lastModifiedBy": {
      "$oid": "650c5a97d2490e9347e18495"
    }
  },
  "occupations": [
    {
      "groupName": "asdfasdfasdf",
      "skills": [
        {
          "$oid": "650c5a99d2490e9347e18632"
        },
        {
          "$oid": "650c5a99d2490e9347e1863e"
        }
      ],
      "subMeta": {
        "order": 2
      }
    },
    {
      "groupName": "dsafasdfas",
      "skills": [
        {
          "$oid": "650c5a99d2490e9347e1863a"
        }
      ],
      "subMeta": {
        "order": 1
      }
    },
    {
      "groupName": "asdfasdf",
      "skills": [
        {
          "$oid": "650c5a95d2490e9347e18418"
        }
      ],
      "subMeta": {
        "order": 0
      }
    }
  ],
  "domains": [
    {
      "domain": {
        "$oid": "650c5a94d2490e9347e1832c"
      },
      "_id": {
        "$oid": "6511e8cc33d58e40a41f6776"
      }
    },
    {
      "domain": {
        "$oid": "650c5a94d2490e9347e1831c"
      },
      "_id": {
        "$oid": "6511e8cc33d58e40a41f6777"
      }
    },
    {
      "domain": {
        "$oid": "650c5a94d2490e9347e18338"
      },
      "_id": {
        "$oid": "6511e8cc33d58e40a41f6778"
      }
    }
  ],
  "createdAt": {
    "$date": "2023-09-21T15:01:56.225Z"
  },
  "updatedAt": {
    "$date": "2023-09-25T20:08:44.551Z"
  },
  "slug": "marcus-sweable",
  "__v": 0,
  "catchphrase": "Sans bibi pas de swagg"
}

{
  "_id": {
    "$oid": "650c5a98d2490e9347e18550"
  },
  "name": "Petit Theatre du Vieux Noranda",
  "__v": 0,
  "catchphrase": "",
  "contactPoint": "",
  "createdAt": {
    "$date": "2023-09-21T15:00:40.204Z"
  },
  "description": "<p>La Troupe de théâtre Les Zybrides est propriétaire du Petit Théâtre du Vieux Noranda; un lieu majeur de création, diffusion et de formation artistique multidisciplinaire au cœur du quartier culturel de Rouyn - Noranda. Capitale culturelle de l’Abitibi - Témiscamingue, la Ville rayonne par son foisonnement artistique et culturel dont nous sommes un acteur incontournable. Nous nous engageons effectivement à jouer un rôle principal dans l’essor culturel de la région en nous donnant la mission de faciliter l’émergence d’une relève artistique, de promouvoir la démocratisation des arts et de développer le milieu culturel et artistique, dans une approche de partenariat et de développement durable. Nous accompagnons et créons des projets artistiques qui font intervenir la communauté, favorisent la rencontre humaine, le partage des connaissances et des compétences et qui mènent à une expérience collective. Depuis notre virage numérique, en 2012, notre domaine d’activité, en lien avec les arts numériques, s’est orienté vers des projets collectifs intégrant un public rassemblé qui favorisent les interactions entre les publics, les artistes, les lieux, les métadonnées et le web. Nous développons des œuvres numériques qui ont un contenu poétique et narratif, où les équipements et outils numériques sont au service du message de l’artiste. L’ensemble de nos actions est guidé par ; L’OUVERTURE aux personnes et aux différences, aux différentes formes d’arts, à l’imprévu et au risque, ainsi qu’à la relève et à la jeunesse. LA CRÉATIVITÉ en fournissant un terreau fertile à l’innovation dans toutes les sphères d’activités: la création artistique, la gestion de l’organisation et des finances, le développement du quartier, etc. L'ENGAGEMENT envers la communauté, les artistes, les partenaires, le public, les clients, les bénévoles et l’équipe. Notre mandat est multiple et se divise ainsi entre la création et la production incarnées par l’entité Les Zybrides, et la diffusion et formation multidisciplinaire qui sont personnifiées par notre lieu Le Petit Théâtre.</p>",
  "domains": [],
  "fondationDate": null,
  "location": [],
  "offers": [
    {
      "groupName": "sdfgsdfgsdfg",
      "skills": [
        {
          "$oid": "650c5a99d2490e9347e18646"
        }
      ],
      "subMeta": {
        "order": 0
      }
    }
  ],
  "slug": "petit-theatre-du-vieux-noranda-01",
  "team": [
    {
      "member": {
        "$oid": "650c5ae42a84656c6057119b"
      },
      "role": "Swagg person",
      "subMeta": {
        "order": 0
      }
    },
    {
      "member": {
        "$oid": "650c5a97d2490e9347e1849b"
      },
      "role": "armonic in charge",
      "subMeta": {
        "order": 1
      }
    }
  ],
  "updatedAt": {
    "$date": "2023-09-26T19:35:06.594Z"
  },
  "url": "petittheatre.org",
  "meta": {
    "state": "pending",
    "requestedBy": {
      "$oid": "650c5a97d2490e9347e18495"
    },
    "lastModifiedBy": {
      "$oid": "650c5a97d2490e9347e18495"
    }
  }
}
```
