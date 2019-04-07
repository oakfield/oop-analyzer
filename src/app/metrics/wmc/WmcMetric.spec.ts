import "mocha";

import ClassModel from "../../models/ClassModel";
import MethodModel from "../../models/MethodModel";
import VariableModel from "../../models/VariableModel";
import WmcMetric from "./WmcMetric";
import { expect } from "chai";

describe("WmcMetric", () => {
    describe("evaluate", () => {
        it("returns NaN given an empty list of classes", () => {
            let wmcMetric = new WmcMetric();

            expect(wmcMetric.evaluate([])).to.be.NaN;
        });

        it("returns 0 given a class with no methods and no variables", () => {
            let classModel = new ClassModel("Test");
            let wmcMetric = new WmcMetric();

            expect(wmcMetric.evaluate([classModel])).to.equal(0);
        });

        it("return 0 given multiples classes with no methods and no variables", () => {
            let classModel1 = new ClassModel("Test1");
            let classModel2 = new ClassModel("Test2");
            let wmcMetric = new WmcMetric();

            expect(wmcMetric.evaluate([classModel1, classModel2])).to.equal(0);
        });

        it("returns 1 given a class with one method and no variables", () => {
            let classModel = new ClassModel("Test");
            classModel.methods.push(new MethodModel("foo", "foo() { }"));
            let wmcMetric = new WmcMetric();

            expect(wmcMetric.evaluate([classModel])).to.equal(1);
        });

        it("returns 1 given multiples classes with one method and no variables", () => {
            let classModel1 = new ClassModel("Test1");
            let classModel2 = new ClassModel("Test2");
            let classModel3 = new ClassModel("Test3");
            classModel1.methods.push(new MethodModel("foo", "foo() { }"));
            classModel2.methods.push(new MethodModel("foo", "foo() { }"));
            classModel3.methods.push(new MethodModel("foo", "foo() { }"));
            let wmcMetric = new WmcMetric();

            expect(wmcMetric.evaluate([classModel1, classModel2, classModel3])).to.equal(1);
        });

        it("returns the average given multiples classes with multiples method and no variables", () => {
            let classModel1 = new ClassModel("Test1");
            let classModel2 = new ClassModel("Test2");
            let classModel3 = new ClassModel("Test3");
            classModel1.methods.push(new MethodModel("foo", "foo() { }"));
            classModel1.methods.push(new MethodModel("bar", "bar() { }"));
            classModel2.methods.push(new MethodModel("foo", "foo() { }"));
            classModel3.methods.push(new MethodModel("foo", "foo() { }"));
            classModel3.methods.push(new MethodModel("bar", "bar() { }"));
            classModel3.methods.push(new MethodModel("baz", "baz() { }"));
            let wmcMetric = new WmcMetric();

            expect(wmcMetric.evaluate([classModel1, classModel2, classModel3])).to.equal(2);
        });

        it("is not affected by the number of variables in a class", () => {
            let classModel1 = new ClassModel("Test1");
            let classModel2 = new ClassModel("Test2");
            let classModel3 = new ClassModel("Test3");
            classModel1.methods.push(new MethodModel("foo", "foo() { return this.test1; }"));
            classModel1.methods.push(new MethodModel("bar", "bar() { return this.test2; }"));
            classModel2.methods.push(new MethodModel("foo", "foo() { return this.test3; }"));
            classModel3.methods.push(new MethodModel("foo", "foo() { }"));
            classModel3.methods.push(new MethodModel("bar", "bar() { }"));
            classModel3.methods.push(new MethodModel("baz", "baz() { }"));

            classModel1.variables.push(new VariableModel("test1"));
            classModel1.variables.push(new VariableModel("test2"));
            classModel1.variables.push(new VariableModel("test3"));

            let wmcMetric = new WmcMetric();

            expect(wmcMetric.evaluate([classModel1, classModel2, classModel3])).to.equal(2);
        });
    });
});
