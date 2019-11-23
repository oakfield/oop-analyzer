import ClassModel from "../../models/ClassModel";
import IComponentsTransformer from "../ITransformer";
import IUndirectedGraphConverter from "src/app/metrics/IUndirectedGraphConverter";

/**
 * Transforms a class into multiple classes with methods that form cliques. Since the transformer
 * could make non-maximal cliques simply by giving the classes one method each, it makes maximal
 * cliques instead. Methods are related to each other according to the LCOM1 metric; that is, they
 * are connected if they reference the same variable.
 */
export default class MaximalCliqueTransformer implements IComponentsTransformer {
	/**
	 * Constructor.
	 * @param _lcom1Converter an object that can convert classes to the appropriate graphs
	 */
	constructor(private _lcom1Converter: IUndirectedGraphConverter) { }

	/**
	 * Transforms a class into multiple classes with methods that form maximal cliques.
	 * @param classModel the class to transform
	 */
	transform(classModel: ClassModel): ClassModel[] {
		let graph = this._lcom1Converter.convert(classModel);
		let counter = 0;

		let classModels = graph.maximalCliques.map<ClassModel>(maximalClique => {
			// TODO: can this logic, which is similar to that in ComponentsTransformer,
			// be placed somewhere else?
			let cliqueClassModel = new ClassModel(`Class${counter}`);
			let methods = maximalClique.nodes
				.map(node => node.data);
			let variables = methods	
				.map(method => method.references)
				.flatten()
				.filter(reference => classModel.variables.has(reference));

			cliqueClassModel.methods = methods;
			cliqueClassModel.variables = variables;
			counter++;

			return cliqueClassModel;
		});

		// The class may have some variables not referenced in a method. Collect them here and dump
		// them into the first class.
		classModels[0].variables = classModels[0].variables.union(classModel.constructorVariables);

		return classModels;
	}
}
