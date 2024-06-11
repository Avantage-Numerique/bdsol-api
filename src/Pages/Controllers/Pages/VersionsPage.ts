import Page, {PageContent} from "@src/Pages/Controllers/Pages/Page";
import ApiVersions from "@src/Data/Versions/ApiVersions.json";

class VersionsPage extends Page {

    constructor(name:string, layout:string, content:PageContent={title:"Page", body:"contenu"}) {
        super(name, layout, content);
        this.content.title = this.title();
        this.content.body = this.body();
    }

    public title() {
        return "Versions";
    }
    public body() {
        const versions = ApiVersions.versions;
        let versionsBody = "<div>";

        for (const version of versions) {
            const isCurrentVersion = true;
            versionsBody += `<h2>${isCurrentVersion ? "<span class='badge bg-primary'>current</span>" : ""} ${version.value} ${version.label}</h2>`;
            versionsBody += `<p>${version.date}</p>`;
            versionsBody += `<p>${version.description}</p>`;
            versionsBody += `<p><a href="${version.link}" title="Consulter les notes de versions sur github" target="_blank">Voir sur github</a></p>`;
            if (typeof version.notes === "string") {
                versionsBody += `<p>${version.notes}</p>`;
            }
            if (typeof version.notes === "object" && Array.isArray(version.notes)) {
                for (const note of version.notes) {
                    versionsBody += `<p>${note.value}</p>`;
                }
            }
            //versionsBody += `<p>${version.notes}</p>`;
        }
        return versionsBody;
    }
}

export default VersionsPage;