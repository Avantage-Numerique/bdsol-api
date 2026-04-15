import { JsonLDBuilder } from "@src/jsonld/JsonLDBuilder";
import EntityControllerFactory from "@src/Abstract/EntityControllerFactory";
import EntityRefFactory from "@src/Referential/EntityRefFactory";

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
    public async getJsonLDForEntity(collection: string, entityId: string): Promise<object | false> {
        const model = EntityControllerFactory.getControllerFromEntity(collection)?.entity?.mongooseModel;
        if (!model) throw new Error("Pas de collection !");

        const document = await model.findById(entityId).setOptions({ skipPopulate: true });
        if (!document) return false;

        return this.createJsonLDForDocument(document);
    }

    /**
     *
     * @param document database entity as a mongo document
     * @param contextMode "url" or "inline", defaults to "inline"
     * @param contextUrl defaults to avnu context
     * @returns
     */
    public createJsonLDForDocument(document: any, contextMode: string = "inline", contextUrl: string = "/jsonld"): any {
        let entity;

        /**
         * Créer un clone pour laisser le document Mongo intact
         */
        const _document = { ...document };

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
                if (doc.$__ || doc.toObject) {
                    doc = doc.toObject({ virtuals: true });
                }

                for (const key of Object.keys(doc)) {
                    doc[key] = deepToObject(doc[key]);
                }
            }

            return doc;
        }

        try {
            entity = deepToObject(_document);
        } catch (error) {
            console.error(error);
            entity = _document;
        }
        if (!entity?.type) {
            return false;
        }

        const ref = EntityRefFactory.getRefFromEntity(entity.type);
        if (!ref) return false;

        const options = {
            contextMode,
            contextUrl,
        } as const;

        const jsonLdBuilder = new JsonLDBuilder(entity, ref, options);
        return jsonLdBuilder.build();
    }
}

export default JSONLDController;
