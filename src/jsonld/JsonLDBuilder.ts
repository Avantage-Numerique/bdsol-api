import { CompatibleEntity, CompatibilityOntology } from "@src/Compatibility/types";

export class JSONLDBuilder {
    public static build<TDocument extends { type: CompatibleEntity }>(
        doc: TDocument,
        compatibility: CompatibilityOntology<TDocument>
    ): Record<string, unknown> {
        const entityCompatibility = compatibility[doc.type];

        if (!entityCompatibility) {
            return {};
        }

        const jsonld: Record<string, unknown> = {};

        this.buildMetadata(jsonld, doc);

        for (const [property, entry] of Object.entries(entityCompatibility)) {
            const value = entry.source?.(doc);

            if (!this.shouldIncludeValue(value)) {
                continue;
            }

            this.assignValue(jsonld, this.normalizeProperty(property), value);
        }

        return jsonld;
    }

    private static buildMetadata<TDocument extends { type: CompatibleEntity }>(
        jsonld: Record<string, unknown>,
        doc: TDocument
    ): void {
        // TODO : Remplacer le contexte par un dictionnaire selon l'ontologie.
        jsonld["@context"] = {
            schema: "https://schema.org/",
        };

        // TODO : Mapper vers le véritable type de l'ontologie.
        jsonld["@type"] = doc.type;
    }

    private static normalizeProperty(property: string): string {
        // TODO : Lorsque le @context sera utilisé pour résoudre les préfixes,
        // on pourra retourner uniquement le nom de la propriété.
        //
        // Exemple :
        // "schema:name" -> "name"

        return property;
    }

    private static shouldIncludeValue(value: unknown): boolean {
        if (value === undefined || value === null) {
            return false;
        }

        // C'est ici que réside la logique de décision pour les edge cases.
        // Pour l'instant, les tableaux vides sont conservés puisque JSON-LD
        // les accepte généralement.
        //
        // Exemple si un jour on veut les ignorer :
        //
        // if (Array.isArray(value) && value.length === 0) {
        //     return false;
        // }

        return true;
    }

    private static assignValue(jsonld: Record<string, unknown>, property: string, value: unknown): void {
        // Point d'extension.
        //
        // Aujourd'hui :
        //  - primitives
        //  - objets
        //  - tableaux
        //
        // Demain :
        //  - détection des entités Mongo populées
        //  - génération récursive du JSON-LD
        //  - génération de @id
        //  - choix entre embed ou référence
        //  - traitement particulier de certains types

        jsonld[property] = value;
    }
}
