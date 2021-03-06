import "mocha";

import JavaScriptFile from "../../src/app/JavaScriptFile";
import { expect } from "chai";

describe(JavaScriptFile.name, () => {
	describe("toClassModelArray", () => {
		// TODO: add a test for unnamed classes
		// export default class { }

		// TODO: consider adding a test for syntax errors
		it("returns an empty array of class models when given a blank file", () => {
			let classModels = (new JavaScriptFile("")).toClassModelArray();

			expect(classModels.length).to.equal(0);
		});

		it("adds variables assigned in a constructor to the class model", () => {
			let variableName = "myVariable";
			let classModels = (new JavaScriptFile(`class Test { constructor() { this.${variableName} = null; } }`)).toClassModelArray();
			let classModel = classModels[0];

			expect(classModel.variables.length).to.equal(1);
			expect(classModel.variables[0].name).to.equal(variableName);
		});

		it("adds methods to the class model", () => {
			let methodName = "myMethod";
			let classModels = (new JavaScriptFile(`class Test { ${methodName}() { return true; } }`)).toClassModelArray();
			let classModel = classModels[0];

			expect(classModel.methods.length).to.equal(1);
			expect(classModel.methods[0].name).to.equal(methodName);
		});

		it("adds variables referenced in a method to the method's references", () => {
			let methodName = "myMethod";
			let variableName = "myVariable";
			let classModels = (new JavaScriptFile(`class Test { constructor() { this.${variableName} = null; } ${methodName}() { return this.${variableName}; } }`)).toClassModelArray();
			let methods = classModels[0].methods;

			expect(methods[0].references.length).to.equal(1);
			expect(methods[0].references[0].name).to.equal(variableName);
		});

		it("adds getters to the class model", () => {
			let getterName = "myGetter";
			let classModels = (new JavaScriptFile(`class Test { get ${getterName}() { return true; } }`)).toClassModelArray();
			let classModel = classModels[0];

			expect(classModel.getters.length).to.equal(1);
			expect(classModel.getters[0].name).to.equal(getterName);
		});

		it("adds variables referenced in a getter to the getter's references", () => {
			let getterName = "myGetter";
			let variableName = "myVariable";
			let classModels = (new JavaScriptFile(`class Test { constructor() { this.${variableName} = null; } get ${getterName}() { return this.${variableName}; } }`)).toClassModelArray();
			let getters = classModels[0].getters;

			expect(getters[0].references.length).to.equal(1);
			expect(getters[0].references[0].name).to.equal(variableName);
		});

		it("adds setters to the class model", () => {
			let setterName = "mySetter";
			let classModels = (new JavaScriptFile(`class Test { set ${setterName}(input) { return; } }`)).toClassModelArray();
			let classModel = classModels[0];

			expect(classModel.setters.length).to.equal(1);
			expect(classModel.setters[0].name).to.equal(setterName);
		});

		it("adds variables referenced in a setter to the setter's references", () => {
			let setterName = "mySetter";
			let variableName = "myVariable";
			let classModels = (new JavaScriptFile(`class Test { constructor() { this.${variableName} = null; } set ${setterName}(input) { this.${variableName} = input; } }`)).toClassModelArray();
			let setters = classModels[0].setters;

			expect(setters[0].references.length).to.equal(1);
			expect(setters[0].references[0].name).to.equal(variableName);
		});

		it("adds variables assigned in a function to the class model", () => {
			let variableName = "myVariable";
			let methodName = "myMethod";
			let classModels = (new JavaScriptFile(`class Test { ${methodName}() { this.${variableName} = 1; } }`)).toClassModelArray();
			let methods = classModels[0].methods;

			expect(methods[0].references.length).to.equal(1);
			expect(methods[0].references[0].name).to.equal(variableName);
		});

		it("adds variables assigned in a function to the class model", () => {
			let variableName = "var1";
			let classModels = (new JavaScriptFile(`import * as moment from 'moment'; export default class Test { foo() { this.${variableName} = 1; return this.${variableName}; } bar() { return this.${variableName} && this.${variableName} + 1; } baz() { if (this.${variableName}) return this.${variableName} + 2; } }`, "module")).toClassModelArray();
			let classModel = classModels[0];
			let methods = classModel.methods;
			let variables = classModel.variables;

			expect(variables.length).to.equal(1);
			expect(variables[0].name).to.equal(variableName);
			expect(methods[0].references.length).to.equal(1);
			expect(methods[0].references[0].name).to.equal(variableName);
		});
	});
});
