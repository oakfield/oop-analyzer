export default class Graph {
	constructor(nodes = new Set()) {
		this._nodes = nodes;
	}

	// todo: add addNode and removeNode?
	get nodes() {
		return this._nodes;
	}

	get components() {
		let components = [];
		let discoveredNodes = new Set();

		for (let node of this.nodes) {
			if (!discoveredNodes.has(node)) {
				let component = new Graph();

				for (let searchedNode of node.partialDepthFirstSearch()) {
					discoveredNodes.add(searchedNode);
					component.nodes.add(searchedNode);
				}

				components.push(component);
			}
		}

		return components;
	}
}