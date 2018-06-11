import Lcom4Converter from "./Lcom4Converter";

export default class Lcom4Validator {
	constructor(private _converter: Lcom4Converter) { }

	validate(toValidate: ClassModel): ClassModel[] {
		let graph = this._converter.convert(toValidate);
		let outputClasses = [] as ClassModel[];

		for (let connectedComponent of graph.connectedComponents) {
			let methods = Array.from(connectedComponent.nodes)
					.map(node => node.data);
			let variables = methods
				.map(method => method.references)
				.reduce((a, b) => a.concat(b), [])
				.filter(reference => toValidate.variables.includes(reference));

			// Get unique references.
			variables = Array.from(new Set(variables));

			outputClasses.push({
				variables,
				methods
			});
		}

		return outputClasses;
	}
}