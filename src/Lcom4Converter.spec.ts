import Lcom4Converter from "./Lcom4Converter";
import { expect } from "chai";
import "mocha";
import ClassModel from "./ClassModel";
import MethodModel from "./MethodModel";

describe("convert", () => {
	it("returns an empty graph when the class has no variables or methods", () => {
		let testClass = new ClassModel("Test");
		let converter = new Lcom4Converter();

		expect(converter.convert(testClass).nodes).to.be.empty;
	});

	it("returns an empty graph when the class has no methods", () => {
		let testClass = new ClassModel("Test");
		testClass.variables = ["a"];

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
			testMethod["_references"] = ["x"];
			testClass.variables = ["a"];
			testClass.methods = [testMethod];
			let converted = (new Lcom4Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(1);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
		});

	it("returns a graph with two separate nodes when the class has two methods that have no common references",
		() => {
			let testClass = new ClassModel("Test");
			testClass.variables = ["a", "b"];
			let testMethod1 = new MethodModel("x", "");
			testMethod1["_references"] = ["a"];
			let testMethod2 = new MethodModel("y", "");
			testMethod2["_references"] = ["b"];
			testClass.methods = [testMethod1, testMethod2];
			let converted = (new Lcom4Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(2);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
		});

	it("returns a graph with two nodes when the class has two methods that reference the same variable",
		() => {
			let testClass = new ClassModel("Test");
			testClass.variables = ["a"];
			let testMethod1 = new MethodModel("x", "");
			testMethod1["_references"] = ["a"];
			let testMethod2 = new MethodModel("y", "");
			testMethod2["_references"] = ["a"];
			testClass.methods = [testMethod1, testMethod2];
			let converted = (new Lcom4Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(2);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 2)).to.be.true;
		});

	it("returns a graph with two nodes when the class has two methods that call each other", () => {
		let testClass = new ClassModel("Test");
		testClass.variables = [];
		let testMethod1 = new MethodModel("x", "");
		testMethod1["_references"] = ["y"];
		let testMethod2 = new MethodModel("y", "");
		testMethod2["_references"] = ["x"];
		testClass.methods = [testMethod1, testMethod2];
		let converted = (new Lcom4Converter()).convert(testClass);

		expect(converted.nodes.size).to.equal(2);
		expect(Array.from(converted.nodes).every(node => node.neighbors.size === 2)).to.be.true;
	});

	it("returns a graph with three self-connected nodes when the class has three methods referencing variables",
		() => {
			let testClass = new ClassModel("Test");
			testClass.variables = ["a", "b", "c"];
			let testMethod1 = new MethodModel("x", "");
			testMethod1["_references"] = ["a"];
			let testMethod2 = new MethodModel("y", "");
			testMethod2["_references"] = ["b"];
			let testMethod3 = new MethodModel("z", "");
			testMethod3["_references"] = ["c"];
			testClass.methods = [testMethod1, testMethod2, testMethod3];
			let converted = (new Lcom4Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(3);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
		});
});