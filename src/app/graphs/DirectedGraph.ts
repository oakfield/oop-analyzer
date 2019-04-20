import IDirectedEdge from "./IDirectedEdge";
import IGraph from "./IGraph";
import INode from "./INode";

/**
 * Basic object-oriented implementation of the IGraph interface.
 */
export default class DirectedGraph<TData> implements IGraph<TData> {
	/**
	 * Constructor.
	 * @param _nodes the nodes of the graph
	 */
	constructor(protected _nodes: Set<INode<TData>> = new Set()) { }

	get edges(): Set<IDirectedEdge<TData>> {
		let edges = new Set<IDirectedEdge<TData>>();

		for (let m of this._nodes) {
			for (let n of this._nodes) {
				if (m.neighbors.has(n)) {
					edges.add({
						nodes: [m, n],
						source: m,
						target: n
					});
				}
			}
		}

		return edges;
	}

	get nodes(): Set<INode<TData>> {
		return this._nodes;
	}
}
