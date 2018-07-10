import MethodModel from "./MethodModel";
import { IEvaluator } from "./IEvaluator";

export default class WmcEvalutor<T> implements IEvaluator<T> {
	evaluate(toEvaluate: { variables: string[], methods: MethodModel[] }): number {
		return toEvaluate.methods.length;
	}
}