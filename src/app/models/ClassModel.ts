import MethodModel from "./MethodModel";
import VariableModel from "./VariableModel";

/**
 * A model of a class, in the sense of object-oriented programming.
 */
export default class ClassModel {
	getters: MethodModel[] = [];
	methods: MethodModel[] = [];
	setters: MethodModel[] = [];
    variables: VariableModel[] = [];

	/**
	 * Constructor.
	 * @param _name the class's name
	 */
    constructor(private _name: string) { }

	/**
	 * The class's name, for example, "Person" given "class Person."
	 */
	get name(): string {
		return this._name;
	}

	/**
	 * Serializes the class as a string.
	 */
	toString(): string {
		let formatMethod = (method: { toString: () => string; }) => "\n\n\t" + method.toString();
		let variablesString = `${this.variables.map(variable => `${variable.toString()}\n`)}`;
		let gettersString = `${this.getters.map(formatMethod)}`;
		let methodsString = `${this.methods.map(formatMethod)}`;
		let settersString = `${this.getters.map(formatMethod)}`;
		return `class ${this._name} {\n\tconstructor () {\n\t\t${variablesString}\t}${gettersString}${settersString}${methodsString}\n}\n`;
	}
}
