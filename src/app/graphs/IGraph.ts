import INode from "./INode";

/**
 * An edge is a pair of nodes.
 */
export type IEdge<T> = [INode<T>, INode<T>];

/**
 * Model of a graph as used in computer science. A graph has nodes and edges.
 * 
 * This interface allows using multiple implementations of a graph.
 */
export default interface IGraph<T> {
	/**
	 * An array of connected components in the Graph.
	 * 
	 * A component is a subgraph in which each node has a path to each other node, and that can't
	 * be made any larger by adding other nodes.
	 * 
	 */
	readonly components: IGraph<T>[];

	/**
	 * A set of edges in the Graph.
	 */
	readonly edges: Set<IEdge<T>>;

	/**
	 * A set of nodes in the Graph.
	 */
	readonly nodes: Set<INode<T>>;
}
