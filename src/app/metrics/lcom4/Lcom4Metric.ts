import ClassModel from "../../models/ClassModel";
import IMetric from "../IMetric";
import Lcom4Converter from "./Lcom4Converter";

export default class Lcom4Metric<T> implements IMetric<T> {
	constructor(private _converter: Lcom4Converter) { }

	evaluate(toEvaluate: ClassModel): number {
		return this._converter.convert(toEvaluate).connectedComponents.length;
	}
}
