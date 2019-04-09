import VariableModel from "./VariableModel";

/**
 * A model of a method, in the sense of object-oriented programming.
 */
export default class MethodModel {
	private _references: VariableModel[] = [];

	/**
	 * Constructor.
	 * @param _name the method's name
	 * @param _source the original source code for the method
	 */
	constructor(private _name: string, private _source: string) { }

	/**
	 * The name of the method, for example, "foo" in "public foo(): void {}".
	 */
	get name(): string {
		return this._name;
	}

	/**
	 * The variables the method references.
	 */
	get references(): VariableModel[] {
		return this._references;
	}

	/**
	 * Serializes the method as a string.
	 */
	toString(): string {
		return this._source;
	}
}
