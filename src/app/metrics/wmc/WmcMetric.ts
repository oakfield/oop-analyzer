import MethodModel from "../../models/MethodModel";
import { IMetric } from "../IMetric";
import VariableModel from "../../models/VariableModel";

export default class WmcMetric<T> implements IMetric<T> {
	evaluate(toEvaluate: { variables: VariableModel[], methods: MethodModel[] }): number {
		return toEvaluate.methods.length;
	}
}