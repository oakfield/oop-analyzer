import Lcom4Converter from "./Lcom4Converter";
import { expect } from "chai";
import "mocha";

describe("convert", () => {
	it("returns an empty graph when the class has no variables or methods", () => {
		let testClass = {
			variables: [],
			methods: []
		};
		let converter = new Lcom4Converter(JSON.stringify(testClass));

		expect(converter.convert().nodes).to.be.empty;
	});

	it("returns an empty graph when the class has no methods", () => {
		let testClass = {
			variables: ["a"],
			methods: []
		};
		let converter = new Lcom4Converter(JSON.stringify(testClass));

		expect(converter.convert().nodes).to.be.empty;
	});


	it("returns a graph with one node and no edges when the class has no variables", () => {
		let testClass = {
			variables: [],
			methods: [{ name: "x", references: [] }]
		};
		let converted = (new Lcom4Converter(JSON.stringify(testClass))).convert();

		expect(converted.nodes.size).to.equal(1);
		expect(Array.from(converted.nodes).every(node => node.neighbors.size === 0)).to.be.true;
	});

	it("returns a graph with one self-connected node when the class has one method referencing a variable",
		() => {
			let testClass = {
				variables: ["a"],
				methods: [
					{ name: "x", references: ["a"] },
				]
			};
			let converted = (new Lcom4Converter(JSON.stringify(testClass))).convert();

			expect(converted.nodes.size).to.equal(1);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
		});

	it("returns a graph with two separate nodes when the class has two methods that have no common references",
		() => {
			let testClass = {
				variables: ["a", "b"],
				methods: [
					{ name: "x", references: ["a"] },
					{ name: "y", references: ["b"] }
				]
			};
			let converted = (new Lcom4Converter(JSON.stringify(testClass))).convert();

			expect(converted.nodes.size).to.equal(2);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
		});

	it("returns a graph with two nodes when the class has two methods that reference the same variable",
		() => {
			let testClass = {
				variables: ["a"],
				methods: [
					{ name: "x", references: ["a"] },
					{ name: "y", references: ["a"] }
				]
			};
			let converted = (new Lcom4Converter(JSON.stringify(testClass))).convert();

			expect(converted.nodes.size).to.equal(2);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 2)).to.be.true;
		});

	it("returns a graph with two nodes when the class has two methods that call each other", () => {
		let testClass = {
			variables: [],
			methods: [
				{ name: "x", references: ["y"] },
				{ name: "y", references: ["x"] }
			]
		};
		let converted = (new Lcom4Converter(JSON.stringify(testClass))).convert();

		expect(converted.nodes.size).to.equal(2);
		expect(Array.from(converted.nodes).every(node => node.neighbors.size === 2)).to.be.true;
	});

	it("returns a graph with three self-connected nodes when the class has three methods referencing variables",
		() => {
			let testClass = {
				variables: ["a", "b", "c"],
				methods: [
					{ name: "x", references: ["a"] },
					{ name: "y", references: ["b"] },
					{ name: "z", references: ["c"] }
				]
			};
			let converted = (new Lcom4Converter(JSON.stringify(testClass))).convert();

			expect(converted.nodes.size).to.equal(3);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
		});
});