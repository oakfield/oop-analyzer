import ClassModel from "../../models/ClassModel";
import IComponentsTransformer from "../ITransformer";
import IUndirectedGraphConverter from "src/app/metrics/IUndirectedGraphConverter";
import { uniq } from "lodash";

/**
 * Transforms a class into multiple classes, each of which is a connected component. The
 * transformer defines components using the LCOM4 metric; that is, methods are related if they
 * reference the same variable or method.
 */
export default class ComponentsTransformer implements IComponentsTransformer {
	/**
	 * Constructor.
	 * @param _converter an object that can convert class models to the appropriate graph
	 */
	constructor(private _converter: IUndirectedGraphConverter) { }

	/**
	 * Transforms a class into multiple classes, each of which is a component.
	 * @param classModel the class to transform
	 */
	transform(classModel: ClassModel): ClassModel[] {
		let graph = this._converter.convert(classModel);
		let counter = 0;

		let classModels = graph.components.map<ClassModel>(component => {
			let methods = Array.from(component.nodes)
				.map(node => node.data);
			let variables = uniq(methods
				.map(method => method.references)
				.reduce((a, b) => a.concat(b), [])
				.filter(reference => classModel.variables.includes(reference)));

			let newClassModel = new ClassModel(`Class${counter}`);
			newClassModel.methods = methods;
			newClassModel.variables = variables;
			counter++;

			return newClassModel;
		});

		// We should always get out as much information out of transform as we in. If there are no
		// connected components, just return the original ClassModel.
		if (!classModels.length) {
			classModels.push(classModel);
		}

		// The class may have some variables not referenced in a method. Collect them here and dump
		// them into the first class.
		classModels[0].variables = uniq(classModels[0].variables.concat(classModel.constructorVariables));

		return classModels;
	}
}
