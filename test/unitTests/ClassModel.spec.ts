import "mocha";

import ClassModel from "../../src/app/models/ClassModel";
import MethodModel from "../../src/app/models/MethodModel";
import VariableModel from "../../src/app/models/VariableModel";
import { expect } from "chai";

describe(ClassModel.name, () => {
	describe("constructor", () => {
		it("does not throw", () => {
			expect(() => new ClassModel("Test")).not.to.throw();
		});
	});

	describe("get name", () => {
		it("return the class's name", () => {
			let className = "Test";
			let classModel = new ClassModel(className);

			expect(classModel.name).to.equal(className);
		});
	});

	describe("toString", () => {
		it("returns a string containing the class's information", () => {
			let className = "Test";
			let methodName = "foo";
			let variableName = "bar";
			let classModel = new ClassModel(className);
			classModel.methods.add(new MethodModel(methodName, `${methodName}() { }`));
			classModel.variables.add(new VariableModel(variableName, `this.${variableName} = 1;`))

			expect(classModel.toString()).to.include(className);
			expect(classModel.toString()).to.include(methodName);
			expect(classModel.toString()).to.include(variableName);
		})
	})
});
