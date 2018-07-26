import MethodModel from "./MethodModel";
import VariableModel from "./VariableModel";

export default class ClassModel {
	private _methods: MethodModel[];
    private _variables: VariableModel[];

    constructor(private _name: string) {
		this._methods = [];
		this._variables = [];
	}

	set methods(methodModels: MethodModel[]) {
		this._methods = methodModels;
	}

	get methods(): MethodModel[] {
		return this._methods;
	}

	get name(): string {
		return this._name;
	}

	set variables(variables: VariableModel[]) {
		this._variables = variables;
	}

	get variables(): VariableModel[] {
		return this._variables;
	}

	toString(): string {
		return `class ${this._name} {\n\tconstructor () {\n\t\t${this._variables.map(variable => `${variable.toString()}\n`)}\t}${this._methods.map(method => "\n\n\t" + method.toString())} \n}\n`;
	}
}