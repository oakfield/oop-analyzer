import ClassModel from "../models/ClassModel";
import Lcom1Converter from "../metrics/lcom1/Lcom1Converter";

/**
 * Transforms a class into multiple classes with methods that form cliques. Since the transformer
 * could make non-maximal cliques simply by giving the classes one method each, it makes maximal
 * cliques instead. Methods are related to each other according to the LCOM1 metric; that is, they
 * are connected if they reference the same variable.
 */
export default class MaximalCliqueTransformer {
    // TODO: remove dependency on Lcom1Converter specifically, or explain why dependency is necessary
    /**
     * Constructor.
     * @param _lcom1Converter an object that can convert classes to the appropriate graphs
     */
    constructor(private _lcom1Converter: Lcom1Converter) { }

    /**
     * Transforms a class into multiple classes with methods that form maximal cliques.
     * @param classModel the class to transform
     */
    transform(classModel: ClassModel): ClassModel[] {
        let graph = this._lcom1Converter.convert(classModel);
        let classModels: ClassModel[] = [];
        let counter = 0;

        for (let maximalClique of graph.maximalCliques) {
            // TODO: can this logic, which is similar to that in ComponentsTransformer,
            // be placed somewhere else?
            let cliqueClassModel = new ClassModel(`Class${counter}`);
            let methods = Array.from(maximalClique.nodes)
                .map(n => n.data);
            let variables = methods
				.map(m => m.references)
				.reduce((a, b) => a.concat(b), [])
                .filter(r => classModel.variables.includes(r));
                
            // Get unique references.
            variables = Array.from(new Set(variables));
            
            cliqueClassModel.methods = methods;
			cliqueClassModel.variables = variables;
            counter++;
            
            classModels.push(cliqueClassModel);
        }

        return classModels;
    }
}
