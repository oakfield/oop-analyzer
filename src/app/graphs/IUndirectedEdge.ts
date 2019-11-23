import Equatable from "../Equatable";
import INode from "./INode";

/**
 * An undirected edge between two Nodes.
 */
export default interface IUndirectedEdge<TData extends Equatable> extends Equatable {
	/**
	 * The nodes of the edge.
	 */
	nodes: [INode<TData>, INode<TData>];
}
