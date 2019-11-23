import Equatable from "../Equatable";
import INode from "./INode";
import IUndirectedEdge from "./IUndirectedEdge";

/**
 * A directed edge or arrow.
 */
export default interface IDirectedEdge<TData extends Equatable> extends IUndirectedEdge<TData> {
	/**
	 * The node the edge starts from.
	 */
	source: INode<TData>;

	/**
	 * The node the edge goes to.
	 */
	target: INode<TData>;
}
