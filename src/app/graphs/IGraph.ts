import Equatable from "../Equatable";
import EquatableSet from "../EquatableSet";
import INode from "./INode";
import IUndirectedEdge from "./IUndirectedEdge";

/**
 * Model of a graph as used in computer science. A graph has nodes and edges.
 * 
 * This interface allows using multiple implementations of a graph.
 */
export default interface IGraph<TData extends Equatable> {
	/**
	 * A set of edges in the Graph.
	 */
	readonly edges: EquatableSet<IUndirectedEdge<TData>>;

	/**
	 * A set of nodes in the Graph.
	 */
	readonly nodes: EquatableSet<INode<TData>>;
}
