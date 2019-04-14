import IGraph from "./IGraph";

export default interface IUndirectedGraph<TData> extends IGraph<TData> {
	/**
	 * An array of maximal cliques in the Graph. Each clique is itself a Graph.
	 * 
	 * Maximal cliques are more interesting than cliques (in general). A clique is a subgraph in
	 * which each node is directly connected to each other node. There are a lot of cliques in a
	 * graph: any single node counts as a clique, for example, as well as any connected pair of
	 * nodes. A maximal clique, by contrast, is a clique that cannot be made any larger by adding
	 * nodes.
	 * 
	 * Maximal cliques are determined using the Bron-Kerbosch algorithm.
	 * 
	 * NOTE: a clique is generally defined as a set of nodes. If you want a clique in this sense,
	 * you will want to write yourGraph.maximalCliques.nodes.
	 */
	readonly maximalCliques: IUndirectedGraph<TData>[];
}
