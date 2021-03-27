export class Pokemon {
    name: string;
    types: string;
    classification: string;

    constructor(name: string, types: string, classification: string) {
        this.name = name;
        this.types = types;
        this.classification = classification;
    }
}