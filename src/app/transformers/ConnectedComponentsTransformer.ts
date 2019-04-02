import ClassModel from "../models/ClassModel";
import Lcom4Metric from "../metrics/lcom4/Lcom4Converter";

/**
 * Transforms a class into multiple classes, each of which is a connected component. The
 * transformer defines connected components using the LCOM4 metric; that is, methods are
 * related if they reference the same variable or method.
 */
export default class ConnectedComponentsTransformer {
	// TODO: remove dependency on Lcom4Metric specifically
	/**
	 * Constructor.
	 * @param _converter an object that can convert class models to the appropriate graph
	 */
	constructor(private _converter: Lcom4Metric) { }

	/**
	 * Transforms a class into multiple classes, each of which is a connected component.
	 * @param classModel the class to transform
	 */
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