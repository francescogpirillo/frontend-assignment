export class Pokemon {
    id: string;
    name: string;
    types: string;
    classification: string;

    constructor(id: string, name: string, types: string, classification: string) {
        this.id = id;
        this.name = name;
        this.types = types;
        this.classification = classification;
    }
}