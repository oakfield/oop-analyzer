import Equatable from "../Equatable";
import IDirectedEdge from "./IDirectedEdge";
import INode from "./INode";

/**
 * Directed edge model.
 */
export default class DirectedEdge<TData extends Equatable> implements IDirectedEdge<TData>, Equatable {
	private _nodes: [INode<TData>, INode<TData>];

	constructor(source: INode<TData>, target: INode<TData>) {
		this._nodes = [source, target];
	}

	get nodes(): [INode<TData>, INode<TData>] {
		return this._nodes;
	}

	get source(): INode<TData> {
		return this._nodes[0];
	}

	get target(): INode<TData> {
		return this._nodes[1];
	}

	equals(other: DirectedEdge<TData>): boolean {
		return this.source.equals(other.source) && this.target.equals(other.target);
	}
}
