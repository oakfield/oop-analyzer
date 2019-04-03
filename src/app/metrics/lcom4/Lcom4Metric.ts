import ClassModel from "../../models/ClassModel";
import IMetric from "../IMetric";
import Lcom4Converter from "./Lcom4Converter";

/**
 * Measures how cohesive a class is according to the LCOM4 metric.
 */
export default class Lcom4Metric implements IMetric {
	/**
	 * Constructor.
	 * @param _converter an object that can convert a class to the appropriate graph
	 */
	constructor(private _converter: Lcom4Converter) { }

	/**
	 * Measures how cohesive a class is according to the LCOM4 metric.
	 * @param classModel the class to evaluate
	 */
	evaluate(classModel: ClassModel): number {
		return this._converter.convert(classModel).components.length;
	}
}
