import 'mocha';

import VariableModel from './VariableModel';
import { expect } from 'chai';

describe("VariableModel", () => {
    describe("constructor", () => {
        it("does not throw", () => {
            expect(() => new VariableModel("test", "this.test = 1;")).not.to.throw();
        });
    });
});