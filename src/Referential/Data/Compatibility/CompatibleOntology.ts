import { Ontology } from "@ref/Data/Compatibility/Ontology";
import { RefCompatibility } from "@ref/Data/types";

export type CompatibleOntologyPropertyPrefix = `${string}:${string}`;

export interface CompatibleOntologyParam {
    referentialUrl: string;
    ontologyUrl: string;
    name: string;
    prefix: string;
    suffix?: string;
}

export default class CompatibleOntology implements Ontology {
    referentialUrl: string;
    ontologyUrl: string;
    name: string;
    prefix: string;
    suffix: string;

    constructor(params: CompatibleOntologyParam) {
        this.referentialUrl = params.referentialUrl;
        this.ontologyUrl = params.ontologyUrl;
        this.name = params.name;
        this.prefix = params.prefix;
        this.suffix = params.suffix ?? "";
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
                sparqlEndpoint: "",
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
