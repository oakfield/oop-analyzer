import ClassModel from "../models/ClassModel";

export interface IMetric<T> {
	evaluate(toEvaluate: ClassModel): number;
}