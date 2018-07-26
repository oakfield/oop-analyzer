export default class VariableModel {
    constructor(private _name: string, private _assignmentSource?: string) { }

    get name(): string {
        return this._name;
    }

    toString(): string {
        return this._assignmentSource ? `${this._assignmentSource};` : `this.${this.name} = null;`
    }
}