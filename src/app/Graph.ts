import { difference, intersection, union } from "lodash";

import Node from "./Node";

/**
 * Basic object-oriented implementation of the IGraph interface.
 */
export default class Graph<T> implements IGraph<T> {
	/**
	 * Constructor.
	 * @param _nodes the nodes of the graph
	 */
	constructor(protected _nodes: Set<Node<T>> = new Set()) { }

	get components(): Graph<T>[] {
		let components: Graph<T>[] = [];
		let discoveredNodes = new Set<Node<T>>();

		for (let node of this.nodes) {
			if (!discoveredNodes.has(node)) {
				let component = new Graph<T>();

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

	get maximalCliques(): Graph<T>[] {
		let maximalCliques: Graph<T>[] = [];
		Graph._bronKerbosch([], Array.from(this._nodes), [], maximalCliques);

		return maximalCliques;
	}

	get nodes(): Set<Node<T>> {
		return this._nodes;
	}

	/**
	 * An algorithm for finding maximal cliques in an undirected graph. This algorithm mutates
	 * maximalCliques, which is used as the output.
	 * 
	 * @param r 
	 * @param p 
	 * @param x 
	 * @param maximalCliques the primary input and output of the algorithm
	 */
	private static _bronKerbosch<T>(r: Node<T>[], p: Node<T>[], x: Node<T>[], maximalCliques: Graph<T>[]): void {
		if (p.length === 0 && x.length === 0) {
			maximalCliques.push(new Graph(new Set(r)));
		}

		for (let node of p) {
 			Graph._bronKerbosch(union(r, [node]),
				intersection(p, Array.from(node.neighbors)),
				intersection(x, Array.from(node.neighbors)),
				maximalCliques);
			p = difference(p, [node]);
			x = union(x, [node]);
		}
	}
}
