import VariableModel from "./VariableModel";

export default class MethodModel {
    private _references: VariableModel[] = [];

    constructor(private _name: string, private _source: string) { }

    get name(): string {
        return this._name;
    }

    get references(): VariableModel[] {
        return this._references;
    }

    toString(): string {
        return this._source;
    }
}