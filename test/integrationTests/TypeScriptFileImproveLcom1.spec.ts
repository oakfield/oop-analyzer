import "mocha";

import Lcom1Converter from "../../src/app/metrics/lcom1/Lcom1Converter";
import Lcom1Metric from "../../src/app/metrics/lcom1/Lcom1Metric";
import MaximalCliqueTransformer from "../../src/app/transformers/maximalCliques/MaximalCliqueTransformer";
import TypeScriptFile from "../../src/app/TypeScriptFile";
import { expect } from "chai";

describe("Transform TypeScript file to improve LCOM1", () => {
	it("does not worsen LCOM1 when given an empty class", () => {
		let typeScript = `class Test { }`;
		let typeScriptFile = new TypeScriptFile(typeScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = typeScriptFile.toClassModelArray()[0];
		let initialLcom1 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		// Get transformed LCOM1.
		let transformedLcom1 = metric.evaluate(transformedClassModel);

		expect(transformedLcom1 <= initialLcom1).to.equal(true);
	});

	it("does not worsen LCOM1 when given a class with one variable", () => {
		let typeScript = `class AnotherTest { constructor() { this.testVar = 'foo'; } }`;
		let typeScriptFile = new TypeScriptFile(typeScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = typeScriptFile.toClassModelArray()[0];
		let initialLcom1 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		// Get transformed LCOM1.
		let transformedLcom1 = metric.evaluate(transformedClassModel);

		expect(transformedLcom1 <= initialLcom1).to.equal(true);
	});

	it("preserves the content of a class with one variable", () => {
		const variableName = "testVar";
		const variableAssignmentSource = `this.${variableName} = 'foo';`;
		let typeScript = `class AnotherTest { constructor() { ${variableAssignmentSource} } }`;
		let typeScriptFile = new TypeScriptFile(typeScript);
		let converter = new Lcom1Converter();
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = typeScriptFile.toClassModelArray()[0];
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		expect(transformedClassModel.variables.size).to.equal(1);
		expect(transformedClassModel.variables.every(variable => variable.name === variableName));
		expect(transformedClassModel.variables.every(variable => variable.toString() === variableAssignmentSource));;
	});

	it("does not worsen LCOM1 when given a class with one variable and one method that doesn't reference the variable", () => {
		let typeScript = `class AnotherTest { constructor() { this.testVar = 'foo'; } testMethod() { } }`;
		let typeScriptFile = new TypeScriptFile(typeScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = typeScriptFile.toClassModelArray()[0];
		let initialLcom1 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		// Get transformed LCOM1.
		let transformedLcom1 = metric.evaluate(transformedClassModel);

		expect(transformedLcom1 <= initialLcom1).to.equal(true);
	});

	it("preserves the content of a class with one variable and one method that doesn't reference the variable", () => {
		const variableName = "testVar";
		const variableAssignmentSource = `this.${variableName} = 'foo';`;
		const methodName = "testMethod";
		const methodSource = `${methodName}() { }`;
		let typeScript = `class AnotherTest { constructor() { ${variableAssignmentSource} } ${methodSource} }`;
		let typeScriptFile = new TypeScriptFile(typeScript);
		let converter = new Lcom1Converter();
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		let classModel = typeScriptFile.toClassModelArray()[0];
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		expect(transformedClassModel.variables.size).to.equal(1);
		expect(transformedClassModel.variables.every(variable => variable.name === variableName));
		expect(transformedClassModel.variables.every(variable => variable.toString() === variableAssignmentSource));;
		expect(transformedClassModel.methods.size).to.equal(1);
		expect(transformedClassModel.methods.every(method => method.name === methodName));
		expect(transformedClassModel.methods.every(method => method.toString() === methodSource));
	});

	it("does not worsen LCOM1 when given a class with one variable and one method that references the variable", () => {
		let typeScript = `class AnotherTest { constructor() { this.testVar = 'foo'; } testMethod() { return this.testVar; } }`;
		let typeScriptFile = new TypeScriptFile(typeScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = typeScriptFile.toClassModelArray()[0];
		let initialLcom1 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		// Get transformed LCOM1.
		let transformedLcom1 = metric.evaluate(transformedClassModel);

		expect(transformedLcom1 <= initialLcom1).to.equal(true);
	});

	it("preserves the content of a class with one variable and one method that references the variable", () => {
		const variableName = "testVar";
		const variableAssignmentSource = `this.${variableName} = 'foo';`;
		const methodName = "testMethod";
		const methodSource = `${methodName}() { }`;
		let typeScript = `class AnotherTest { constructor() { ${variableAssignmentSource} } ${methodSource} }`;
		let typeScriptFile = new TypeScriptFile(typeScript);
		let converter = new Lcom1Converter();
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		let classModel = typeScriptFile.toClassModelArray()[0];
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		expect(transformedClassModel.variables.size).to.equal(1);
		expect(transformedClassModel.variables.every(variable => variable.name === variableName));
		expect(transformedClassModel.variables.every(variable => variable.toString() === variableAssignmentSource));
		expect(transformedClassModel.methods.size).to.equal(1);
		expect(transformedClassModel.methods.every(method => method.name === methodName));
		expect(transformedClassModel.methods.every(method => method.toString() === methodSource));
	});

	it("does not worsen LCOM1 when given a class with two variables and one method that references a variable", () => {
		let typeScript = `class AnotherTest { constructor() { this.testVar1 = 'foo'; this.testVar2 = 'bar'; } testMethod() { return this.testVar; } }`;
		let typeScriptFile = new TypeScriptFile(typeScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = typeScriptFile.toClassModelArray()[0];
		let initialLcom1 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		// Get transformed LCOM1.
		let transformedLcom1 = metric.evaluate(transformedClassModel);

		expect(transformedLcom1 <= initialLcom1).to.equal(true);
	});

	it("preserves the content of a class with two variables and one method that references a variable", () => {
		const variable1Name = "testVar1";
		const variable1AssignmentSource = `this.${variable1Name} = 'foo';`;
		const variable2Name = "testVar2";
		const variable2AssignmentSource = `this.${variable2Name} = 'foo';`;
		const methodName = "testMethod";
		const methodSource = `${methodName}() { }`;
		let typeScript = `class AnotherTest { constructor() { ${variable1AssignmentSource} ${variable2AssignmentSource} } ${methodSource} }`;
		let typeScriptFile = new TypeScriptFile(typeScript);
		let converter = new Lcom1Converter();
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		let classModel = typeScriptFile.toClassModelArray()[0];
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		expect(transformedClassModel.variables.size).to.equal(2);
		expect(transformedClassModel.variables.mapArray(v => v.name)).to.contain(variable1Name);
		expect(transformedClassModel.variables.mapArray(v => v.toString())).to.contain(variable1AssignmentSource);
		expect(transformedClassModel.variables.mapArray(v => v.name)).to.contain(variable2Name);
		expect(transformedClassModel.variables.mapArray(v => v.toString())).to.contain(variable2AssignmentSource);
		expect(transformedClassModel.methods.size).to.equal(1);
		expect(transformedClassModel.methods.every(method => method.name === methodName));
		expect(transformedClassModel.methods.every(method => method.toString() === methodSource));
	});

	it("improves LCOM1 when given a class with two variables and two methods that each reference a variable", () => {
		let typeScript = `class AnotherTest { constructor() { this.testVar1 = 'foo'; this.testVar2 = 'bar'; } testMethod1() { return this.testVar1; } testMethod2() { return this.testVar2; } }`;
		let typeScriptFile = new TypeScriptFile(typeScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = typeScriptFile.toClassModelArray()[0];
		let initialLcom1 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModels = maximalCliqueTransformer.transform(classModel);

		// Get transformed LCOM1.
		let transformed1Lcom1 = metric.evaluate(transformedClassModels[0]);
		let transformed2Lcom1 = metric.evaluate(transformedClassModels[1]);

		expect(transformed1Lcom1 < initialLcom1).to.equal(true);
		expect(transformed2Lcom1 < initialLcom1).to.equal(true);
	});
});
