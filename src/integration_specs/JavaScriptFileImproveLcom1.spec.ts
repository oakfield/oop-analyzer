import "mocha";

import JavaScriptFile from "../app/JavaScriptFile";
import Lcom1Converter from "../app/metrics/lcom1/Lcom1Converter";
import Lcom1Metric from "../app/metrics/lcom1/Lcom1Metric";
import MaximalCliqueTransformer from "../app/transformers/MaximalCliqueTransformer";
import { expect } from "chai";

describe("Transform JavaScript file to improve LCOM1", () => {
	it("does not worsen LCOM1 when given an empty class", () => {
		let javaScript = `class Test { }`;
		let javaScriptFile = new JavaScriptFile(javaScript);
		let converter = new Lcom1Converter();
		let metric = new Lcom1Metric(converter);
		let maximalCliqueTransformer = new MaximalCliqueTransformer(converter);

		// Get initial LCOM1.
		let classModel = javaScriptFile.toClassModelArray()[0];
		let initialLcom1 = metric.evaluate(classModel);

		// Transform.
		let transformedClassModel = maximalCliqueTransformer.transform(classModel)[0];

		// Get transformed LCOM1.
		let transformedLcom1 = metric.evaluate(transformedClassModel);

		expect(transformedLcom1 <= initialLcom1).to.equal(true);
	});
});
