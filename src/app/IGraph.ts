type IEdge<T> = [INode<T>, INode<T>];

interface IGraph<T> {
	readonly nodes: Set<INode<T>>;
	readonly connectedComponents: IGraph<T>[];
}