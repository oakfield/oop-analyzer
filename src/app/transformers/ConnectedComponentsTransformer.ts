import ClassModel from "../models/ClassModel";
import Lcom4Metric from "../metrics/lcom4/Lcom4Converter";

/**
 * Transforms a class into a list of classes, each of which is a connected components as defined
 * by LCOM4.
 */
export default class ConnectedComponentsTransformer {
	// TODO: remove dependency on Lcom4Metric specifically
	constructor(private _converter: Lcom4Metric) { }

	transform(classModel: ClassModel): ClassModel[] {
		let graph = this._converter.convert(classModel);
		let outputClasses = [] as ClassModel[];
		let counter = 0;

		for (let connectedComponent of graph.connectedComponents) {
			let methods = Array.from(connectedComponent.nodes)
					.map(node => node.data);
			let variables = methods
				.map(method => method.references)
				.reduce((a, b) => a.concat(b), [])
				.filter(reference => classModel.variables.includes(reference));

			// Get unique references.
			variables = Array.from(new Set(variables));

			let newClassModel = new ClassModel(`Class${counter}`);
			newClassModel.methods = methods;
			newClassModel.variables = variables;
			counter++;

			outputClasses.push(newClassModel);
		}

		return outputClasses;
	}
}