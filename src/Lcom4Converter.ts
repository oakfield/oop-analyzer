import Node from "./Node";
import Graph from "./Graph";

export default class Lcom4Converter {

	convert(toConvert: { variables: string[], methods: Method[] }): IGraph<Method> {
		let methods = new Set<Node<Method>>();

		for (let method of toConvert.methods) {
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