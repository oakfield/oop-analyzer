import INode from "./INode";

/**
 * Basic object-oriented implementation of a node, in the sense of graphs in computer science.
 */
export default class Node<TData> implements INode<TData> {
	data: TData;
	neighbors: Set<Node<TData>>;

	/**
	 * Constructor.
	 * @param data the information to store in the Node
	 */
	constructor(data: TData) {
		this.data = data;
		this.neighbors = new Set();
	}

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
