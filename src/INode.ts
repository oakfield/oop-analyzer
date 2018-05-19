interface INode<T> {
	data: T;
	neighbors: Set<INode<T>>;
}