import Node from "./Node";

export default class Graph {
	constructor(nodes = new Set()) {
		this._nodes = nodes;
	}

	// todo: add addNode and removeNode?
	get nodes() {
		return this._nodes;
	}

	get connectedComponents() {
		let connectedComponents = [];
		let discoveredNodes = new Set();

		for (let node of this.nodes) {
			if (!discoveredNodes.has(node)) {
				let connectedComponent = new Graph();

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