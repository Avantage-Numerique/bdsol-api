import { compatibilityData, ontologiesMetaData } from "@src/Compatibility/CompatibilityObject";
import { CompatibleEntity, CompatibleOntologiesEnum, OntologyMetaData } from "@src/Compatibility/types";

export class JSONLDBuilder {
    public static build<TDocument extends { type: CompatibleEntity }>(
        doc: TDocument,
        compatibleOntology: CompatibleOntologiesEnum
    ): Record<string, unknown> {
        const entityCompatibility = compatibilityData[compatibleOntology][doc.type];

        if (!entityCompatibility) {
            return {};
        }

        const jsonld: Record<string, unknown> = {};

        //Add @context, @type
        this.buildMetadata(jsonld, doc, compatibleOntology);
        //For each compatible property
        for (const [property, entry] of Object.entries(entityCompatibility)) {
            //Parse database object with source function
            const value = entry.source?.(doc);
            //Confirm if we should include the result in JSONLD
            if (!this.shouldIncludeValue(value)) {
                continue;
            }
            //Add value to JSONLD according to the value
            this.assignValue(jsonld, property, value);
        }

        return jsonld;
    }

    private static buildMetadata<TDocument extends { type: CompatibleEntity }>(
        jsonld: Record<string, unknown>,
        doc: TDocument,
        compatibleOntology: CompatibleOntologiesEnum
    ): void {
        jsonld["@context"] = {
            [ontologiesMetaData[compatibleOntology].prefix]: ontologiesMetaData[compatibleOntology].ontologyUrl,
        };

        // TODO : Mapper vers le véritable type de l'ontologie.
        jsonld["@type"] = doc.type;
    }

    //Logic of edge case if we should map value
    private static shouldIncludeValue(value: unknown): boolean {
        if (value === undefined || value === null) {
            return false;
        }
        return true;
    }

    //How to assign value, can allow recursion of subschema potentially
    private static assignValue(jsonld: Record<string, unknown>, property: string, value: unknown): void {
        //  - détection des entités Mongo populées
        //  - génération récursive du JSON-LD
        //  - génération de @id
        //  - choix entre embed ou référence
        //  - traitement particulier de certains types

        jsonld[property] = value;
    }
}
