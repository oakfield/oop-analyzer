import Node from "./Node";

export default class Graph<T> implements IGraph<T> {
	constructor(private _nodes: Set<Node<T>> = new Set()) { }

	// todo: add addNode and removeNode?
	get nodes(): Set<Node<T>> {
		return this._nodes;
	}

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
}