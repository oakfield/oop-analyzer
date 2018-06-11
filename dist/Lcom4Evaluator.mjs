export default class Lcom4Evaluator {
    constructor() { }
    evaluate(graph) {
        return graph.connectedComponents.length;
    }
}
