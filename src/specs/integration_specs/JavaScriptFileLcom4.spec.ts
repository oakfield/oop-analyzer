import "mocha";

import JavaScriptFile from "../../app/JavaScriptFile";
import Lcom4Converter from "../../app/metrics/lcom4/Lcom4Converter";
import Lcom4Metric from "../../app/metrics/lcom4/Lcom4Metric";
import { expect } from "chai";

describe("LCOM4 of JavaScript file", () => {
	it("is 0 if the script has a single class with no methods and no variables", () => {
		let javaScript = `class Test { }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(0);
	});

	it("is 0 if the script has a single class with no methods and some variables", () => {
		let javaScript = `class Test { constructor() { this.foo = 1; this.bar = 2; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(0);
	});

	it("is 1 if the script has a single class with one method and no variables", () => {
		let javaScript = `class Test { foo() { console.log("this is a test"); } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(1);
	});

	it("is 1 if the script has a single class with one method and some variables", () => {
		let javaScript = `class Test { constructor() { this.bar = 1; } foo() { return this.bar; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(1);
	});

	it("is 2 if the script has a single class with two methods and no variables", () => {
		let javaScript = `class Test { foo() { return 0; } bar() { return 1; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(2);
	});

	it("is 2 if the script has a single class with two methods and one variable referenced by one method", () => {
		let javaScript = `class Test { constructor() { this.baz = 1; } foo() { return this.baz; } bar() { return 1; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(2);
	});

	it("is 1 if the script has a single class with two methods that access the same variable", () => {
		let javaScript = `class Test { constructor() { this.baz = 1; } foo() { return this.baz; } bar() { return this.baz + 1; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(1);
	});

	it("is 1 if the script has a single class with two methods that access the same variables, for multiple variables", () => {
		let javaScript = `class Test { constructor() { this.var1 = 1; this.var2 = 2; } foo() { return this.var1 + this.var2; } bar() { return this.var1 * this.var2; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(1);
	});

	it("is 3 if the script has a single class with three methods and no variables", () => {
		let javaScript = `class Test { foo() { } bar() { } baz() { } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(3);
	});

	it("is 2 if the script has a single class with three methods and two methods that reference the same variable", () => {
		let javaScript = `class Test { constructor() { this.var1 = 1; } foo() { return this.var1; } bar() { return this.var1 + 1; } baz() { } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(2);
	});

	it("is 1 if the script has a single class with three methods and two pairs of methods that reference the same variable", () => {
		let javaScript = `class Test { constructor() { this.var1 = 1; this.var2 = 2; } foo() { return this.var1; } bar() { return this.var1 + this.var2; } baz() { return this.var2; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(1);
	});

	it("is 1 if the script has a single class with three methods that reference the same variable", () => {
		let javaScript = `class Test { constructor() { this.var1 = 1; } foo() { return this.var1; } bar() { return this.var1 + 1; } baz() { return this.var1 + 2; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(1);
	});

	it("is 0 if the module has a single class with no methods and no variables", () => {
		let javaScript = `class Test { }`;
		let javaScriptFile = new JavaScriptFile(javaScript, "module");
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(0);
	});

	it("is 1 if the module has imports, exports and a single class with three methods that reference the same variable", () => {
		let javaScript = `import * as moment from 'moment'; export default class Test { constructor() { this.var1 = 1; } foo() { return this.var1; } bar() { return this.var1 + 1; } baz() { return this.var1 + 2; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript, "module");
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(1);
	});

	it("is 1 if the module has imports, exports and a single class with three methods that reference the same variable, assigned only in functions", () => {
		let javaScript = `import * as moment from 'moment'; export default class Test { foo() { this.var1 = 1; return this.var1; } bar() { return this.var1 && this.var1 + 1; } baz() { if (this.var1) return this.var1 + 2; } }`;
		let javaScriptFile = new JavaScriptFile(javaScript, "module");
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue = metric.evaluate(classModels[0]);

		expect(actualValue).to.equal(1);
	});

	it("is defined when the file has multiple classes", () => {
		let javaScript = `class Test1 { } class Test2 { }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let metric = new Lcom4Metric(new Lcom4Converter());

		let classModels = javaScriptFile.toClassModelArray();
		let actualValue1 = metric.evaluate(classModels[0]);
		let actualValue2 = metric.evaluate(classModels[0]);

		expect(actualValue1).to.equal(0);
		expect(actualValue2).to.equal(0);
	});
});
