import INode from "./INode";

/**
 * Basic object-oriented implementation of a node, in the sense of graphs in computer science.
 */
export default class Node<TData> implements INode<TData> {
	/**
	 * The information to store in the Node.
	 */
	data: TData;

	/**
	 * The Nodes to which this Node is directly connected.
	 */
	neighbors: Set<Node<TData>>;

	/**
	 * Constructor.
	 * @param data the information to store in the Node
	*/
	constructor(data: TData) {
		this.data = data;
		this.neighbors = new Set();
	}

	/**
	 * Iterates through the Node, its neighbors, its neighbors' neighbors, etc.
	 */
	*depthFirstSearch(): IterableIterator<Node<TData>> {
		let discoveredNodes = new Set<Node<TData>>();
		let stack: Node<TData>[] = [];
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
