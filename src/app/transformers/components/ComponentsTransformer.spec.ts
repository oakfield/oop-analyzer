import 'mocha';

import ClassModel from '../../models/ClassModel';
import ComponentsTransformer from './ComponentsTransformer';
import MethodModel from '../../models/MethodModel';
import Node from '../../graphs/Node';
import UndirectedGraph from '../../graphs/UndirectedGraph';
import VariableModel from '../../models/VariableModel';
import { expect } from 'chai';

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
			classModel.variables.push(new VariableModel(variableName, `this.${variableName} = foo;`));
			let mockLcom4Converter = {
				convert: () => new UndirectedGraph<MethodModel>()
			};
			let transformer = new ComponentsTransformer(mockLcom4Converter);

			let actual = transformer.transform(classModel);

			expect(actual.length).to.equal(1);
			expect(actual[0].variables.length).to.equal(1);
			expect(actual[0].variables[0].name).to.equal(variableName);
		});

		it("returns a single class with one method when given a class with one method and no variables", () => {
			let methodName = "foo";
			let methodSource = `${methodName}() { }`;
			let classModel = new ClassModel(`class Test { ${methodSource} }`);
			let mockLcom4Converter = {
				convert: () => {
					let method = new MethodModel("foo", `${methodSource}`);
					return new UndirectedGraph<MethodModel>(new Set([new Node<MethodModel>(method)]));
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
					return new UndirectedGraph<MethodModel>(new Set([new Node<MethodModel>(method)]));
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
					return new UndirectedGraph<MethodModel>(new Set([new Node<MethodModel>(method)]));
				}
			};
			let transformer = new ComponentsTransformer(mockLcom4Converter);

			let actual = transformer.transform(classModel);

			expect(actual.length).to.equal(1);
			expect(actual[0].toString()).to.include(`${methodSource}`);
		});
	});
});
