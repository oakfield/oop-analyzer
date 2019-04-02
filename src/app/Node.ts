/**
 * Basic object-oriented implementation of a node, in the sense of graphs in computer science.
 */
export default class Node<T> implements INode<T> {
	public data: T;
	public neighbors: Set<Node<T>>;

	/**
	 * Constructor.
	 * @param data the information to store in the node
	 */
	constructor(data: T = null) {
		this.data = data;
		this.neighbors = new Set();
	}

	/**
	 * Iterates through the node, its neighbors, its neighbors' neighbors, etc.
	 */
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