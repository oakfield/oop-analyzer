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
		let edges: IDirectedEdge<TData>[] = [];

		for (let parentSource of this._nodes) {
			for (let parentTarget of this._nodes) {
				for (let childSource of parentSource.depthFirstSearch()) {
					for (let childTarget of parentTarget.depthFirstSearch()) {
						if (childSource.neighbors.has(childTarget)
							&& !edges.find(edge =>
								edge.source === childSource && edge.target === childTarget)) {
							edges.push({
								nodes: [childSource, childTarget],
								source: childSource,
								target: childTarget
							});
						}
					}
				}
			}
		}

		return new Set(edges);
	}

	get nodes(): Set<INode<TData>> {
		return this._nodes;
	}
}
