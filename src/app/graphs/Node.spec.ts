import "mocha";

import Node from "./Node";
import { expect } from "chai";

describe(Node.name, () => {
	describe("constructor", () => {
		it("initializes instance variables", () => {
			const data = "test";
			let node = new Node(data);

			expect(node.data).to.equal(data);
			expect(node.neighbors).to.exist;
		});
	});

	describe("*depthFirstSearch", () => {
		it("searches through one node when the node has no neighbors", () => {
			let node = new Node(null);

			let searchedNodes: Node<null>[] = [];
			for (let searchedNode of node.depthFirstSearch()) {
				searchedNodes.push(searchedNode);
			}

			expect(searchedNodes.length).to.equal(1);
			expect(searchedNodes).to.include(node);
		});

		it("searches through all neighbors given multiple neighbors", () => {
			let node1 = new Node(null);
			let node2 = new Node(null);
			let node3 = new Node(null);
			let node4 = new Node(null);
			let node5 = new Node(null);

			node1.neighbors.add(node2);
			node1.neighbors.add(node3);
			node1.neighbors.add(node4);
			node1.neighbors.add(node5);

			let searchedNodes: Node<null>[] = [];
			for (let searchedNode of node1.depthFirstSearch()) {
				searchedNodes.push(searchedNode);
			}

			expect(searchedNodes.length).to.equal(5);
			expect(searchedNodes).to.include(node1);
			expect(searchedNodes).to.include(node2);
			expect(searchedNodes).to.include(node3);
			expect(searchedNodes).to.include(node4);
			expect(searchedNodes).to.include(node5);
		});

		it("searches recursively", () => {
			let node1 = new Node(null);
			let node2 = new Node(null);
			let node3 = new Node(null);
			let node4 = new Node(null);
			let node5 = new Node(null);

			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			node3.neighbors.add(node4);
			node4.neighbors.add(node5);

			let searchedNodes: Node<null>[] = [];
			for (let searchedNode of node1.depthFirstSearch()) {
				searchedNodes.push(searchedNode);
			}

			expect(searchedNodes.length).to.equal(5);
			expect(searchedNodes).to.include(node1);
			expect(searchedNodes).to.include(node2);
			expect(searchedNodes).to.include(node3);
			expect(searchedNodes).to.include(node4);
			expect(searchedNodes).to.include(node5);
		});
	});
});
