import INode from "./INode";

/**
 * A edge between two Nodes, directed or undirected.
 */
export default interface IEdge<TData> {
	/**
	 * The nodes of the edge.
	 */
	nodes: [INode<TData>, INode<TData>];
}
