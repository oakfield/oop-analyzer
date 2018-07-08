import Lcom4Converter from "./Lcom4Converter";
import { expect } from "chai";
import "mocha";
import ClassModel from "./ClassModel";

describe("convert", () => {
	it("returns an empty graph when the class has no variables or methods", () => {
		let testClass = {
			private: "Test",
			variables: [],
			methods: []
		} as ClassModel;
		let converter = new Lcom4Converter();

		expect(converter.convert(testClass).nodes).to.be.empty;
	});

	it("returns an empty graph when the class has no methods", () => {
		let testClass = {
			private: "Test",
			variables: ["a"],
			methods: []
		} as ClassModel;
		let converter = new Lcom4Converter();

		expect(converter.convert(testClass).nodes).to.be.empty;
	});


	it("returns a graph with one node and no edges when the class has no variables", () => {
		let testClass = {
			private: "Test",
			variables: [],
			methods: [{ name: "x", references: [] }]
		} as ClassModel;
		let converted = (new Lcom4Converter()).convert(testClass);

		expect(converted.nodes.size).to.equal(1);
		expect(Array.from(converted.nodes).every(node => node.neighbors.size === 0)).to.be.true;
	});

	it("returns a graph with one self-connected node when the class has one method referencing a variable",
		() => {
			let testClass = {
				private: "Test",
				variables: ["a"],
				methods: [
					{ name: "x", references: ["a"] },
				]
			} as ClassModel;
			let converted = (new Lcom4Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(1);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
		});

	it("returns a graph with two separate nodes when the class has two methods that have no common references",
		() => {
			let testClass = {
				private: "Test",
				variables: ["a", "b"],
				methods: [
					{ name: "x", references: ["a"] },
					{ name: "y", references: ["b"] }
				]
			} as ClassModel;
			let converted = (new Lcom4Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(2);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
		});

	it("returns a graph with two nodes when the class has two methods that reference the same variable",
		() => {
			let testClass = {
				private: "Test",
				variables: ["a"],
				methods: [
					{ name: "x", references: ["a"] },
					{ name: "y", references: ["a"] }
				]
			} as ClassModel;
			let converted = (new Lcom4Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(2);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 2)).to.be.true;
		});

	it("returns a graph with two nodes when the class has two methods that call each other", () => {
		let testClass = {
			private: "Test",
			variables: [],
			methods: [
				{ name: "x", references: ["y"] },
				{ name: "y", references: ["x"] }
			]
		} as ClassModel;
		let converted = (new Lcom4Converter()).convert(testClass);

		expect(converted.nodes.size).to.equal(2);
		expect(Array.from(converted.nodes).every(node => node.neighbors.size === 2)).to.be.true;
	});

	it("returns a graph with three self-connected nodes when the class has three methods referencing variables",
		() => {
			let testClass = {
				private: "Test",
				variables: ["a", "b", "c"],
				methods: [
					{ name: "x", references: ["a"] },
					{ name: "y", references: ["b"] },
					{ name: "z", references: ["c"] }
				]
			} as ClassModel;
			let converted = (new Lcom4Converter()).convert(testClass);

			expect(converted.nodes.size).to.equal(3);
			expect(Array.from(converted.nodes).every(node => node.neighbors.size === 1)).to.be.true;
		});
});