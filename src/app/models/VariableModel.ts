/**
 * A model of a variable, in the sense of programming.
 */
export default class VariableModel {
    /**
     * Constructor.
     * @param _name the variable's name
     * @param _assignmentSource the line of code, typically in the constructor, in which the variable was initialized
     */
    constructor(private _name: string, private _assignmentSource?: string) { }

    /**
     * The variable's name.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Serializes the variable as a string.
     */
    toString(): string {
        return this._assignmentSource ? `${this._assignmentSource};` : `this.${this.name} = null;`
    }
}
