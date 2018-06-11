import Lcom4Converter from "./Lcom4Converter";
import Lcom4Evaluator from "./Lcom4Evaluator";
import Lcom4Validator from "./Lcom4Validator";
import WmcEvaluator from "./WmcEvaluator";

let testClass = {
	variables: ["x", "y"],
	methods: [
		{
			name: "a",
			references: ["b"]
		},
		{
			name: "b",
			references: ["x"]
		},
		{
			name: "c",
			references: ["x"]
		},
		{
			name: "d",
			references: ["y", "e"]
		},
		{
			name: "e",
			references: []
		}
	]
};

let lcom4Converter = new Lcom4Converter();

let lcom4Evaluator = new Lcom4Evaluator(lcom4Converter);
console.log(lcom4Evaluator.evaluate(testClass));

let wmcEvaluator = new WmcEvaluator();
console.log(wmcEvaluator.evaluate(testClass));

let lcom4Validator = new Lcom4Validator(lcom4Converter);
console.log(JSON.stringify(lcom4Validator.validate(testClass)));