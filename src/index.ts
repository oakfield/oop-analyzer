import Lcom4Converter from "./Lcom4Converter";
import Lcom4Evaluator from "./Lcom4Evaluator";
import Lcom4Validator from "./Lcom4Validator";
// import WmcEvaluator from "./WmcEvaluator";
import Parser from "./Parser";

let args = process.argv.slice(2);
let testClassString = args[0];
let testClasses: ClassModel[] = new Parser().parse(testClassString);

for (let testClass of testClasses) {
	let lcom4Converter = new Lcom4Converter();
	let lcom4Evaluator = new Lcom4Evaluator(lcom4Converter);
	let lcom4Validator = new Lcom4Validator(lcom4Converter);

	console.log(`Class: ${testClass.name}`);
	console.log(`LCOM4: ${lcom4Evaluator.evaluate(testClass)}`);
	console.log(`Corrected: ${JSON.stringify(lcom4Validator.validate(testClass))}`);
}

// let wmcEvaluator = new WmcEvaluator();
// console.log(JSON.stringify(lcom4Validator.validate(testClass)));