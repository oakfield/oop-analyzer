import Equatable from "../Equatable";

/**
 * Represents a node, in the sense of graphs in computer science. A node has neighbors and data
 * associated with it.
 */
export default interface INode<TData extends Equatable> extends Equatable {
	/**
	 * The information to store in the node.
	 */
	data: TData;

	/**
	 * Nodes to which this node is directly related.
	 */
	neighbors: Set<INode<TData>>;

	/**
	 * Iterates through the Node, its neighbors, its neighbors' neighbors, etc.
	 */
	depthFirstSearch(): IterableIterator<INode<TData>>;
}
