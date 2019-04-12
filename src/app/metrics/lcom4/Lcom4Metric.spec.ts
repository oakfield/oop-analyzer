import "mocha";

import ClassModel from "../../models/ClassModel";
import Graph from "../../Graph";
import Lcom4Converter from "./Lcom4Converter";
import Lcom4Metric from "./Lcom4Metric";
import MethodModel from "../../models/MethodModel";
import Node from "../../Node";
import VariableModel from "../../models/VariableModel";
import { expect } from "chai";

describe(Lcom4Metric.name, () => {
	let mockEmptyConverter: Lcom4Converter;
	let mockOneNodeConverter: Lcom4Converter;

	beforeEach(() => {
		mockEmptyConverter = {
			convert: () => new Graph()
		} as Lcom4Converter;

		mockOneNodeConverter = {
			convert: () => new Graph(
				new Set([
					new Node<MethodModel>(
						new MethodModel("f", "f() { }")
					)
				])
			)
		} as Lcom4Converter;
	});

	describe("constructor", () => {
		it("initializes instance variables", () => {
			let metric = new Lcom4Metric(mockEmptyConverter);

			expect(metric).not.to.be.undefined;
		});
	});

	describe("evaluate", () => {
		it("returns 0 for class that has no methods or variables", () => {
			let classModel = new ClassModel("Test");
			let metric = new Lcom4Metric(mockEmptyConverter);

			expect(metric.evaluate(classModel)).to.equal(0);
		});

		it("returns 0 for class that has no methods and some variables", () => {
			let classModel = new ClassModel("Test");
			classModel.variables.push(new VariableModel("x", "this.x = 1;"))
			let metric = new Lcom4Metric(mockEmptyConverter);

			expect(metric.evaluate(classModel)).to.equal(0);
		});

		it("returns 1 for class that has one method and no variables", () => {
			let classModel = new ClassModel("Test");
			classModel.methods.push(new MethodModel("f", "f() { }"));
			let metric = new Lcom4Metric(mockOneNodeConverter);

			expect(metric.evaluate(classModel)).to.equal(1);
		});

		it("returns 1 for class that has one method that reference one variable", () => {
			let classModel = new ClassModel("Test");
			classModel.variables.push(new VariableModel("x", "this.x = 1;"))
			classModel.methods.push(new MethodModel("f", "f() { return this.x; }"));
			let metric = new Lcom4Metric(mockOneNodeConverter);

			expect(metric.evaluate(classModel)).to.equal(1);
		});

		it("returns 2 for class that has two methods and no variables", () => {
			let classModel = new ClassModel("Test");
			classModel.methods.push(new MethodModel("f", "f() { }"));
			classModel.methods.push(new MethodModel("g", "g() { }"));
			let metric = new Lcom4Metric({
				convert: () => new Graph(
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

			expect(metric.evaluate(classModel)).to.equal(2);
		});

		it("returns 1 for class that has two methods that reference the same variable", () => {
			let classModel = new ClassModel("Test");
			classModel.variables.push(new VariableModel("x", "this.x = 1;"))
			classModel.methods.push(new MethodModel("f", "f() { return this.x + 1; }"));
			classModel.methods.push(new MethodModel("g", "g() { return this.x + 2; }"));
			let methodFNode = new Node<MethodModel>(new MethodModel("f", "f() { }"));
			let methodGNode = new Node<MethodModel>(new MethodModel("g", "g() { }"));
			methodFNode.neighbors.add(methodGNode);
			let metric = new Lcom4Metric({
				convert: () => new Graph(
					new Set([methodFNode])
				)
			});

			expect(metric.evaluate(classModel)).to.equal(1);
		});
	});
});
