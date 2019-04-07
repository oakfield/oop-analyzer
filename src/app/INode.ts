/**
 * Represents a node, in the sense of graphs in computer science. A node has neighbors and data
 * associated with it.
 */
interface INode<T> {
	/**
	 * The information to store in the node.
	 */
	data: T;

	/**
	 * Nodes to which this node is directly related.
	 */
	neighbors: Set<INode<T>>;
}
