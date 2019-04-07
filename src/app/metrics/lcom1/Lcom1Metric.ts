import ClassModel from "../../models/ClassModel";
import IMetric from "../IMetric";
import Lcom1Converter from "./Lcom1Converter";

/**
 * Measures how cohesive a class is according to the LCOM1 metric.
 * 
 * To calculate LCOM1 for a class, construct a graph that has a node for each method in the class.
 * Add an undirected edge between any two nodes that reference the same variable. Now, imagine a
 * complete graph with the same nodes. The difference between the number of edges the complete 
 * graph and the actual graph is the LCOM1.
 */
export default class Lcom1Metric implements IMetric {
	/**
	 * Constructor.
	 * @param _converter an object that can convert a class to an appropriate graph
	 */
	constructor(private _converter: Lcom1Converter) { }

	/**
	 * Evaluates the class according to LCOM1.
	 * @param classModel the class the evaluate
	 */
	evaluate(classModel: ClassModel): number {
		// Based on http://www.cs.sjsu.edu/~pearce/modules/lectures/ood/metrics/lcom.htm.
		// LCOM1 seems to implicitly assume that there are no edges from a node to itself.
		let graph = this._converter.convert(classModel);
		let edges = Array.from(graph.edges).filter(edge => edge[0] !== edge[1]);

		// TODO: make sure the graph returns the right number of edges.
		// Since the graph should be considered undirected, we have to divide by 2 to get the edges.
		let undirectedEdgesCount = edges.length / 2;

		// LCOM1(graph) is difference between the maximum possible number of edges and the actual
		// number of edges.
		return graph.nodes.size * (graph.nodes.size - 1) / 2 - undirectedEdgesCount;
	}
}
