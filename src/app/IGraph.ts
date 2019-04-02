/**
 * An edge is a pair of nodes.
 */
type IEdge<T> = [INode<T>, INode<T>];

/**
 * Model of a graph as used in computer science. A graph has nodes and edges.
 * 
 * This interface allows using multiple implementations of a graph.
 */
interface IGraph<T> {
	/**
	 * An array of connect components in the Graph.
	 * 
	 * A connected component is a subgraph in which each node has a path to each other node, and
	 * that can't be made any larger by adding other nodes.
	 * 
	 */
	readonly connectedComponents: IGraph<T>[];

	/**
	 * A set of edges in the Graph.
	 */
	readonly edges: Set<IEdge<T>>;

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
	readonly maximalCliques: IGraph<T>[];

	/**
	 * A set of nodes in the Graph.
	 */
	readonly nodes: Set<INode<T>>;
}
