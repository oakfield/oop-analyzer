import 'mocha';

import ClassModel from '../models/ClassModel';
import ComponentsTransformer from './ComponentsTransformer';
import Graph from '../Graph';
import MethodModel from '../models/MethodModel';
import { expect } from 'chai';

describe("ComponentsTransformer", () => {
    describe("transform", () => {
        it("returns an empty list when given a class with no methods", () => {
            let classModel = new ClassModel("");
            let mockLcom4Converter = {
                convert: () => new Graph<MethodModel>()
            };
            let transformer = new ComponentsTransformer(mockLcom4Converter);

            let actual = transformer.transform(classModel);
            
            expect(actual.length).to.equal(0);
        });
    });
});
