import 'mocha';

import ClassModel from '../models/ClassModel';
import ComponentsTransformer from './ComponentsTransformer';
import Graph from '../Graph';
import MethodModel from '../models/MethodModel';
import Node from '../Node';
import { expect } from 'chai';

describe(ComponentsTransformer.name, () => {
	describe("transform", () => {
		it("returns an empty list when given a class with no methods or variables", () => {
			let classModel = new ClassModel("");
			let mockLcom4Converter = {
				convert: () => new Graph<MethodModel>()
			};
			let transformer = new ComponentsTransformer(mockLcom4Converter);

			let actual = transformer.transform(classModel);

			expect(actual.length).to.equal(0);
		});

		it("returns an empty list when given a class with no methods and some variables", () => {
			let classModel = new ClassModel("class Test { constructor() { this.foo = 1; } }");
			let mockLcom4Converter = {
				convert: () => new Graph<MethodModel>()
			};
			let transformer = new ComponentsTransformer(mockLcom4Converter);

			let actual = transformer.transform(classModel);

			expect(actual.length).to.equal(0);
		});

		it("returns a single class with one method when given a class with one method and no variables", () => {
			let methodName = "foo";
			let methodSource = `${methodName}() { }`;
			let classModel = new ClassModel(`class Test { ${methodSource} }`);
			let mockLcom4Converter = {
				convert: () => {
					let method = new MethodModel("foo", `${methodSource}`);
					return new Graph<MethodModel>(new Set([new Node<MethodModel>(method)]));
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
					return new Graph<MethodModel>(new Set([new Node<MethodModel>(method)]));
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
					return new Graph<MethodModel>(new Set([new Node<MethodModel>(method)]));
				}
			};
			let transformer = new ComponentsTransformer(mockLcom4Converter);

			let actual = transformer.transform(classModel);

			expect(actual.length).to.equal(1);
			expect(actual[0].toString()).to.include(`${methodSource}`);
		});
	});
});
