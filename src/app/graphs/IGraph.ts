import IEdge from "./IEdge";
import INode from "./INode";

/**
 * Model of a graph as used in computer science. A graph has nodes and edges.
 * 
 * This interface allows using multiple implementations of a graph.
 */
export default interface IGraph<TData> {
	/**
	 * A set of edges in the Graph.
	 */
	readonly edges: Set<IEdge<TData>>;

	/**
	 * A set of nodes in the Graph.
	 */
	readonly nodes: Set<INode<TData>>;
}
