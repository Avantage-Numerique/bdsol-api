export class EntityTypeFactory {
    static readonly Person = "person";
    static readonly Organisation = "organisation";
    static readonly Taxonomy = "taxonomy";
    static readonly Project = "project";
    static readonly Media = "media";
    static readonly Event = "event";
    static readonly Place = "place";
    static readonly Equipment = "equipment";

    private static readonly collections = {
        person: "persons",
        organisation: "organisations",
        taxonomy: "taxonomies",
        project: "projects",
        media: "media",
        event: "events",
        place: "places",
        equipment: "equipment",
    } as const;

    private static readonly hiddenCollections = ["autoincrements", "migrations", "userhistories"] as const;

    static get all(): string[] {
        return [
            this.Person,
            this.Organisation,
            this.Taxonomy,
            this.Project,
            this.Media,
            this.Event,
            this.Place,
            this.Equipment,
        ];
    }

    static get typeList(): readonly string[] {
        return this.all;
    }

    static getCollection(type: string): string | undefined {
        return (this.collections as Record<string, string>)[type];
    }

    static isValid(type: string): boolean {
        return this.all.includes(type);
    }
}

export default EntityTypeFactory;
