import Lcom4Converter from "./Lcom4Converter";
import Lcom4Evaluator from "./Lcom4Evaluator";
import Lcom4Validator from "./Lcom4Validator";
// import WmcEvaluator from "./WmcEvaluator";
import Parser from "./Parser";
import * as fs from "fs";
import ClassModel from "./ClassModel";

let args = process.argv.slice(2);
let filePath = args[0];
fs.readFile(filePath, "utf8", (error, data) => {
	let testClasses: ClassModel[] = new Parser().parse(data);

	let counter = 0;
	for (let testClass of testClasses) {
		let lcom4Converter = new Lcom4Converter();
		let lcom4Evaluator = new Lcom4Evaluator(lcom4Converter);
		let lcom4Validator = new Lcom4Validator(lcom4Converter);
		let validated = lcom4Validator.validate(testClass);
	
		fs.writeFile(`./${counter++}.js`, validated.map(classModel => classModel.toString()).reduce((current, previous) => current + previous), err => console.log(err));
	}
});
