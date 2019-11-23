import DirectedEdge from "./DirectedEdge";
import Equatable from "../Equatable";
import EquatableSet from "../EquatableSet";
import IDirectedEdge from "./IDirectedEdge";
import IGraph from "./IGraph";
import INode from "./INode";

/**
 * Basic object-oriented implementation of the IGraph interface.
 */
export default class DirectedGraph<TData extends Equatable> implements IGraph<TData> {
	/**
	 * Constructor.
	 * @param _nodes the nodes of the graph
	 */
	constructor(protected _nodes = new EquatableSet<INode<TData>>()) { }

	get edges(): EquatableSet<IDirectedEdge<TData>> {
		let edges = new EquatableSet<IDirectedEdge<TData>>();

		for (let parentSource of this._nodes) {
			for (let parentTarget of this._nodes) {
				for (let childSource of parentSource.depthFirstSearch()) {
					for (let childTarget of parentTarget.depthFirstSearch()) {
						if (childSource.neighbors.has(childTarget)) {
							edges.add(new DirectedEdge(childSource, childTarget));
						}
					}
				}
			}
		}

		return edges;
	}

	get nodes(): EquatableSet<INode<TData>> {
		return this._nodes;
	}
}
