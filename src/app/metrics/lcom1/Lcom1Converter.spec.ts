import "mocha";

import ClassModel from "../../models/ClassModel";
import Lcom1Converter from "./Lcom1Converter";
import MethodModel from "../../models/MethodModel";
import VariableModel from "../../models/VariableModel";
import { expect } from "chai";

describe(Lcom1Converter.name, () => {
	describe("convert", () => {
		it("returns an empty graph when the class has no variables or methods", () => {
			let testClass = new ClassModel("Test");
			let converter = new Lcom1Converter();

			expect(converter.convert(testClass).nodes).to.be.empty;
		});

		it("returns an empty graph when the class has no methods", () => {
			let testClass = new ClassModel("Test");
			testClass.variables = [new VariableModel("a")];

			let converter = new Lcom1Converter();

			expect(converter.convert(testClass).nodes).to.be.empty;
		});

		it("returns a graph with one node and no edges when the class has no variables", () => {
			let testClass = new ClassModel("Test");
			testClass.methods = [new MethodModel("x", "")];
			let converted = (new Lcom1Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(1);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 0)).to.be.true;
		});

		it("returns a graph with one node when the class has one method referencing a variable",
			() => {
				let testClass = new ClassModel("Test");
				let testMethod = new MethodModel("x", "");
				let testVariable = new VariableModel("a");
				testMethod.references.push(testVariable);
				testClass.variables = [testVariable];
				testClass.methods = [testMethod];
				let converted = (new Lcom1Converter()).convert(testClass);

				expect(converted.nodes.size).to.equal(1);
				expect(Array.from(converted.nodes).every(node => node.neighbors.size === 0)).to.be.true;
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
				let converted = (new Lcom1Converter()).convert(testClass);

				expect(converted.nodes.size).to.equal(2);
				expect(Array.from(converted.nodes).every(node => node.neighbors.size === 0)).to.be.true;
			});

		it("returns a graph with two connected nodes when the class has two methods that reference the same variable",
			() => {
				let testClass = new ClassModel("Test");
				let testVariable = new VariableModel("a");
				testClass.variables = [testVariable];
				let testMethod1 = new MethodModel("x", "");
				testMethod1.references.push(testVariable);
				let testMethod2 = new MethodModel("y", "");
				testMethod2.references.push(testVariable);
				testClass.methods = [testMethod1, testMethod2];
				let converted = (new Lcom1Converter()).convert(testClass);

				expect(converted.nodes.size).to.equal(2);
				expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
			});

		it("returns a graph with two unconnected nodes when the class has two methods one of which references the other", () => {
			let testClass = new ClassModel("Test");
			let testMethod1 = new MethodModel("x", "");
			let testMethod2 = new MethodModel("y", "");
			testMethod1.references.push(new VariableModel("y"));
			testClass.methods = [testMethod1, testMethod2];
			let converted = (new Lcom1Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(2);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size <= 1)).to.be.true;
		});
	});
});
