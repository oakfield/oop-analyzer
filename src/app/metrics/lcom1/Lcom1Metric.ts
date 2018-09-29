import ClassModel from "../../models/ClassModel";
import IMetric from "../IMetric";
import Lcom1Converter from "./Lcom1Converter";
import { filter } from "lodash";

export default class Lcom1Metric<T> implements IMetric<T> {
	constructor(private _converter: Lcom1Converter) { }

	evaluate(classModel: ClassModel): number {
		// Based on http://www.cs.sjsu.edu/~pearce/modules/lectures/ood/metrics/lcom.htm.
		// LCOM1 seems to implicitly assume that there are no edges from a node to itself.
		let edges = filter(this._converter.convert(classModel).edges, e => e[0] !== e[1]);

		// LCOM1(graph) is difference between the maximum possible number of edges and the actual
		// number of edges.
		return classModel.methods.length * (classModel.methods.length - 1) / 2 - edges.length;
	}
}