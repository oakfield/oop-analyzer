import Lcom4Converter from "./metrics/lcom4/Lcom4Converter";
import Lcom4Metric from "./metrics/lcom4/Lcom4Metric";
import ConnectedComponentsTransformation from "./transformers/ConnectedComponentsTransformer";
import WmcEvaluator from "./metrics/wmc/WmcMetric";
import Parser from "./Parser";
import * as fs from "fs";
import ClassModel from "./models/ClassModel";

let args = process.argv.slice(2);
let filePath = args[0];
fs.readFile(filePath, "utf8", (error, data) => {
	let testClasses: ClassModel[] = new Parser().parse(data);

	let counter = 0;
	for (let testClass of testClasses) {
		let lcom4Converter = new Lcom4Converter();
		let lcom4Metric = new Lcom4Metric(lcom4Converter);
		let connectedComponentsTransformation = new ConnectedComponentsTransformation(lcom4Converter);
		let validated = connectedComponentsTransformation.transform(testClass);
	
		fs.writeFile(`./${counter++}.js`,
			validated.map(classModel => classModel.toString())
				.reduce((current, previous) => `${current}\n${previous}`),
			error => {
				if (error) {
					console.log(error);
				}
			});
	}
});
