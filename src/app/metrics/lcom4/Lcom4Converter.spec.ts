import "mocha";

import ClassModel from "../../models/ClassModel";
import Lcom4Converter from "./Lcom4Converter";
import MethodModel from "../../models/MethodModel";
import VariableModel from "../../models/VariableModel";
import { expect } from "chai";

describe(Lcom4Converter.name, () => {
	describe("convert", () => {
		it("returns an empty graph when the class has no variables or methods", () => {
			let testClass = new ClassModel("Test");
			let converter = new Lcom4Converter();

			expect(converter.convert(testClass).nodes).to.be.empty;
		});

		it("returns an empty graph when the class has no methods", () => {
			let testClass = new ClassModel("Test");
			testClass.variables = [new VariableModel("a")];

			let converter = new Lcom4Converter();

			expect(converter.convert(testClass).nodes).to.be.empty;
		});

		it("returns a graph with one node and no edges when the class has no variables", () => {
			let testClass = new ClassModel("Test");
			testClass.methods = [new MethodModel("x", "")];
			let converted = (new Lcom4Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(1);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 0)).to.be.true;
		});

		it("returns a graph with one self-connected node when the class has one method referencing a variable",
			() => {
				let testClass = new ClassModel("Test");
				let testMethod = new MethodModel("x", "");
				let testVariable = new VariableModel("a");
				testMethod.references.push(testVariable);
				testClass.variables = [testVariable];
				testClass.methods = [testMethod];
				let converted = (new Lcom4Converter()).convert(testClass);

				expect(converted.nodes.size).to.equal(1);
				expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
			});

		it("returns a graph with two separate nodes when the class has two methods that have no common references",
			() => {
				let testClass = new ClassModel("Test");
				let testVariableA = new VariableModel("a");
				let testVariableB = new VariableModel("b");
				testClass.variables = [testVariableA, testVariableB];
				let testMethod1 = new MethodModel("x", "");
				testMethod1.references.push(testVariableA);
				let testMethod2 = new MethodModel("y", "");
				testMethod2.references.push(testVariableB);
				testClass.methods = [testMethod1, testMethod2];
				let converted = (new Lcom4Converter()).convert(testClass);

				expect(converted.nodes.size).to.equal(2);
				expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
			});

		it("returns a graph with two nodes when the class has two methods that reference the same variable",
			() => {
				let testClass = new ClassModel("Test");
				let testVariable = new VariableModel("a");
				testClass.variables = [testVariable];
				let testMethod1 = new MethodModel("x", "");
				testMethod1.references.push(testVariable);
				let testMethod2 = new MethodModel("y", "");
				testMethod2.references.push(testVariable);
				testClass.methods = [testMethod1, testMethod2];
				let converted = (new Lcom4Converter()).convert(testClass);

				expect(converted.nodes.size).to.equal(2);
				expect(Array.from(converted.nodes).every(node => node.neighbors.size === 2)).to.be.true;
			});

		it("returns a graph with two nodes when the class has two methods that call each other", () => {
			let testClass = new ClassModel("Test");
			testClass.variables = [];
			let testMethod1 = new MethodModel("x", "");
			testMethod1.references.push(new VariableModel("y"));
			let testMethod2 = new MethodModel("y", "");
			testMethod2.references.push(new VariableModel("x"));
			testClass.methods = [testMethod1, testMethod2];
			let converted = (new Lcom4Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(2);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 2)).to.be.true;
		});

		it("returns a graph with three self-connected nodes when the class has three methods referencing variables",
			() => {
				let testClass = new ClassModel("Test");
				let testVariableA = new VariableModel("a");
				let testVariableB = new VariableModel("b");
				let testVariableC = new VariableModel("c");
				testClass.variables = [testVariableA, testVariableB, testVariableC];
				let testMethod1 = new MethodModel("x", "");
				testMethod1.references.push(testVariableA);
				let testMethod2 = new MethodModel("y", "");
				testMethod2.references.push(testVariableB);
				let testMethod3 = new MethodModel("z", "");
				testMethod3.references.push(testVariableC);
				testClass.methods = [testMethod1, testMethod2, testMethod3];
				let converted = (new Lcom4Converter()).convert(testClass);

				expect(converted.nodes.size).to.equal(3);
				expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
			});
	});
});
