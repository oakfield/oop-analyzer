import { difference, intersection, union } from "lodash";

import Equatable from "../Equatable";
import EquatableSet from "../EquatableSet";
import INode from "./INode";
import IUndirectedEdge from "./IUndirectedEdge";
import IUndirectedGraph from "./IUndirectedGraph";
import Node from "./Node";
import UndirectedEdge from "./UndirectedEdge";

/**
 * Basic object-oriented implementation of an undirected graph.
 */
export default class UndirectedGraph<TData extends Equatable> implements IUndirectedGraph<TData> {

	/**
	 * Constructor.
	 * @param _nodes the nodes of the graph
	 * @throws if the nodes don't form an undirected graph
	 */
	constructor(protected _nodes = new EquatableSet<INode<TData>>()) { }

	get components(): IUndirectedGraph<TData>[] {
		let components: UndirectedGraph<TData>[] = [];
		let discoveredNodes = new EquatableSet<Node<TData>>();

		for (let node of this._nodes) {
			if (!discoveredNodes.has(node)) {
				let component = new UndirectedGraph<TData>();

				for (let searchedNode of node.depthFirstSearch()) {
					discoveredNodes.add(searchedNode);
					component._nodes.add(searchedNode);
				}

				components.push(component);
			}
		}

		return components;
	}

	get edges(): EquatableSet<IUndirectedEdge<TData>> {
		let edges = new EquatableSet<IUndirectedEdge<TData>>();

		for (let parentNodeM of this._nodes) {
			for (let parentNodeN of this._nodes) {
				for (let childNodeM of parentNodeM.depthFirstSearch()) {
					for (let childNodeN of parentNodeN.depthFirstSearch()) {
						if (childNodeM.neighbors.has(childNodeN)) {
							edges.add(new UndirectedEdge(childNodeM, childNodeN));
						}
					}
				}
			}
		}

		return edges;
	}

	get maximalCliques(): IUndirectedGraph<TData>[] {
		let maximalCliques: IUndirectedGraph<TData>[] = [];
		UndirectedGraph._bronKerbosch([], Array.from(this._nodes), [], maximalCliques);

		return maximalCliques;
	}

	get nodes(): EquatableSet<INode<TData>> {
		let nodes = new EquatableSet<INode<TData>>();

		for (let node of this._nodes) {
			for (let searchedNode of node.depthFirstSearch()) {
				nodes.add(searchedNode);
			}
		}

		return nodes;
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
	private static _bronKerbosch<TData extends Equatable>(
		currentWorkingClique: INode<TData>[],
		unclassifiedNodes: INode<TData>[],
		excludedNodes: INode<TData>[],
		maximalCliques: IUndirectedGraph<TData>[]
	): void {
		if (unclassifiedNodes.length === 0 && excludedNodes.length === 0) {
			maximalCliques.push(new UndirectedGraph(new EquatableSet(...currentWorkingClique)));
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
