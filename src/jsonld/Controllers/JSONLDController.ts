import { JSONLDBuilder } from "@src/jsonld/JSONLDBuilder";
import EntityControllerFactory from "@src/Abstract/EntityControllerFactory";
import { CompatibleOntologiesEnum } from "@src/Compatibility/types";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

class JSONLDController {
    /** @private @static Singleton instance */
    private static _instance: JSONLDController;
    private constructor() {}

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {JSONLDController} Controller singleton constructor
     */
    public static getInstance(): JSONLDController {
        if (JSONLDController._instance === undefined) {
            JSONLDController._instance = new JSONLDController();
        }
        return JSONLDController._instance;
    }

    /**
     *
     * @throws {Error} If the `collection` param is invalid (`model` or `ref` not found)
     */
    public async getJsonLDForEntity(collection: string, entityId: string, ontology: string): Promise<object | false> {
        const model = EntityControllerFactory.getControllerFromEntity(collection)?.entity?.mongooseModel;
        if (!model) throw new Error("Pas de collection !");

        const document = await model.findById(entityId); //.setOptions({ skipPopulate: true });
        if (!document) return false;

        if (!Object.values(CompatibleOntologiesEnum).includes(ontology as CompatibleOntologiesEnum)) {
            throw new Error("Unknown ontology");
        }

        return this.createJsonLDForDocument(document, ontology);
    }

    /**
     *
     * @param document database entity as a mongo document
     * @param contextMode "url" or "inline", defaults to "inline"
     * @param contextUrl defaults to avnu context
     * @returns
     */
    public createJsonLDForDocument(document: any, ontology: string): any {
        let entity;
        /**
         * Créer un clone pour laisser le document Mongo intact (?)
         *
         * WARN: quand on clone la fonction `.toObject()` est undefined
         */
        // const _document = { ...document };
        /**
         * Fix semi-temporaire pour que les objets nested soient .toObject()
         *
         * @param doc
         * @returns
         */
        function deepToObject(doc: any): any {
            if (Array.isArray(doc)) {
                return doc.map(deepToObject);
            }
            if (doc && typeof doc === "object") {
                // Si c'est un document mongoose
                if ("toObject" in doc && typeof doc.toObject === "function") {
                    doc = doc.toObject({ virtuals: true });
                }

                for (const key of Object.keys(doc)) {
                    doc[key] = deepToObject(doc[key]);
                }
            }
            return doc;
        }

        try {
            entity = deepToObject(document);
        } catch (error) {
            console.error(error);
            entity = document;
        }
        if (!entity?.type) {
            return false;
        }

        const correctOntology = ontology as CompatibleOntologiesEnum;

        return JSONLDBuilder.build(entity, correctOntology);
    }
}

export default JSONLDController;
