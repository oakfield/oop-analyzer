import { difference, intersection, union } from "lodash";

import IEdge from "./IEdge";
import INode from "./INode";
import IUndirectedGraph from "./IUndirectedGraph";
import Node from "./Node";

/**
 * Basic object-oriented implementation of an undirected graph.
 */
export default class UndirectedGraph<TData> implements IUndirectedGraph<TData> {

	// TODO: there is probably a bug with node counts
	/**
	 * Constructor.
	 * @param nodes the nodes of the graph
	 * @throws if the nodes don't form an undirected graph
	 */
	constructor(public nodes: Set<INode<TData>> = new Set()) { }

	get components(): IUndirectedGraph<TData>[] {
		let components: UndirectedGraph<TData>[] = [];
		let discoveredNodes = new Set<Node<TData>>();

		for (let node of this.nodes) {
			if (!discoveredNodes.has(node)) {
				let component = new UndirectedGraph<TData>();

				for (let searchedNode of node.depthFirstSearch()) {
					discoveredNodes.add(searchedNode);
					component.nodes.add(searchedNode);
				}

				components.push(component);
			}
		}

		return components;
	}

	// TODO: this method is OUTTA CONTROL
	get edges(): Set<IEdge<TData>> {
		let edges: IEdge<TData>[] = [];

		for (let parentNodeM of this.nodes) {
			for (let parentNodeN of this.nodes) {
				for (let childNodeM of parentNodeM.depthFirstSearch()) {
					for (let childNodeN of parentNodeN.depthFirstSearch()) {
						if (childNodeM.neighbors.has(childNodeN)
							&& !edges.find(edge =>
								edge.nodes[0] === childNodeM && edge.nodes[1] === childNodeN
								|| edge.nodes[0] === childNodeN && edge.nodes[1] === childNodeM)) {
							edges.push({
								nodes: [childNodeM, childNodeN]
							});
						}
					}
				}
			}
		}

		return new Set(edges);
	}

	get maximalCliques(): IUndirectedGraph<TData>[] {
		let maximalCliques: IUndirectedGraph<TData>[] = [];
		UndirectedGraph._bronKerbosch([], Array.from(this.nodes), [], maximalCliques);

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
	private static _bronKerbosch<TData>(
		currentWorkingClique: INode<TData>[],
		unclassifiedNodes: INode<TData>[],
		excludedNodes: INode<TData>[],
		maximalCliques: IUndirectedGraph<TData>[]
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
