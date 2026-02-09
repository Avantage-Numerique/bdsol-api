import { Ontology } from "@ref/Data/Compatibility/Ontology";

export type CompatibleOntologyPropertyPrefix = `${string}:${string}`;

export interface CompatibleOntologyParam {
    referentialUrl: string;
    ontologyUrl: string;
    name: string;
    prefix: string;
}

export default class CompatibleOntology implements Ontology {
    referentialUrl: string;
    ontologyUrl: string;
    name: string;
    prefix: string;

    constructor(params: CompatibleOntologyParam) {
        this.referentialUrl = params.referentialUrl;
        this.ontologyUrl = params.ontologyUrl;
        this.name = params.name;
        this.prefix = params.prefix;
    }

    ontologyProperty(value: string): CompatibleOntologyPropertyPrefix {
        return `${this.prefix}:${value}` as CompatibleOntologyPropertyPrefix;
    }

    refUri(path: string, prependSlash: boolean = true): string {
        return this.referentialUrl + (prependSlash ? "/" : "") + path;
    }
    ontologyUri(path: string, prependSlash: boolean = true): string {
        return this.ontologyUrl + (prependSlash ? "/" : "") + path;
    }
}
