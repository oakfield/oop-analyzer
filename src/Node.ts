export default class Node<T> implements INode<T> {
	public data: T;
	public neighbors: Set<Node<T>>;

	constructor(data: T = null) {
		this.data = data;
		this.neighbors = new Set();
	}

	*partialDepthFirstSearch(): IterableIterator<Node<T>> {
		let discoveredNodes = new Set<Node<T>>();
		let stack: Node<T>[] = [];
		stack.push(this);

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