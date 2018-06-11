export default class WmcEvalutor<T> implements IEvaluator<T> {
	evaluate(toEvaluate: { variables: string[], methods: Method[] }): number {
		return toEvaluate.methods.length;
	}
}