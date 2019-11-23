import EquatableSet from "../EquatableSet";
import MethodModel from "./MethodModel";
import VariableModel from "./VariableModel";

// TODO: create method "references" or "hasAggregrationOF" that tells whether the class/model
// has a reference to a given VariableModel? Maybe also method "isComposedOf"?
/**
 * A model of a class, in the sense of object-oriented programming.
 */
export default class ClassModel {
	/**
	 * Getters.
	 */
	getters: EquatableSet<MethodModel> = new EquatableSet();

	/**
	 * Methods.
	 */
	methods: EquatableSet<MethodModel> = new EquatableSet();

	/**
	 * Setters.
	 */
	setters: EquatableSet<MethodModel> = new EquatableSet();

	/**
	 * Instance variables.
	 */
	variables: EquatableSet<VariableModel> = new EquatableSet();

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
		return this.variables.difference(this.methodVariables);
	}

	/**
	 * Variables references in a method.
	 */
	get methodVariables():  EquatableSet<VariableModel> {
		return this.methods
			.map(method => method.references)
			.flatten()
			.filter(reference => !this.variables.has(reference));
	}

	/**
	 * The class's name; for example, "Person" given "class Person."
	 */
	get name(): string {
		return this._name;
	}

	/**
	 * Serializes the class as a string.
	 */
	toString(): string {
		let formatMethod = (method: MethodModel) => "\n\n\t" + method.toString();
		let variablesString = `${this.variables.mapArray(variable => `${variable.toString()}\n`)}`;
		let gettersString = `${this.getters.mapArray(formatMethod)}`;
		let methodsString = `${this.methods.mapArray(formatMethod)}`;
		let settersString = `${this.getters.mapArray(formatMethod)}`;
		return `class ${this._name} {\n\tconstructor () {\n\t\t${variablesString}\t}${gettersString}${settersString}${methodsString}\n}\n`;
	}
}
