import ClassModel from "../models/ClassModel";
import Lcom1Converter from "../metrics/lcom1/Lcom1Converter";

export default class MaximalCliqueTransformer {
    // TODO: remove dependency on Lcom1Converter specifically, or explain why dependency is necessary
    constructor(private _lcom1Converter: Lcom1Converter) { }

    transform(classModel: ClassModel): ClassModel[] {
        let graph = this._lcom1Converter.convert(classModel);
        let classModels: ClassModel[] = [];
        let counter = 0;

        for (let maximalClique of graph.maximalCliques) {
            // TODO: can this logic, which is similar to that in ConnectedComponentsTransformer,
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
