export default class Node {
	constructor(data = null) {
		this.data = data;
		this.neighbors = new Set();
	}

	*partialDepthFirstSearch() {
		let discoveredNodes = new Set();
		let stack = [];
		stack.push(this);

		while (stack.length) {
			let nextNode = stack.pop();

			if (!discoveredNodes.has(nextNode)) {
				discoveredNodes.add(nextNode);

				yield nextNode;

				for (let neighbor of nextNode.neighbors) {
					stack.push(neighbor);
				}
			}
		}
	}
}