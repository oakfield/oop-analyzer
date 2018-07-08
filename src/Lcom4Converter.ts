import Node from "./Node";
import Graph from "./Graph";
import ClassModel from "./ClassModel";
import MethodModel from "./MethodModel";

export default class Lcom4Converter {

	convert(toConvert: ClassModel): Graph<MethodModel> {
		let methods = new Set<Node<MethodModel>>();

		for (let method of toConvert.methods) {
			methods.add(new Node<MethodModel>(method));
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

		return new Graph<MethodModel>(methods);
	}
}