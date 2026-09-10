import { compatibilityData, ontologiesMetaData } from "@src/Compatibility/CompatibilityObject";
import { CompatibleEntity, CompatibleOntologiesEnum, OntologyMetaData } from "@src/Compatibility/types";

type MinimalDocument = { type: CompatibleEntity; uri: string };

export class JSONLDBuilder {
    public static build<TDocument extends MinimalDocument>(
        doc: TDocument,
        compatibleOntology: CompatibleOntologiesEnum,
        depth: number = 1
    ): Record<string, unknown> {
        const entityCompatibility = compatibilityData[compatibleOntology][doc.type];

        if (!entityCompatibility) {
            return {};
        }

        const jsonld: Record<string, unknown> = {};

        //Add @context, @type
        this.buildMetadata(jsonld, doc, compatibleOntology, depth);
        //For each compatible property
        for (const [property, entry] of Object.entries(entityCompatibility.compatibility)) {
            //Parse database object with source function
            const value = entry.source?.(doc);
            //Confirm if we should include the result in JSONLD
            if (!this.shouldIncludeValue(value)) {
                continue;
            }
            //Add value to JSONLD according to the value
            this.assignValue(jsonld, property, value, compatibleOntology, depth);
        }

        return jsonld;
    }

    private static buildMetadata<TDocument extends MinimalDocument>(
        jsonld: Record<string, unknown>,
        doc: TDocument,
        compatibleOntology: CompatibleOntologiesEnum,
        depth: number
    ): void {
        if (depth == 1) {
            jsonld["@context"] = {
                [ontologiesMetaData[compatibleOntology].prefix]: ontologiesMetaData[compatibleOntology].ontologyUrl,
            };
        }

        // TODO : Mapper vers le véritable type de l'ontologie.
        jsonld["@type"] = doc.type; //doc.type => quelle type de l'ontologie cible
        jsonld["@id"] = doc.uri;
    }

    //Logic of edge case if we should map value
    private static shouldIncludeValue(value: unknown): boolean {
        if (value === undefined || value === null) {
            return false;
        }
        return true;
    }

    //How to assign value, can allow recursion of subschema
    private static assignValue(
        jsonld: Record<string, unknown>,
        property: string,
        value: unknown,
        ontology: CompatibleOntologiesEnum,
        depth: number
    ): void {
        const handlePropertyValue = (val: unknown) => {
            //détection des entités Mongo populées
            if (typeof val === "object" && val && "uri" in val && "type" in val && depth < 4) {
                //  - génération récursive du JSON-LD
                return JSONLDBuilder.build(val as MinimalDocument, ontology, depth + 1);
            } else return val;
        };
        let result;
        //If array handle each
        if (Array.isArray(value)) {
            result = value.map(handlePropertyValue);
        } else result = handlePropertyValue(value);

        //  - choix entre embed ou référence
        //  - traitement particulier de certains types

        jsonld[property] = result;
    }
}
