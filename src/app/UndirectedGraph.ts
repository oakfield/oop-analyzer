import Graph from "./Graph";
import Node from "./Node";

/**
 * Basic object-oriented implementation of an undirected graph.
 */
export default class UndirectedGraph<T> extends Graph<T> {
    
	/**
	 * Constructor.
	 * @param _nodes the nodes of the graph
     * @throws if the nodes don't form an undirected graph
	 */
	constructor(nodes: Set<Node<T>> = new Set()) {
        super(nodes);

        for (let edge of this.edges) {
            if (edge[0].neighbors.has(edge[1]) && !edge[1].neighbors.has(edge[0]) ||
                edge[1].neighbors.has(edge[0]) && !edge[0].neighbors.has(edge[1])) {
                throw new Error(`Tried to construct an undirected graph from a directed set of nodes: ${JSON.stringify(edge[0])}\n${JSON.stringify(edge[1])}`);
            }
        }
    }
}