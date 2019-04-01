import ClassModel from "../models/ClassModel";

export default interface IMetric {
	evaluate(toEvaluate: ClassModel): number;
}