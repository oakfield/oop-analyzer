import "mocha";

import ComponentsTransformer from "../../app/transformers/ComponentsTransformer";
import JavaScriptFile from "../../app/JavaScriptFile";
import Lcom4Converter from "../../app/metrics/lcom4/Lcom4Converter";
import Lcom4Metric from "../../app/metrics/lcom4/Lcom4Metric";
import { expect } from "chai";

describe("Transform JavaScript file to improve LCOM4", () => {
	it("does not worsen LCOM4 when given an empty class", () => {
		let javaScript = `class Test { }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom4Converter();
		let metric = new Lcom4Metric(converter);
		let componentsTransformer = new ComponentsTransformer(converter);

		// Get initial LCOM4.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let initialLcom4 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = componentsTransformer.transform(classModel)[0];

		// Get transformed LCOM4.
		let transformedLcom4 = metric.evaluate(transformedClassModel);

		expect(transformedLcom4 <= initialLcom4).to.equal(true);
	});

	it("does not worsen LCOM4 when given a class with one variable", () => {
		let javaScript = `class AnotherTest { constructor() { this.testVar = 'foo'; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom4Converter();
		let metric = new Lcom4Metric(converter);
		let componentsTransformer = new ComponentsTransformer(converter);

		// Get initial LCOM4.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let initialLcom4 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = componentsTransformer.transform(classModel)[0];

		// Get transformed LCOM4.
		let transformedLcom4 = metric.evaluate(transformedClassModel);

		expect(transformedLcom4 <= initialLcom4).to.equal(true);
	});

	it("preserves the content of a class with one variable", () => {
		const variableName = "testVar";
		const variableAssignmentSource = `this.${variableName} = 'foo';`;
		let javaScript = `class AnotherTest { constructor() { ${variableAssignmentSource} } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom4Converter();
		let componentsTransformer = new ComponentsTransformer(converter);

		// Get initial LCOM4.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let transformedClassModel = componentsTransformer.transform(classModel)[0];

		expect(transformedClassModel.variables.length).to.equal(1);
		expect(transformedClassModel.variables[0].name).to.equal(variableName);
		expect(transformedClassModel.variables[0].toString()).to.equal(variableAssignmentSource);
	});

	it("does not worsen LCOM4 when given a class with one variable and one method that doesn't reference the variable", () => {
		let javaScript = `class AnotherTest { constructor() { this.testVar = 'foo'; } testMethod() { } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom4Converter();
		let metric = new Lcom4Metric(converter);
		let componentsTransformer = new ComponentsTransformer(converter);

		// Get initial LCOM4.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let initialLcom4 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = componentsTransformer.transform(classModel)[0];

		// Get transformed LCOM4.
		let transformedLcom4 = metric.evaluate(transformedClassModel);

		expect(transformedLcom4 <= initialLcom4).to.equal(true);
	});

	it("preserves the content of a class with one variable and one method that doesn't reference the variable", () => {
		const variableName = "testVar";
		const variableAssignmentSource = `this.${variableName} = 'foo';`;
		const methodName = "testMethod";
		const methodSource = `${methodName}() { }`;
		let javaScript = `class AnotherTest { constructor() { ${variableAssignmentSource} } ${methodSource} }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom4Converter();
		let componentsTransformer = new ComponentsTransformer(converter);

		let classModel = javaScriptFile.toClassModelArray()[0];
		let transformedClassModel = componentsTransformer.transform(classModel)[0];

		expect(transformedClassModel.variables.length).to.equal(1);
		expect(transformedClassModel.variables[0].name).to.equal(variableName);
		expect(transformedClassModel.variables[0].toString()).to.equal(variableAssignmentSource);
		expect(transformedClassModel.methods.length).to.equal(1);
		expect(transformedClassModel.methods[0].name).to.equal(methodName);
		expect(transformedClassModel.methods[0].toString()).to.equal(methodSource);
	});

	it("does not worsen LCOM4 when given a class with one variable and one method that references the variable", () => {
		let javaScript = `class AnotherTest { constructor() { this.testVar = 'foo'; } testMethod() { return this.testVar; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom4Converter();
		let metric = new Lcom4Metric(converter);
		let componentsTransformer = new ComponentsTransformer(converter);

		// Get initial LCOM4.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let initialLcom4 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = componentsTransformer.transform(classModel)[0];

		// Get transformed LCOM4.
		let transformedLcom4 = metric.evaluate(transformedClassModel);

		expect(transformedLcom4 <= initialLcom4).to.equal(true);
	});

	it("preserves the content of a class with one variable and one method that references the variable", () => {
		const variableName = "testVar";
		const variableAssignmentSource = `this.${variableName} = 'foo';`;
		const methodName = "testMethod";
		const methodSource = `${methodName}() { }`;
		let javaScript = `class AnotherTest { constructor() { ${variableAssignmentSource} } ${methodSource} }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom4Converter();
		let componentsTransformer = new ComponentsTransformer(converter);

		let classModel = javaScriptFile.toClassModelArray()[0];
		let transformedClassModel = componentsTransformer.transform(classModel)[0];

		expect(transformedClassModel.variables.length).to.equal(1);
		expect(transformedClassModel.variables[0].name).to.equal(variableName);
		expect(transformedClassModel.variables[0].toString()).to.equal(variableAssignmentSource);
		expect(transformedClassModel.methods.length).to.equal(1);
		expect(transformedClassModel.methods[0].name).to.equal(methodName);
		expect(transformedClassModel.methods[0].toString()).to.equal(methodSource);
	});

	it("does not worsen LCOM4 when given a class with two variables and one method that references a variable", () => {
		let javaScript = `class AnotherTest { constructor() { this.testVar1 = 'foo'; this.testVar2 = 'bar'; } testMethod() { return this.testVar; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom4Converter();
		let metric = new Lcom4Metric(converter);
		let componentsTransformer = new ComponentsTransformer(converter);

		// Get initial LCOM4.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let initialLcom4 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = componentsTransformer.transform(classModel)[0];

		// Get transformed LCOM4.
		let transformedLcom4 = metric.evaluate(transformedClassModel);

		expect(transformedLcom4 <= initialLcom4).to.equal(true);
	});

	it("preserves the content of a class with two variables and one method that references a variable", () => {
		const variable1Name = "testVar1";
		const variable1AssignmentSource = `this.${variable1Name} = 'foo';`;
		const variable2Name = "testVar2";
		const variable2AssignmentSource = `this.${variable2Name} = 'foo';`;
		const methodName = "testMethod";
		const methodSource = `${methodName}() { }`;
		let javaScript = `class AnotherTest { constructor() { ${variable1AssignmentSource} ${variable2AssignmentSource} } ${methodSource} }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom4Converter();
		let componentsTransformer = new ComponentsTransformer(converter);

		let classModel = javaScriptFile.toClassModelArray()[0];
		let transformedClassModel = componentsTransformer.transform(classModel)[0];

		expect(transformedClassModel.variables.length).to.equal(2);
		expect(transformedClassModel.variables.map(v => v.name)).to.contain(variable1Name);
		expect(transformedClassModel.variables.map(v => v.toString())).to.contain(variable1AssignmentSource);
		expect(transformedClassModel.variables.map(v => v.name)).to.contain(variable2Name);
		expect(transformedClassModel.variables.map(v => v.toString())).to.contain(variable2AssignmentSource);
		expect(transformedClassModel.methods.length).to.equal(1);
		expect(transformedClassModel.methods[0].name).to.equal(methodName);
		expect(transformedClassModel.methods[0].toString()).to.equal(methodSource);
	});

	it("improves LCOM4 when given a class with two variables and two methods that each reference a variable", () => {
		let javaScript = `class AnotherTest { constructor() { this.testVar1 = 'foo'; this.testVar2 = 'bar'; } testMethod1() { return this.testVar1; } testMethod2() { return this.testVar2; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom4Converter();
		let metric = new Lcom4Metric(converter);
		let componentsTransformer = new ComponentsTransformer(converter);

		// Get initial LCOM4.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let initialLcom4 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModels = componentsTransformer.transform(classModel);

		// Get transformed LCOM4.
		let transformed1Lcom4 = metric.evaluate(transformedClassModels[0]);
		let transformed2Lcom4 = metric.evaluate(transformedClassModels[1]);

		expect(transformed1Lcom4 < initialLcom4).to.equal(true);
		expect(transformed2Lcom4 < initialLcom4).to.equal(true);
	});
});
