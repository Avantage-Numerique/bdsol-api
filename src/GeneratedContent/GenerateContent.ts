import { generateShortDescriptionFromDescription } from "./ShortDescription/GenerateShortDescription";

export function generateEntityContent(document: Readonly<any>) {
    /**
     * Créer un clone pour laisser le document Mongo intact
     */
    const _document = { ...document };

    const generatedContent = {
        shortDescription: generateShortDescriptionFromDescription(_document?.description),
    };

    return generatedContent;
}
