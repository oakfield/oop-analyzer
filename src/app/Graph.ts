import IGraph, { IEdge } from "./IGraph";
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
	 * A recursive backtracking algorithm for finding maximal cliques in an undirected graph. This
	 * algorithm mutates maximalCliques, which is used as the output.
	 * 
	 * @param currentWorkingClique a set (R) of nodes disjoint with unclassifiedNodes and excludedNodes
	 * @param unclassifiedNodes a set of nodes (P) disjoint with currentWorkingClique and excludedNodes
	 * @param excludedNodes a set of nodes (X) disjoint with currentWorkingClique and unclassifiedNodes
	 * @param maximalCliques the primary input and output of the algorithm
	 */
	private static _bronKerbosch<T>(
		currentWorkingClique: Node<T>[],
		unclassifiedNodes: Node<T>[],
		excludedNodes: Node<T>[],
		maximalCliques: Graph<T>[]
	): void {
		if (unclassifiedNodes.length === 0 && excludedNodes.length === 0) {
			maximalCliques.push(new Graph(new Set(currentWorkingClique)));
		}

		for (let unclassifiedNode of unclassifiedNodes) {
			Graph._bronKerbosch(union(currentWorkingClique, [unclassifiedNode]),
				intersection(unclassifiedNodes, Array.from(unclassifiedNode.neighbors)),
				intersection(excludedNodes, Array.from(unclassifiedNode.neighbors)),
				maximalCliques);
			unclassifiedNodes = difference(unclassifiedNodes, [unclassifiedNode]);
			excludedNodes = union(excludedNodes, [unclassifiedNode]);
		}
	}
}
