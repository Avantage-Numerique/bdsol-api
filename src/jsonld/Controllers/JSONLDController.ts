import { JsonLDBuilder } from "@src/jsonld/JsonLDBuilder";
import EntityControllerFactory from "@src/Abstract/EntityControllerFactory";
import EntityRefFactory from "@src/Referential/EntityRefFactory";

class JSONLDController {
    /** @private @static Singleton instance */
    private static _instance: JSONLDController;

    /**
     * @public @static @method getInstance Create the singleton instance if not existing
     * @return {JSONLDController} Controller singleton constructor
     */
    public static getInstance(): JSONLDController {
        if (!JSONLDController._instance) {
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

        const document = await model.findById(entityId); //.setOptions({ skipPopulate: true });
        if (!document) return false;

        return this.createJsonLDForDocument({
            ...("toObject" in document ? document.toObject() : document),
            type: collection,
        });
    }

    public createJsonLDForDocument(
        document: { [k: string]: any; type: string },
        contextMode: string = "inline",
        contextUrl: string = "/jsonld"
    ): any {
        if (!document?.type) {
            return false;
        }

        const ref = EntityRefFactory.getRefFromEntity(document.type);
        if (!ref) return false;

        const options = {
            contextMode,
            contextUrl,
        } as const;

        const jsonLdBuilder = new JsonLDBuilder(document, ref, options);
        return jsonLdBuilder.build();
    }
}

export default JSONLDController;
