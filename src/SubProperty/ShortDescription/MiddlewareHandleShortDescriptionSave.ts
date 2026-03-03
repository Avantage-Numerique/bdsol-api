import sanitizeHtml from "sanitize-html";

/**
 * Takes and verify informations of document and insert badges
 *
 */
export function middlewareHandleShortDescriptionSave(document: any) {
    //If shortDescription is not declared by user
    if (document?.shortDescription == undefined || document.shortDescription == "") {
        //If description is undefined or empty assign shortDescription as empty
        if (
            document?.description == undefined ||
            document.description == "" ||
            stripHtml(document.description).replace(/\s/g, "") == ""
        ) {
            document.shortDescription = "";
            return;
        }

        //Else, stripHtml and build seo shortDescription
        const cleanDescription = stripHtml(document.description);
        //const seoDescription = buildSeoShortDescription(cleanDescription);
        document.shortDescription = cleanDescription;
    }
}

function stripHtml(html: string): string {
    if (!html) return "";

    let clean = sanitizeHtml(html, {
        allowedTags: [], //no tag
        allowedAttributes: {}, //no attribute
    });

    return clean
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ") //normalize spaces
        .trim();
}

//Build SEO description
//Remplace les ponctuations par des espaces pour séparer en keywords.
//(pour adapter vers "keywords" il faudrait peut-être retirer les déterminants "le/la/les/de/des/lui" etc.)
function buildSeoShortDescription(text: string, maxLength: number = 160): string {
    if (!text) return "";

    //Replace !letter and !number (punctuation) by spaces
    const noPunctuation = text.replace(/[^\p{L}\p{N}\s]/gu, " ");

    //Normalize spaces
    const normalized = noPunctuation.replace(/\s+/g, " ").trim();
    const words = normalized.split(" ");

    let result = "";

    for (const word of words) {
        //Si le dernier mot déborde de la limite on le coupe de la description
        if ((result + " " + word).trim().length > maxLength) {
            break;
        }
        result = (result + " " + word).trim();
    }
    return result;
}
