export default class MethodModel {
    private _name: string;
    private _references: string[];
    private _source: string;

    constructor(name: string, source: string) {
        this._name = name;
        this._references = [];
        this._source = source;
    }

    get name(): string {
        return this._name;
    }

    get references(): string[] {
        return this._references;
    }

    toString(): string {
        return this._source;
    }
}