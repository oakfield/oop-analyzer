import ClassModel from "../models/ClassModel";

/**
 * The interface shared by metrics.
 */
export default interface IMetric {
	evaluate(classModel: ClassModel): number;
}