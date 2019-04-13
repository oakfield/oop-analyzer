import ClassModel from "../models/ClassModel";

/**
 * The interface shared by metrics.
 */
export default interface IMetric {
	/**
	 * Returns a number measuring the class.
	 * @param classModel the class to evaluate
	 */
	evaluate(classModel: ClassModel): number;
}
