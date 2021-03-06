import MethodModel from "./MethodModel";
import VariableModel from "./VariableModel";
import { difference } from "lodash";

/**
 * A model of a class, in the sense of object-oriented programming.
 */
export default class ClassModel {
	// TODO: should these be sets?
	/**
	 * Getters.
	 */
	getters: MethodModel[] = [];

	/**
	 * Methods.
	 */
	methods: MethodModel[] = [];

	/**
	 * Setters.
	 */
	setters: MethodModel[] = [];

	/**
	 * Instance variables.
	 */
	variables: VariableModel[] = [];

	/**
	 * Constructor.
	 * @param _name the class's name
	 */
	constructor(private _name: string) { }

	// TODO: add tests
	/**
	 * Variables referenced in the constructor.
	 */
	get constructorVariables() {
		return difference(this.variables, this.methodVariables);
	}

	/**
	 * Variables references in a method.
	 */
	get methodVariables(): VariableModel[] {
		return this.methods
			.map(m => m.references)
			.reduce((a, b) => a.concat(b), [])
			.filter(r => !this.variables.includes(r));
	}

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
		let formatMethod = (method: MethodModel) => "\n\n\t" + method.toString();
		let variablesString = `${this.variables.map(variable => `${variable.toString()}\n`)}`;
		let gettersString = `${this.getters.map(formatMethod)}`;
		let methodsString = `${this.methods.map(formatMethod)}`;
		let settersString = `${this.getters.map(formatMethod)}`;
		return `class ${this._name} {\n\tconstructor () {\n\t\t${variablesString}\t}${gettersString}${settersString}${methodsString}\n}\n`;
	}
}
