import { difference, intersection, union } from "lodash";

import DirectedGraph from "./DirectedGraph";
import IUndirectedGraph from "./IUndirectedGraph";
import Node from "./Node";

/**
 * Basic object-oriented implementation of an undirected graph.
 */
export default class UndirectedGraph<TData> extends DirectedGraph<TData> implements IUndirectedGraph<TData> {

	/**
	 * Constructor.
	 * @param _nodes the nodes of the graph
	 * @throws if the nodes don't form an undirected graph
	 */
	constructor(nodes: Set<Node<TData>> = new Set()) {
		super(nodes);

		for (let edge of this.edges) {
			if (edge[0].neighbors.has(edge[1]) && !edge[1].neighbors.has(edge[0]) ||
				edge[1].neighbors.has(edge[0]) && !edge[0].neighbors.has(edge[1])) {
				throw new Error(`Tried to construct an undirected graph from a directed set of nodes: ${JSON.stringify(edge[0])}\n${JSON.stringify(edge[1])}`);
			}
		}
	}

	get maximalCliques(): IUndirectedGraph<TData>[] {
		let maximalCliques: IUndirectedGraph<TData>[] = [];
		UndirectedGraph._bronKerbosch([], Array.from(this._nodes), [], maximalCliques);

		return maximalCliques;
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
		maximalCliques: IUndirectedGraph<T>[]
	): void {
		if (unclassifiedNodes.length === 0 && excludedNodes.length === 0) {
			maximalCliques.push(new UndirectedGraph(new Set(currentWorkingClique)));
		}

		for (let unclassifiedNode of unclassifiedNodes) {
			UndirectedGraph._bronKerbosch(union(currentWorkingClique, [unclassifiedNode]),
				intersection(unclassifiedNodes, Array.from(unclassifiedNode.neighbors)),
				intersection(excludedNodes, Array.from(unclassifiedNode.neighbors)),
				maximalCliques);
			unclassifiedNodes = difference(unclassifiedNodes, [unclassifiedNode]);
			excludedNodes = union(excludedNodes, [unclassifiedNode]);
		}
	}
}
