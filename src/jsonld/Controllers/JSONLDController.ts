import { JsonLDBuilder } from "../JsonLDBuilder";
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

    public async jsonLDIndex(collection: string, entityId: string): Promise<object | false> {
        const model = EntityControllerFactory.getControllerFromEntity(collection)?.entity?.mongooseModel;
        const ref = EntityRefFactory.getRefFromEntity(collection);

        if (!model || !ref) throw new Error("Pas de collection ou de ref!");

        const entity = await model.findById(entityId).setOptions({ skipPopulate: true });

        if (!entity) return false;

        const options = {
            contextMode: "inline", // | "url";
            contextUrl: "/jsonld",
        } as const;

        const jsonld = new JsonLDBuilder(entity, ref, options);

        return jsonld.build();
    }
}

export default JSONLDController;
