export default class ClassModel {
    constructor(name) {
        this._name = name;
    }

	get name() {
		return this._name;
	}

	toString() {
		let formatMethod = method => "\n\n\t" + method.toString();
		let variablesString = `${this.variables.map(variable => `${variable.toString()}\n`)}`;
		let gettersString = `${this.getters.map(formatMethod)}`;
		let methodsString = `${this.methods.map(formatMethod)}`;
		let settersString = `${this.getters.map(formatMethod)}`;
		return `class ${this._name} {\n\tconstructor () {\n\t\t${variablesString}\t}${gettersString}${settersString}${methodsString}\n}\n`;
	}
}