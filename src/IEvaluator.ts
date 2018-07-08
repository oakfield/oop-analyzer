import ClassModel from "./ClassModel";

export interface IEvaluator<T> {
	evaluate(toEvaluate: ClassModel): number;
}