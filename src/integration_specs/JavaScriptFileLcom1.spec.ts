import "mocha";

import JavaScriptFile from "../app/JavaScriptFile";
import Lcom1Converter from "../app/metrics/lcom1/Lcom1Converter";
import Lcom1Metric from "../app/metrics/lcom1/Lcom1Metric";
import { expect } from "chai";

describe("LCOM1 of JavaScript file", () => {
    it("is 0 if the file has a single class with no methods and no variables", () => {
        let javaScript = `class Test { }`;
        let javaScriptFile = new JavaScriptFile(javaScript, "script");
        let metric = new Lcom1Metric(new Lcom1Converter());

        let classModels = javaScriptFile.toClassModelArray();
        let actualValue = metric.evaluate(classModels[0]);

        expect(actualValue).to.equal(0);
    });

    it("is 0 if the file has a single class with no methods and some variables", () => {
        let javaScript = `class Test { constructor() { this.foo = 1; this.bar = 2; } }`;
        let javaScriptFile = new JavaScriptFile(javaScript, "script");
        let metric = new Lcom1Metric(new Lcom1Converter());

        let classModels = javaScriptFile.toClassModelArray();
        let actualValue = metric.evaluate(classModels[0]);

        expect(actualValue).to.equal(0);
    });

    it("is 0 if the file has a single class with one method and no variables", () => {
        let javaScript = `class Test { foo() { console.log("this is a test"); } }`;
        let javaScriptFile = new JavaScriptFile(javaScript, "script");
        let metric = new Lcom1Metric(new Lcom1Converter());

        let classModels = javaScriptFile.toClassModelArray();
        let actualValue = metric.evaluate(classModels[0]);

        expect(actualValue).to.equal(0);
    });

    it("is 0 if the file has a single class with one method and some variables", () => {
        let javaScript = `class Test { constructor() { this.bar = 1; } foo() { return this.bar; } }`;
        let javaScriptFile = new JavaScriptFile(javaScript, "script");
        let metric = new Lcom1Metric(new Lcom1Converter());

        let classModels = javaScriptFile.toClassModelArray();
        let actualValue = metric.evaluate(classModels[0]);

        expect(actualValue).to.equal(0);
    });

    it("is 1 if the file has a single class with two methods and no variables", () => {
        let javaScript = `class Test { foo() { return 0; } bar() { return 1; } }`;
        let javaScriptFile = new JavaScriptFile(javaScript, "script");
        let metric = new Lcom1Metric(new Lcom1Converter());

        let classModels = javaScriptFile.toClassModelArray();
        let actualValue = metric.evaluate(classModels[0]);

        expect(actualValue).to.equal(1);
    });

    it("is 1 if the file has a single class with two methods and one variable referenced by one method", () => {
        let javaScript = `class Test { constructor() { this.baz = 1; } foo() { return this.baz; } bar() { return 1; } }`;
        let javaScriptFile = new JavaScriptFile(javaScript, "script");
        let metric = new Lcom1Metric(new Lcom1Converter());

        let classModels = javaScriptFile.toClassModelArray();
        let actualValue = metric.evaluate(classModels[0]);

        expect(actualValue).to.equal(1);
    });

    it("is 0 if the file has a single class with two methods that access the same variable", () => {
        let javaScript = `class Test { constructor() { this.baz = 1; } foo() { return this.baz; } bar() { return this.baz + 1; } }`;
        let javaScriptFile = new JavaScriptFile(javaScript, "script");
        let metric = new Lcom1Metric(new Lcom1Converter());

        let classModels = javaScriptFile.toClassModelArray();
        let actualValue = metric.evaluate(classModels[0]);

        expect(actualValue).to.equal(0);
    });

    it("is 0 if the file has a single class with two methods that access the same variables, for multiple variables", () => {
        let javaScript = `class Test { constructor() { this.var1 = 1; this.var2 = 2; } foo() { return this.var1 + this.var2; } bar() { return this.var1 * this.var2; } }`;
        let javaScriptFile = new JavaScriptFile(javaScript, "script");
        let metric = new Lcom1Metric(new Lcom1Converter());

        let classModels = javaScriptFile.toClassModelArray();
        let actualValue = metric.evaluate(classModels[0]);

        expect(actualValue).to.equal(0);
    });
});
