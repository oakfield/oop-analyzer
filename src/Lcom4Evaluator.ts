class Lcom4Evaluator<T> implements IEvaluator<T> {
	constructor() { }

	evaluate(graph: IGraph<T>): number {
		return graph.connectedComponents.length;
	}
}