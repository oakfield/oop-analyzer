import { difference, intersection, union } from "lodash";

import Node from "./Node";

export default class Graph<T> implements IGraph<T> {
	constructor(private _nodes: Set<Node<T>> = new Set()) { }

	get connectedComponents(): Graph<T>[] {
		let connectedComponents: Graph<T>[] = [];
		let discoveredNodes = new Set<Node<T>>();

		for (let node of this.nodes) {
			if (!discoveredNodes.has(node)) {
				let connectedComponent = new Graph<T>();

				for (let searchedNode of node.partialDepthFirstSearch()) {
					discoveredNodes.add(searchedNode);
					connectedComponent.nodes.add(searchedNode);
				}

				connectedComponents.push(connectedComponent);
			}
		}

		return connectedComponents;
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
		let maximalCliques = [];
		Graph._bronKerbosch([], Array.from(this._nodes), [], maximalCliques);

		return maximalCliques;
	}

	// todo: add addNode and removeNode?
	get nodes(): Set<Node<T>> {
		return this._nodes;
	}

	// private static *_bronKerbosch<T>(r: Node<T>[], p: Node<T>[], x: Node<T>[]): IterableIterator<Graph<T>> {
	// 	if (p.length === 0 && x.length === 0) {
	// 		yield new Graph(new Set(r));
	// 	}

	// 	for (let node of p) {
	// 		Graph._bronKerbosch(union(r, [node]),
	// 			intersection(p, Array.from(node.neighbors)),
	// 			intersection(x, Array.from(node.neighbors)));
	// 		p = difference(p, [node]);
	// 		x = union(x, [node]);
	// 	}
	// }

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
