import IGraph, { IEdge } from "./IGraph";

import Node from "./Node";

/**
 * Basic object-oriented implementation of the IGraph interface.
 */
export default class DirectedGraph<T> implements IGraph<T> {
	/**
	 * Constructor.
	 * @param _nodes the nodes of the graph
	 */
	constructor(protected _nodes: Set<Node<T>> = new Set()) { }

	get components(): DirectedGraph<T>[] {
		let components: DirectedGraph<T>[] = [];
		let discoveredNodes = new Set<Node<T>>();

		for (let node of this.nodes) {
			if (!discoveredNodes.has(node)) {
				let component = new DirectedGraph<T>();

				for (let searchedNode of node.partialDepthFirstSearch()) {
					discoveredNodes.add(searchedNode);
					component.nodes.add(searchedNode);
				}

				components.push(component);
			}
		}

		return components;
	}

	get edges(): Set<IEdge<T>> {
		let edges = new Set<IEdge<T>>();

		for (let m of this.nodes) {
			for (let n of this.nodes) {
				if (m.neighbors.has(n)) {
					edges.add([m, n]);
				}
			}
		}

		return edges;
	}

	get nodes(): Set<Node<T>> {
		return this._nodes;
	}
}
