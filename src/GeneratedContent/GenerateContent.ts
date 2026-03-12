import { generateShortDescriptionFromDescription } from "./ShortDescription/GenerateShortDescription";

export function generateEntityContent(document: Readonly<any>) {
    //This clone is to never modify the document, and always pass copies of values
    const safeDocument = document.toObject();
    let generatedContent = {
        shortDescription: generateShortDescriptionFromDescription(safeDocument?.description),
    };

    return generatedContent;
}
