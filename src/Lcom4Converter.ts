import Node from "./Node";
import Graph from "./Graph";

type Method = { name: string, references: string[]};

export default class Lcom4Converter {
	private _jsonString: string;

	constructor(jsonString) {
		this._jsonString = jsonString;
	}

	convert(): IGraph<Method> {
		let parsedClass = JSON.parse(this._jsonString);
		let methods = new Set<Node<Method>>();

		for (let method of parsedClass.methods) {
			methods.add(new Node<Method>(method));
		}

		for (let m of methods) {
			for (let n of methods) {
				if (m.data.references.some(name => n.data.references.includes(name))
					|| m.data.references.includes(n.data.name)
					|| n.data.references.includes(m.data.name)) {
					m.neighbors.add(n);
					n.neighbors.add(m);
				}
			}
		}

		return new Graph<Method>(methods);
	}
}