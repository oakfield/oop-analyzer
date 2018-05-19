export default class Graph<T> implements IGraph<T> {
	constructor(nodes: Set<INode<T>> = new Set()) {
		this._nodes = nodes;
	}

	// todo: add addNode and removeNode?
	get nodes(): Set<INode<T>> {
		for (let node of this._nodes)
			for (let neighbor of node.neighbors)
				this._nodes.add(neighbor);

		return this._nodes;
	}

	get connectedComponents(): IGraph<T>[] {
		let connectedComponents: IGraph<T>[] = [];
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

	private _nodes: Set<INode<T>>;

	private *_partialDepthFirstSearch(startNode: INode<T>): IterableIterator<INode<T>> {
		let discoveredNodes = new Set<INode<T>>();
		let stack: INode<T>[] = [];
		stack.push(startNode);

		while (stack.length) {
			let nextNode = stack.pop();

			if (!discoveredNodes.has(nextNode)) {
				discoveredNodes.add(nextNode);

				yield nextNode;

				for (let neighbor of nextNode.neighbors) {
					stack.push(neighbor);
				}
			}
		}
	}
}