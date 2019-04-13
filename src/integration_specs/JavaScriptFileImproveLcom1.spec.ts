import "mocha";

import JavaScriptFile from "../app/JavaScriptFile";
import Lcom1Converter from "../app/metrics/lcom1/Lcom1Converter";
import Lcom1Metric from "../app/metrics/lcom1/Lcom1Metric";
import MaximalCliqueTransformer from "../app/transformers/MaximalCliqueTransformer";
import { expect } from "chai";

describe("Transform JavaScript file to improve LCOM1", () => {
	it("does not worsen LCOM1 when given an empty class", () => {
		let javaScript = `class Test { }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let initialLcom1 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		// Get transformed LCOM1.
		let transformedLcom1 = metric.evaluate(transformedClassModel);

		expect(transformedLcom1 <= initialLcom1).to.equal(true);
	});

	it("does not worsen LCOM1 when given a class with one variable", () => {
		let javaScript = `class AnotherTest { constructor() { this.testVar = 'foo'; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = javaScriptFile.toClassModelArray()[0];
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
		let javaScript = `class AnotherTest { constructor() { ${variableAssignmentSource} } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom1Converter();
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		expect(transformedClassModel.variables.length).to.equal(1);
		expect(transformedClassModel.variables[0].name).to.equal(variableName);
		expect(transformedClassModel.variables[0].toString()).to.equal(variableAssignmentSource);
	});

	it("does not worsen LCOM1 when given a class with one variable and one method that doesn't reference the variable", () => {
		let javaScript = `class AnotherTest { constructor() { this.testVar = 'foo'; } testMethod() { } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = javaScriptFile.toClassModelArray()[0];
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
		let javaScript = `class AnotherTest { constructor() { ${variableAssignmentSource} } ${methodSource} }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom1Converter();
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		let classModel = javaScriptFile.toClassModelArray()[0];
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		expect(transformedClassModel.variables.length).to.equal(1);
		expect(transformedClassModel.variables[0].name).to.equal(variableName);
		expect(transformedClassModel.variables[0].toString()).to.equal(variableAssignmentSource);
		expect(transformedClassModel.methods.length).to.equal(1);
		expect(transformedClassModel.methods[0].name).to.equal(methodName);
		expect(transformedClassModel.methods[0].toString()).to.equal(methodSource);
	});

	it("does not worsen LCOM1 when given a class with one variable and one method that references the variable", () => {
		let javaScript = `class AnotherTest { constructor() { this.testVar = 'foo'; } testMethod() { return this.testVar; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let initialLcom1 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		// Get transformed LCOM1.
		let transformedLcom1 = metric.evaluate(transformedClassModel);

		expect(transformedLcom1 <= initialLcom1).to.equal(true);
	});
});
