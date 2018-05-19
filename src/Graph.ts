class Graph<T> implements IGraph<T> {
	nodes: Set<INode<T>>;
	edges: Set<IEdge<T>>;

	constructor(nodes: Set<INode<T>> = new Set(), edges: Set<IEdge<T>> = new Set()) {
		this.nodes = nodes;
		this.edges = edges;
	}

	// get connectedComponents(): IGraph<T>[] {
	// 	if (this._connectedComponents) {
	// 		return this._connectedComponents;
	// 	}

	// 	this._connectedComponents = [];
	// 	let currentConnectedComponent = new Graph<T>();

	// 	for (let node of this.nodes) {
	// 		let numberOfDiscoveredNodes = this._discoveredNodes.size;

	// 		this._partialDepthFirstSearch(node);
	// 		if (this._discoveredNodes.size > numberOfDiscoveredNodes) {
	// 			numberOfConnectedComponents++;
	// 		}
	// 	}

	// 	return numberOfConnectedComponents;
	// }

	get connectedComponents(): IGraph<T>[] {
		let connectedComponents = [] as IGraph<T>[];
		let discoveredNodes = new Set<INode<T>>();

		for (let node of this.nodes) {
			if (!discoveredNodes.has(node)) {
				let connectedComponent = new Graph<T>();

				for (let searchedNode of this._partialDepthFirstSearch(node)) {
					discoveredNodes.add(searchedNode);
					connectedComponent.nodes.add(searchedNode);
				}

				connectedComponents.push(connectedComponent);
			}
		}

		return connectedComponents;
	}

	addEdge(edge: IEdge<T>) {
		if (!(this.nodes.has(edge[0]) && this.nodes.has(edge[1])))
			throw new Error();
		
		this.edges.add(edge);
	}

	removeEdge(edge: IEdge<T>) {
		this.edges.delete(edge);
	}

	addNode(node: INode<T>) {
		this.nodes.add(node);
	}

	removeNode(node: INode<T>) {
		for (let edge of this.edges) {
			if (edge[0] === node || edge[1] === node) {
				this.removeEdge(edge);
			}
		}

		this.nodes.delete(node);
	}

	getNeighborsOf(node: INode<T>): Set<INode<T>> {
		const neighbors: Set<INode<T>> = new Set();

		for (let edge of this.edges) {
			if (edge[0] === node)
				neighbors.add(edge[1]);

			if (edge[1] === node)
				neighbors.add(edge[0]);
		}

		return neighbors;
	};

	// private *_partialDepthFirstSearch(startNode: INode<T>,
	// 	discoveredNodes = new Set<INode<T>>()): IterableIterator<INode<T>> {
	// 	yield startNode;

	// 	discoveredNodes.add(startNode);

	// 	for (let node of this.getNeighborsOf(startNode))
	// 		if (!discoveredNodes.has(node))
	// 			yield this._partialDepthFirstSearch(node, discoveredNodes);
	// }

	private *_partialDepthFirstSearch(startNode: INode<T>): IterableIterator<INode<T>> {
		let discoveredNodes = new Set<INode<T>>();
		let stack: INode<T>[] = [];
		stack.push(startNode);

		while (stack.length) {
			let nextNode = stack.pop();

			if (!discoveredNodes.has(nextNode)) {
				discoveredNodes.add(nextNode);

				yield nextNode;

				for (let neighbor of this.getNeighborsOf(nextNode)) {
					stack.push(neighbor);
				}
			}
		}
	}
}