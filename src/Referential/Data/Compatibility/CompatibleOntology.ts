import { Ontology } from "@ref/Data/Compatibility/Ontology";
import { RefCompatibility } from "@ref/Data/types";

export type CompatibleOntologyPropertyPrefix = `${string}:${string}`;

export enum CompatibleOntologiesEnum {
    "AVNU" = "avnu",
    "Artsdata" = "artsdata",
    "DataScene" = "datascene",
    "Schemaorg" = "schema.org",
}

export interface CompatibleOntologyParam {
    referentialUrl: string;
    ontologyUrl: string;
    contextUrl: string;
    frontpageUrl?: string;
    name: string;
    label?: string;
    prefix: string;
    description?: string;
    suffix?: string;
    icon?: string;
}

export default class CompatibleOntology implements Ontology {
    referentialUrl: string;
    ontologyUrl: string;
    contextUrl: string;
    frontpageUrl: string;
    name: string;
    label: string;
    description: string;
    prefix: string;
    suffix: string;
    icon: string;

    constructor(params: CompatibleOntologyParam) {
        this.referentialUrl = params.referentialUrl;
        this.ontologyUrl = params.ontologyUrl;
        this.contextUrl = params.contextUrl;
        this.frontpageUrl = params.frontpageUrl ?? params.referentialUrl;
        this.name = params.name;
        this.label = params.label ?? params.name;
        this.description = params.description ?? "";
        this.prefix = params.prefix;
        this.suffix = params.suffix ?? "";
        this.icon = params.icon ?? "la-database";
    }

    ontologyClass(value: string): string {
        return `${value}`;
    }
    ontologyProperty(value: string): CompatibleOntologyPropertyPrefix {
        return `${this.prefix}:${value.toLowerCase()}${this.suffix}` as CompatibleOntologyPropertyPrefix;
    }

    refUri(path: string, prependSlash: boolean = true): string {
        return this.referentialUrl + (prependSlash ? "/" : "") + path;
    }

    ontologyUri(path: string, prependSlash: boolean = true): string {
        return this.ontologyUrl + (prependSlash ? "/" : "") + path;
    }

    compatibilityMessage(msg: string = ""): RefCompatibility {
        msg = msg === "" ? `Seulement compatible avec ${this.name} pour l'instant` : msg;
        return {
            messageOnly: msg,
            externalSource: {},
            mapping: {},
        } as RefCompatibility;
    }

    /**
     *
     * @param property {string} the property of in the target compatibility ontologie
     * @param field {string}
     * @param refUrlOverwrite {string}
     */
    getOntologyCompatibilityArray(
        property: string,
        field: string = "",
        refUrlOverwrite: string = ""
    ): RefCompatibility {
        return {
            externalSource: {
                name: this.name,
                label: this.label,
                icon: this.icon,
                description: this.description,
                sparqlEndpoint: "",
                frontpageUrl: this.frontpageUrl,
            },
            mapping: {
                externalField: field !== "" ? field : property,
                ontologyProperty: this.ontologyProperty(property),
                ontologyUri: this.ontologyUri(property),
            },
            //relation: "",//not used yet ?
            documentationUrl: refUrlOverwrite ? refUrlOverwrite : this.refUri(property),
        } as RefCompatibility;
    }
}

/**
 * export type RefCompatibility = {
 *     externalSource: {
 *         name: string;
 *         sparqlEndpoint?: string;
 *         //graph?: string;
 *     };
 *     mapping: {
 *         externalField: string;
 *         ontologyProperty?: CompatibleOntologyPropertyPrefix;
 *         ontologyUri?: string;
 *     };
 *     relation?: string;
 *     documentationUrl?: string;
 * };
 */
