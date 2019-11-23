import "mocha";

import TypeScriptFile from "../../src/app/TypeScriptFile";
import { expect } from "chai";

describe(TypeScriptFile.name, () => {
	describe("toClassModelArray", () => {
		it("returns an empty array of class models when given a blank file", () => {
			let classModels = (new TypeScriptFile("")).toClassModelArray();

			expect(classModels.length).to.equal(0);
		});

		it("adds variables assigned in a constructor to the class model", () => {
			let variableName = "myVariable";
			let classModels = (new TypeScriptFile(`class Test { constructor() { this.${variableName} = null; } }`)).toClassModelArray();
			let classModel = classModels[0];

			expect(classModel.variables.size).to.equal(1);
			expect(classModel.variables.pick().name).to.equal(variableName);
		});

		it("adds methods to the class model", () => {
			let methodName = "myMethod";
			let classModels = (new TypeScriptFile(`class Test { ${methodName}() { return true; } }`)).toClassModelArray();
			let classModel = classModels[0];

			expect(classModel.methods.size).to.equal(1);
			expect(classModel.methods.pick().name).to.equal(methodName);
		});

		it("adds variables referenced in a method to the method's references", () => {
			let methodName = "myMethod";
			let variableName = "myVariable";
			let classModels = (new TypeScriptFile(`class Test { constructor() { this.${variableName} = null; } ${methodName}() { return this.${variableName}; } }`)).toClassModelArray();
			let methods = classModels[0].methods;

			expect(methods.pick().references.size).to.equal(1);
			expect(methods.pick().references.pick().name).to.equal(variableName);
		});

		it("adds getters to the class model", () => {
			let getterName = "myGetter";
			let classModels = (new TypeScriptFile(`class Test { get ${getterName}() { return true; } }`)).toClassModelArray();
			let classModel = classModels[0];

			expect(classModel.getters.size).to.equal(1);
			expect(classModel.getters.pick().name).to.equal(getterName);
		});

		it("adds variables referenced in a getter to the getter's references", () => {
			let getterName = "myGetter";
			let variableName = "myVariable";
			let classModels = (new TypeScriptFile(`class Test { constructor() { this.${variableName} = null; } get ${getterName}() { return this.${variableName}; } }`)).toClassModelArray();
			let getters = classModels[0].getters;

			expect(getters.pick().references.size).to.equal(1);
			expect(getters.pick().references.pick().name).to.equal(variableName);
		});

		it("adds setters to the class model", () => {
			let setterName = "mySetter";
			let classModels = (new TypeScriptFile(`class Test { set ${setterName}(input) { return; } }`)).toClassModelArray();
			let classModel = classModels[0];

			expect(classModel.setters.size).to.equal(1);
			expect(classModel.setters.pick().name).to.equal(setterName);
		});

		it("adds variables referenced in a setter to the setter's references", () => {
			let setterName = "mySetter";
			let variableName = "myVariable";
			let classModels = (new TypeScriptFile(`class Test { constructor() { this.${variableName} = null; } set ${setterName}(input) { this.${variableName} = input; } }`)).toClassModelArray();
			let setters = classModels[0].setters;

			expect(setters.pick().references.size).to.equal(1);
			expect(setters.pick().references.pick().name).to.equal(variableName);
		});

		it("adds variables assigned in a method to the class model", () => {
			let variableName = "myVariable";
			let methodName = "myMethod";
			let classModels = (new TypeScriptFile(`class Test { ${methodName}() { this.${variableName} = 1; } }`)).toClassModelArray();
			let methods = classModels[0].methods;

			expect(methods.pick().references.size).to.equal(1);
			expect(methods.pick().references.pick().name).to.equal(variableName);
		});

		it("adds variables assigned in a method to the class model", () => {
			let variableName = "var1";
			let classModels = (new TypeScriptFile(`import * as moment from 'moment'; export default class Test { foo() { this.${variableName} = 1; return this.${variableName}; } bar() { return this.${variableName} && this.${variableName} + 1; } baz() { if (this.${variableName}) return this.${variableName} + 2; } }`, "module")).toClassModelArray();
			let classModel = classModels[0];
			let methods = classModel.methods;
			let variables = classModel.variables;

			expect(variables.size).to.equal(1);
			expect(variables.pick().name).to.equal(variableName);
			expect(methods.pick().references.size).to.equal(1);
			expect(methods.pick().references.pick().name).to.equal(variableName);
		});
	});
});
