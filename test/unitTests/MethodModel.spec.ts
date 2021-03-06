import "mocha";

import MethodModel from "../../src/app/models/MethodModel";
import { expect } from "chai";

describe(MethodModel.name, () => {
	describe("constructor", () => {
		it("does not throw", () => {
			expect(() => new MethodModel("test", "test() { }")).not.to.throw();
		});
	});
});
