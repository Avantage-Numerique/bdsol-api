import sanitizeHtml from "sanitize-html";

export function generateShortDescriptionFromDescription(description: string) {
    const strippedDescription = description == undefined ? "" : stripHtml(description);
    if (strippedDescription == "") return "";

    //Else, stripHtml and build shortDescription
    const spacedTagDescription = addTagSpacing(description);
    const sanitizedDescription = stripHtml(spacedTagDescription);
    const shortenedDescription = reduceToMaxLength(sanitizedDescription, 160);

    return shortenedDescription;
}

/**
 * @todo check et migre, potentiel de DOUBLON : migré vers le Str helper
 * @param html
 */
function stripHtml(html: string): string {
    if (!html) return "";

    const clean = sanitizeHtml(html, {
        allowedTags: [], //no tag
        allowedAttributes: {}, //no attribute
    });

    return clean
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ") //normalize spaces
        .trim();
}

function addTagSpacing(input: string): string {
    return input.replace(/</g, " <").replace(/>/g, "> ");
}

//Reduce text to maxLength
function reduceToMaxLength(text: string, maxLength: number = 160): string {
    const words = text.split(/[\., ]+/);
    let result = "";
    for (const word of words) {
        //Si le dernier mot déborde de la limite on le coupe de la description
        if ((result + " " + word).trim().length > 160) {
            break;
        }
        result = (result + " " + word).trim();
    }
    return result;
}
