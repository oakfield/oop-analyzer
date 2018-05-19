type IEdge<T> = [INode<T>, INode<T>];

interface IGraph<T> {
	readonly nodes: Set<INode<T>>;
	readonly edges: Set<IEdge<T>>;
	readonly connectedComponents: IGraph<T>[];

	addNode(node: INode<T>);
	removeNode(node: INode<T>);
	addEdge(edge: IEdge<T>);
	removeEdge(edge: IEdge<T>);
	getNeighborsOf(node: INode<T>): Set<INode<T>>;
}