import Page, {PageContent} from "@src/Pages/Controllers/Pages/Page";
import ApiVersions from "@src/Data/Versions/ApiVersions.json";

interface Version {
    label:string,
    value:string,
    date:string,
    description:string,
    link?:string,
    notes?:Array<Note>|string
}
interface Note {
    value:string,
    additionnalClasses?:string
}

class StatisticsPage extends Page {

    constructor(name:string, layout:string="", content:PageContent={title:"Page", body:"contenu"}) {
        super(name, "page", content);
        this.content.title = this.title();
        this.content.body = this.body();
    }

    public title() {
        return "Statistiques d'AVNU";
    }
    public body() {
        const versions:Array<any> = ApiVersions.versions;//json to type seem to be tricky.
        let body = "<div>";

        for (const version of versions) {
            const isCurrentVersion = true;
            body += `<h2>${isCurrentVersion ? "<span class='badge bg-primary'>Actuelle</span>" : ""} <span class="badge bg-secondary">${version.value}</span> ${version.label}</h2>`;
            body += `<p>${version.date}</p>`;
            body += `<p>${version.description}</p>`;
            body += version.link && version.link !== "" ? `<p><a href="${version.link}" title="Consulter les notes de versions sur github" target="_blank">Voir sur github</a></p>` : "";
            if (typeof version.notes === "string") {
                body += `<p>${version.notes}</p>`;
            }
            if (typeof version.notes === "object" && Array.isArray(version.notes)) {
                for (let note of version.notes) {
                    body += `<p${note.additionnalClasses && note.additionnalClasses !== "" ? "class='"+note.additionnalClasses+"'" : ""}>${note.value}</p>`;
                }
            }
        }
        return body;
    }
}

export default StatisticsPage;