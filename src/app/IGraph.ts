type IEdge<T> = [INode<T>, INode<T>];

interface IGraph<T> {
	readonly connectedComponents: IGraph<T>[];
	readonly edges: Set<IEdge<T>>;
	readonly nodes: Set<INode<T>>;
}
