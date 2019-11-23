import "mocha";

import ClassModel from "../../src/app/models/ClassModel";
import ComponentsTransformer from "../../src/app/transformers/components/ComponentsTransformer";
import EquatableSet from "../../src/app/EquatableSet";
import MethodModel from "../../src/app/models/MethodModel";
import Node from "../../src/app/graphs/Node";
import UndirectedGraph from "../../src/app/graphs/UndirectedGraph";
import VariableModel from "../../src/app/models/VariableModel";
import { expect } from "chai";

describe(ComponentsTransformer.name, () => {
	describe("transform", () => {
		it("returns an empty class when given a class with no methods or variables", () => {
			let classModel = new ClassModel("");
			let mockLcom4Converter = {
				convert: () => new UndirectedGraph<MethodModel>()
			};
			let transformer = new ComponentsTransformer(mockLcom4Converter);

			let actual = transformer.transform(classModel);

			expect(actual.length).to.equal(1);
		});

		it("returns a single class with one variable when given a class with no methods and one variable", () => {
			let variableName = "foo";
			let classModel = new ClassModel(`class Test { constructor() { this.${variableName} = 1; } }`);
			classModel.variables.add(new VariableModel(variableName, `this.${variableName} = foo;`));
			let mockLcom4Converter = {
				convert: () => new UndirectedGraph<MethodModel>()
			};
			let transformer = new ComponentsTransformer(mockLcom4Converter);

			let actual = transformer.transform(classModel);

			expect(actual.length).to.equal(1);
			expect(actual[0].variables.size).to.equal(1);
			expect(actual[0].variables.every(variable => variable.name === variableName));
		});

		it("returns a single class with one method when given a class with one method and no variables", () => {
			let methodName = "foo";
			let methodSource = `${methodName}() { }`;
			let classModel = new ClassModel(`class Test { ${methodSource} }`);
			let mockLcom4Converter = {
				convert: () => {
					let method = new MethodModel("foo", `${methodSource}`);
					return new UndirectedGraph(new EquatableSet(new Node(method)));
				}
			};
			let transformer = new ComponentsTransformer(mockLcom4Converter);

			let actual = transformer.transform(classModel);

			expect(actual.length).to.equal(1);
			expect(actual[0].toString()).to.include(`${methodSource}`);
		});

		it("returns a single class with one method when given a class with one method and one unreferenced variable", () => {
			let methodName = "foo";
			let methodSource = `${methodName}() { }`;
			let classModel = new ClassModel(`class Test { constructor() { this.foo = 1; } ${methodSource} }`);
			let mockLcom4Converter = {
				convert: () => {
					let method = new MethodModel("foo", `${methodSource}`);
					return new UndirectedGraph(new EquatableSet(new Node(method)));
				}
			};
			let transformer = new ComponentsTransformer(mockLcom4Converter);

			let actual = transformer.transform(classModel);

			expect(actual.length).to.equal(1);
			expect(actual[0].toString()).to.include(`${methodSource}`);
		});

		it("returns a single class with one method when given a class with one method and one referenced variable", () => {
			let methodName = "foo";
			let methodSource = `${methodName}() { return this.foo; }`;
			let classModel = new ClassModel(`class Test { constructor() { this.foo = 1; } ${methodSource} }`);
			let mockLcom4Converter = {
				convert: () => {
					let method = new MethodModel("foo", `${methodSource}`);
					return new UndirectedGraph(new EquatableSet(new Node(method)));
				}
			};
			let transformer = new ComponentsTransformer(mockLcom4Converter);

			let actual = transformer.transform(classModel);

			expect(actual.length).to.equal(1);
			expect(actual[0].toString()).to.include(`${methodSource}`);
		});
	});
});
