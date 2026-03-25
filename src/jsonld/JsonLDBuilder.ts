enum OntologyTarget {
    SCHEMA_ORG = "schema.org",
    DATASCENE = "datascene",
    AVNU = "avnu",
}

export class JsonLDBuilder {
    constructor(
        private entity: any,
        private rootRef: any, // RefProperty complet (racine)
        private options?: {
            contextMode?: "inline" | "url";
            contextUrl?: string;
        }
    ) {}

    // build natif AVNU
    build() {
        return this.buildFor(OntologyTarget.AVNU);
    }

    // build pour ontologie externe
    buildFor(targetOntology: OntologyTarget | string) {
        return {
            "@context": this.buildContext(),
            "@type": this.rootRef.ontologyProperty,
            ...this.buildForOntology(targetOntology, this.entity, this.rootRef.ref || []),
        };
    }

    // context récursif
    private buildContext(): any {
        if (this.options?.contextMode === "url") {
            return this.options.contextUrl || "";
        }

        const context: Record<string, string> = {};

        const walk = (referential: any[]) => {
            for (const propertyRef of referential) {
                const field = propertyRef.field;
                const ontology = propertyRef.ontologyProperty;

                if (field && ontology && !context[field]) {
                    context[field] = ontology;
                }

                if (propertyRef.type?.kind === "object" && Array.isArray(propertyRef.ref)) {
                    walk(propertyRef.ref);
                }
            }
        };

        if (Array.isArray(this.rootRef.ref)) {
            walk(this.rootRef.ref);
        }

        return context;
    }

    // build interne récursif
    private buildForOntology(targetOntology: string, entity: any, referential: any[]): Record<string, any> {
        const result: Record<string, any> = {};

        //For each property in ref (ref[] from the parent)
        for (const propertyRef of referential) {
            //Check if property from ref have a field key
            const field = propertyRef.field;
            if (!field) continue;

            //Check if that field exists in the entity
            const value = entity?.[field];
            const isArray = propertyRef.cardinality?.includes("N");

            //check valeur absente
            if (value === undefined || value === null) {
                if (propertyRef.cardinality?.startsWith("1")) {
                    console.error(`[JsonLDBuilder] Missing required property: ${field}`);
                }
                continue;
            }

            //fonction de mapping
            const processValue = (val: any): any => {
                //primitives
                if (propertyRef.type?.kind === "primitive") {
                    if (targetOntology === OntologyTarget.AVNU) return val;

                    const mapping = this.findMapping(propertyRef, targetOntology);
                    if (mapping) return val;
                    return undefined; // pas compatible
                }

                //references
                if (propertyRef.type?.kind === "reference") {
                    if (targetOntology === OntologyTarget.AVNU) {
                        //If more then 1 target, check the refPath to collapse to the right value
                        if (propertyRef.type.targets.length > 1) {
                            const refPath = propertyRef.type.refPath;
                            const refTargetObj = referential.find((refElem) => refElem.field === refPath);
                            if (!refTargetObj) {
                                console.log(
                                    `[JsonLDBuilder] Couldn't collapse targets ${propertyRef.type.targets} to refPath ${refPath} in field ${field}`
                                );
                            } else if (entity[refPath]) return { "@id": val, "@type": entity[refPath] };
                        }
                        return { "@id": val, "@type": propertyRef.type.targets[0] };
                    }

                    const mapping = this.findMapping(propertyRef, targetOntology);
                    if (mapping) return { "@id": val };
                    return undefined;
                }

                //objets récursifs
                if (propertyRef.type?.kind === "object") {
                    const sub = this.buildForOntology(targetOntology, val, propertyRef.ref || []);
                    if (Object.keys(sub).length > 0) return sub;
                    return undefined; // rien de compatible dans les sous-champs
                }

                return undefined;
            };

            //gestion array ou single
            if (isArray) {
                if (!Array.isArray(value)) {
                    console.error(`[JsonLDBuilder] Expected array for property: ${field}`);
                    continue;
                }

                const processedArray = value.map(processValue).filter((v) => v !== undefined);

                if (processedArray.length > 0) {
                    if (targetOntology === OntologyTarget.AVNU) result[field] = processedArray;
                    else {
                        const mapping = this.findMapping(propertyRef, targetOntology);
                        result[mapping?.externalField || field] = processedArray;
                    }
                }
            } else {
                const processed = processValue(value);
                if (processed !== undefined) {
                    if (targetOntology === OntologyTarget.AVNU) result[field] = processed;
                    else {
                        const mapping = this.findMapping(propertyRef, targetOntology);
                        if (mapping) result[mapping.externalField] = processed;
                        // si mapping absent mais sous-champs compatibles, le champ est inclus tel quel
                        else if (propertyRef.type?.kind === "object") result[field] = processed;
                    }
                }
            }
        }
        return result;
    }

    // recherche le mapping RefCompatibility pour l'ontologie cible
    private findMapping(propertyRef: any, targetOntology: string) {
        if (!propertyRef.compatibility || targetOntology === OntologyTarget.AVNU) return null;

        const comp = propertyRef.compatibility.find((c: any) => c.externalSource?.name === targetOntology);
        return comp?.mapping || null;
    }
}
