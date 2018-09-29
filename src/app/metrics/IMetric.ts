import ClassModel from "../models/ClassModel";

export default interface IMetric<T> {
	evaluate(toEvaluate: ClassModel): number;
}