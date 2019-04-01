import ClassModel from "../../models/ClassModel";
import IMetric from "../IMetric";
import Lcom1Converter from "./Lcom1Converter";
import { filter } from "lodash";

/**
 * A way of evaluating classes according to LCOM1.
 * 
 * To calculate LCOM1 for a class, construct a graph that has a node for each method in the class.
 * Add an undirected edge between any two nodes that reference the same variable. Now, imagine a
 * complete graph with the same nodes. The difference between the number of edges the complete 
 * graph and the actual graph is the LCOM1.
 */
export default class Lcom1Metric implements IMetric {
	constructor(private _converter: Lcom1Converter) { }

	evaluate(classModel: ClassModel): number {
		// Based on http://www.cs.sjsu.edu/~pearce/modules/lectures/ood/metrics/lcom.htm.
		// LCOM1 seems to implicitly assume that there are no edges from a node to itself.
		let edges = filter(this._converter.convert(classModel).edges, edge => edge[0] !== edge[1]);

		// LCOM1(graph) is difference between the maximum possible number of edges and the actual
		// number of edges.
		return classModel.methods.length * (classModel.methods.length - 1) / 2 - edges.length;
	}
}