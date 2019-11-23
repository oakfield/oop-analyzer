import Equatable from "../Equatable";
import INode from "./INode";
import IUndirectedEdge from "./IUndirectedEdge";

/**
 * Implementation of an Edge in a graph.
 */
export default class UndirectedEdge<TData extends Equatable> implements IUndirectedEdge<TData> {
	nodes: [INode<TData>, INode<TData>];

	constructor(nodeM: INode<TData>, nodeN: INode<TData>) {
		this.nodes = [nodeM, nodeN];
	}

	equals(other: UndirectedEdge<TData>): boolean {
		return this.nodes[0].equals(other.nodes[0]) && this.nodes[1].equals(other.nodes[1])
			|| this.nodes[0].equals(other.nodes[1]) && this.nodes[1].equals(other.nodes[0]);
	}
}
