import Lcom4Converter from "./Lcom4Converter";
import Lcom4Evaluator from "./Lcom4Evaluator";
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
            references: ["y"]
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
let testClassGraph = (new Lcom4Converter(testClass)).convert();
let evaluator = new Lcom4Evaluator();
console.log(evaluator.evaluate(testClassGraph));
