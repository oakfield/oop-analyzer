import ClassModel from "../../models/ClassModel";
import IUndirectedGraph from "../../graphs/IUndirectedGraph";
import MethodModel from "../../models/MethodModel";
import Node from "../../graphs/Node";
import UndirectedGraph from "../../graphs/UndirectedGraph";

/**
 * Converts class to a graph appropriate for measuring LCOM4.
 */
export default class Lcom4Converter {

	/**
	 * Converts a class to a graph appropriate for measure LCOM4.
	 * @param classModel the class to convert
	 */
	convert(classModel: ClassModel): IUndirectedGraph<MethodModel> {
		let methods = new Set<Node<MethodModel>>();

		for (let method of classModel.methods) {
			methods.add(new Node<MethodModel>(method));
		}

		for (let getter of classModel.getters) {
			methods.add(new Node<MethodModel>(getter));
		}

		for (let setter of classModel.setters) {
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

		return new UndirectedGraph<MethodModel>(methods);
	}
}
