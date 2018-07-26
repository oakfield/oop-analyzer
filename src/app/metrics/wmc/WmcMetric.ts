import MethodModel from "../../models/MethodModel";
import { IMetric } from "../IMetric";

export default class WmcMetric<T> implements IMetric<T> {
	evaluate(toEvaluate: { variables: string[], methods: MethodModel[] }): number {
		return toEvaluate.methods.length;
	}
}