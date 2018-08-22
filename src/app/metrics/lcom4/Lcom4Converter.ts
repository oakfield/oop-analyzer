import ClassModel from "../../models/ClassModel";
import Graph from "../../Graph";
import MethodModel from "../../models/MethodModel";
import Node from "../../Node";

export default class Lcom4Converter {

	convert(toConvert: ClassModel): Graph<MethodModel> {
		let methods = new Set<Node<MethodModel>>();

		for (let method of toConvert.methods) {
			methods.add(new Node<MethodModel>(method));
		}

		for (let getter of toConvert.getters) {
			methods.add(new Node<MethodModel>(getter));
		}

		for (let setter of toConvert.setters) {
			methods.add(new Node<MethodModel>(setter));
		}

		for (let m of methods) {
			for (let n of methods) {
				if (m.data.references.some(name => n.data.references.includes(name))
					|| m.data.references.find(variableModel => variableModel.name === n.data.name)
					|| n.data.references.find(variableModel => variableModel.name === m.data.name)) {
					m.neighbors.add(n);
					n.neighbors.add(m);
				}
			}
		}

		return new Graph<MethodModel>(methods);
	}
}