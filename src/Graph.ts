import Node from "./Node";

export default class Graph<T> implements IGraph<T> {
	constructor(nodes: Set<Node<T>> = new Set()) {
		this._nodes = nodes;
	}

	// todo: add addNode and removeNode?
	get nodes(): Set<Node<T>> {
		for (let node of this._nodes)
			for (let neighbor of node.neighbors)
				this._nodes.add(neighbor);

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

	private _nodes: Set<Node<T>>;
}