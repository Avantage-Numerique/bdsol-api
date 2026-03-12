import { generateShortDescriptionFromDescription } from "./ShortDescription/GenerateShortDescription";

export function generateEntityContent(document: any) {
    let generatedContent = {
        shortDescription: generateShortDescriptionFromDescription(document?.description),
    };

    return generatedContent;
}
