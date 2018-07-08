import Lcom4Converter from './Lcom4Converter';
import ClassModel from './ClassModel';
import { IEvaluator } from './IEvaluator';

export default class Lcom4Evaluator<T> implements IEvaluator<T> {
	constructor(private _converter: Lcom4Converter) { }

	evaluate(toEvaluate: ClassModel): number {
		return this._converter.convert(toEvaluate).connectedComponents.length;
	}
}