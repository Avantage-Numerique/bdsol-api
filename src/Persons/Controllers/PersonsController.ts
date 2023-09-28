import Person from "../Models/Person"
import PersonsService from "../Services/PersonsService";
import AbstractController from "../../Abstract/Controller"
import {ApiResponseContract} from "@src/Http/Responses/ApiResponse";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {SuccessResponse} from "@src/Http/Responses/SuccessResponse";
import ServiceAggregate from "@database/ServiceAggregate";
import {User} from "@src/Users/Models/User";
import mongoose from "mongoose";
import Taxonomy from "@src/Taxonomy/Models/Taxonomy";
import {ErrorResponse} from "@src/Http/Responses/ErrorResponse";
import Organisation from "@src/Organisations/Models/Organisation";
import Project from "@src/Projects/Models/Project";

class PersonsController extends AbstractController {

    /** @private @static Singleton instance */
    private static _instance:AbstractController|PersonsController;

    /** @public PersonsService */
    service:PersonsService;

    /** @public Model */
    entity:Person;

    constructor() {
        super();
        this.entity = Person.getInstance();
        this.service = PersonsService.getInstance(this.entity);
    }

    /**
     * @public @static @method getInstance Create the singleton instance if not existing 
     * @return {PersonsController} Controller singleton constructor
    */
    public static getInstance():AbstractController|PersonsController {
        if (PersonsController._instance === undefined) {
            PersonsController._instance = new PersonsController();
        }
        return PersonsController._instance;
    }

    public async single(requestData: any): Promise<ApiResponseContract> {
        return await this.aggregateSingle(requestData.slug);
    }


    public async aggregateSingle(slug:any): Promise<ApiResponseContract> {

        let query: Array<any> = []
        /**
         * regroup Linked entity from a 1:n relation where person is linked.
         * linkField : Property in the AppModel that
         */
        const linkedEntities:Array<any> = [
            {
                appModel: Organisation.getInstance(),
                linkField: "team.member"
            },
            {
                appModel: Project.getInstance(),
                linkField: "team.member"
            }
        ];

        for (let entity of linkedEntities) {
            console.log("person controller", entity);
            query.push({
                $lookup: {
                    from:entity.appModel.collectionName.toLowerCase(),
                    localField: '_id',
                    foreignField: entity.linkField,
                    as: entity.appModel.collectionName.toLowerCase()
                }
            });
        }
        query.push({// Virtuals
            $addFields: {
                "organisations.type": Organisation.getInstance().modelName,
                "projects.type": Project.getInstance().modelName,
                "type": Person.getInstance().modelName
            }
        });

        const aggregateService = new ServiceAggregate(Person.getInstance());

        const results:any = await aggregateService.lookupMultiple({slug: slug}, query);

        //agregation inter bd don't work (that I red).
        const users:mongoose.Model<any> = User.getInstance().mongooseModel;
        await users.populate(results, {path: "meta.requestedBy", select: "name username avatar"});
        await users.populate(results, {path: "meta.lastModifiedBy", select: "name username avatar"});

        //I'm doing it with populate because of the $lookup is just really fetching, and we need data to stay the same.
        // All the things I found and tests where not working
        const taxonomies:mongoose.Model<any> = Taxonomy.getInstance().mongooseModel;
        await taxonomies.populate(results, {path: "occupations.skills"});
        await taxonomies.populate(results, {path: "domains.domain"});

        if (results.length > 0) {
            return SuccessResponse.create(
                results[0],
                StatusCodes.OK,
                ReasonPhrases.OK
            );
        }

        return ErrorResponse.create(
            new Error(""),
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND
        );
    }
}

export default PersonsController;

/*

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
            from: 'taxonomies',
            localField: 'domains.domain',
            foreignField: '_id',
            as: 'domains'
        }
    },
    {
        $lookup: {
            from: 'taxonomies',
            localField: 'occupations.skills',
            foreignField: '_id',
            as: 'skillsPopulated'
        }
    },
    {
        $addFields: {
            "organisations.type": "Organisation",
            "projects.type": "Project",
            "occupations.skills": "$skillsPopulated"
        }
    },
    {
        $project: {
            skillsPopulated: 0
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

 */