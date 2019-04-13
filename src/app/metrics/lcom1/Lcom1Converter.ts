import ClassModel from '../../models/ClassModel';
import Graph from '../../Graph';
import MethodModel from '../../models/MethodModel';
import Node from "../../Node";

/**
 * Converts a class into a graph representing the class.
 */
export default class Lcom1Converter {

	/**
	 * Converts a class into a graph representing the class.
	 * @param classModel the class to convert
	 */
	convert(classModel: ClassModel): Graph<MethodModel> {
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
				// Based on http://www.cs.sjsu.edu/~pearce/modules/lectures/ood/metrics/lcom.htm.
				// LCOM1 seems to implicitly assume that there are no edges from a node to itself.
				if (m !== n && m.data.references.some(name => n.data.references.includes(name))) {
					m.neighbors.add(n);
					n.neighbors.add(m);
				}
			}
		}

		return new Graph<MethodModel>(methods);
	}
}
