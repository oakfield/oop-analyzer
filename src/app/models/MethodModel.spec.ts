import 'mocha';

import MethodModel from './MethodModel';
import { expect } from 'chai';

describe("MethodModel", () => {
    describe("constructor", () => {
        it("does not throw", () => {
            expect(() => new MethodModel("test", "test() { }")).not.to.throw();
        });
    });
});