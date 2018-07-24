import MethodModel from "./MethodModel";

export default class ClassModel {
    private _name: string;
	private _methods: MethodModel[];
    private _variables: string[];

    constructor(name: string) {
        this._name = name;
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

	set variables(variables: string[]) {
		this._variables = variables;
	}

	get variables(): string[] {
		return this._variables;
	}

	toString(): string {
		return `class ${this._name} {\n\tconstructor () {\n\t\t${this._variables.map(variable => `this.${variable} = null;\n`)}\t}${this._methods.map(method => "\n\n\t" + method.toString())} \n}\n`;
	}
}