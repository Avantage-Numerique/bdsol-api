import { generateShortDescriptionFromDescription } from "./ShortDescription/GenerateShortDescription";

export function generateEntityContent(document: Readonly<any>) {
    const doc = { ...document };

    const generatedContent = {
        shortDescription: generateShortDescriptionFromDescription(doc?.description),
    };

    return generatedContent;
}
