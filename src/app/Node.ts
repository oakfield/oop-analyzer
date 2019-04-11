import INode from "./INode";

/**
 * Basic object-oriented implementation of a node, in the sense of graphs in computer science.
 */
export default class Node<T> implements INode<T> {
	/**
	 * The information to store in the Node.
	 */
	data: T;

	/**
	 * The Nodes to which this Node is directly connected.
	 */
	neighbors: Set<Node<T>>;

	/**
	 * Constructor.
	 * @param data the information to store in the Node
	*/
	constructor(data: T) {
		this.data = data;
		this.neighbors = new Set();
	}

	/**
	 * Iterates through the Node, its neighbors, its neighbors' neighbors, etc.
	 */
	*partialDepthFirstSearch(): IterableIterator<Node<T>> {
		let discoveredNodes = new Set<Node<T>>();
		let stack: Node<T>[] = [];
		stack.push(this);

		while (stack.length) {
			let nextNode = stack.pop()!;

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
