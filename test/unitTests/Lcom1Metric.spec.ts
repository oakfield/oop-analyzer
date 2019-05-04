import "mocha";

import ClassModel from "../../src/app/models/ClassModel";
import Lcom1Converter from "../../src/app/metrics/lcom1/Lcom1Converter";
import Lcom1Metric from "../../src/app/metrics/lcom1/Lcom1Metric";
import MethodModel from "../../src/app/models/MethodModel";
import Node from "../../src/app/graphs/Node";
import UndirectedGraph from "../../src/app/graphs/UndirectedGraph";
import VariableModel from "../../src/app/models/VariableModel";
import { expect } from "chai";

describe(Lcom1Metric.name, () => {
	let mockEmptyConverter: Lcom1Converter;
	let mockOneNodeConverter: Lcom1Converter;

	beforeEach(() => {
		mockEmptyConverter = {
			convert: () => new UndirectedGraph()
		} as Lcom1Converter;

		mockOneNodeConverter = {
			convert: () => new UndirectedGraph(
				new Set([
					new Node<MethodModel>(
						new MethodModel("f", "f() { }")
					)
				])
			)
		} as Lcom1Converter;
	});

	describe("constructor", () => {
		it("initializes instance variables", () => {
			let metric = new Lcom1Metric(mockEmptyConverter);

			expect(metric).not.to.be.undefined;
		});
	});

	describe("evaluate", () => {
		it("returns 0 for a class that has no methods or variables", () => {
			let classModel = new ClassModel("Test");
			let metric = new Lcom1Metric(mockEmptyConverter);

			expect(metric.evaluate(classModel)).to.equal(0);
		});

		it("returns 0 for a class that has no methods and some variables", () => {
			let classModel = new ClassModel("Test");
			classModel.variables.push(new VariableModel("x", "this.x = 1;"));
			let metric = new Lcom1Metric(mockEmptyConverter);

			expect(metric.evaluate(classModel)).to.equal(0);
		});

		it("returns 0 for a class that has one method and no variables", () => {
			let classModel = new ClassModel("Test");
			classModel.methods.push(new MethodModel("f", "f() { }"));
			let metric = new Lcom1Metric(mockOneNodeConverter);

			expect(metric.evaluate(classModel)).to.equal(0);
		});

		it("returns 0 for a class that has one method that reference one variable", () => {
			let classModel = new ClassModel("Test");
			classModel.variables.push(new VariableModel("x", "this.x = 1;"));
			classModel.methods.push(new MethodModel("f", "f() { return this.x; }"));
			let metric = new Lcom1Metric(mockOneNodeConverter);

			expect(metric.evaluate(classModel)).to.equal(0);
		});

		it("returns 1 for a class that has two methods and no variables", () => {
			let classModel = new ClassModel("Test");
			classModel.methods.push(new MethodModel("f", "f() { }"));
			classModel.methods.push(new MethodModel("g", "g() { }"));
			let metric = new Lcom1Metric({
				convert: () => new UndirectedGraph(
					new Set([
						new Node<MethodModel>(
							new MethodModel("f", "f() { }")
						),
						new Node<MethodModel>(
							new MethodModel("g", "g() { }")
						)
					])
				)
			});

			expect(metric.evaluate(classModel)).to.equal(1);
		});

		it("returns 0 for a class that has two methods that reference the same variable", () => {
			let classModel = new ClassModel("Test");
			let variableX = new VariableModel("x", "this.x = 1;");
			let methodF = new MethodModel("f", "f() { return this.x + 1; }");
			methodF.references.push(variableX);
			let methodG = new MethodModel("g", "g() { return this.x + 2; }");
			methodG.references.push(variableX);
			classModel.variables.push();
			classModel.methods.push(methodF);
			classModel.methods.push(methodG);
			let methodFNode = new Node<MethodModel>(methodF);
			let methodGNode = new Node<MethodModel>(methodG);
			methodFNode.neighbors.add(methodGNode);
			let metric = new Lcom1Metric({
				convert: () => new UndirectedGraph(
					new Set([methodFNode])
				)
			});

			expect(metric.evaluate(classModel)).to.equal(0);
		});
	});
});
