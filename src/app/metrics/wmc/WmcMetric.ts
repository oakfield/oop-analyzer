import ClassModel from "../../models/ClassModel";

export default class WmcMetric<T> {
	evaluate(toEvaluate: ClassModel[]): number {
		return toEvaluate
			.map(classModel => classModel.methods.length)
			.reduce((a, b) => a + b, 0) / toEvaluate.length;
	}
}