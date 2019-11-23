import Equatable from "../Equatable";
import EquatableSet from "../EquatableSet";
import VariableModel from "./VariableModel";

/**
 * A model of a method, in the sense of object-oriented programming.
 */
export default class MethodModel implements Equatable {
	/**
	 * Instance variables referenced by the method.
	 */
	private _references: EquatableSet<VariableModel> = new EquatableSet();

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
	get references(): EquatableSet<VariableModel> {
		return this._references;
	}

	/**
	 * Returns true iff two method models are equal.
	 * @param methodModel the method model to compare
	 */
	equals(methodModel: MethodModel): boolean {
		// Two method models with the same source should be equal in all respects.
		return this._source === methodModel._source;
	}

	/**
	 * Serializes the method as a string.
	 */
	toString(): string {
		return this._source;
	}
}
