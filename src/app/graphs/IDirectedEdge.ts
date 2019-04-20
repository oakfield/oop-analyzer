import IEdge from "./IEdge";
import INode from "./INode";

/**
 * A directed edge or arrow.
 */
export default interface IDirectedEdge<TData> extends IEdge<TData> {
	/**
	 * The node the edge starts from.
	 */
	source: INode<TData>;

	/**
	 * The node the edge goes to.
	 */
	target: INode<TData>;
}
