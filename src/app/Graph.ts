import Node from "./Node";

export default class Graph<T> implements IGraph<T> {
	constructor(private _nodes: Set<Node<T>> = new Set()) { }

	get connectedComponents(): IGraph<T>[] {
		let connectedComponents: IGraph<T>[] = [];
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

	// todo: add addNode and removeNode?
	get nodes(): Set<Node<T>> {
		return this._nodes;
	}
}