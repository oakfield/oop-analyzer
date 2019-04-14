import "mocha";

import Node from "./Node";
import { expect } from "chai";

describe(Node.name, () => {
	describe("constructor", () => {
		it("initializes instance variables", () => {
			const data = "test";
			let node = new Node<string>(data);

			expect(node.data).to.equal(data);
			expect(node.neighbors).not.to.be.undefined;
		});
	});

	describe("*partialDepthFirstSearch", () => {
		it("searches through one node when the node has no neighbors", () => {
			let node = new Node<string>("test");

			let searchedNodes: Node<string>[] = [];
			for (let searchedNode of node.partialDepthFirstSearch()) {
				searchedNodes.push(searchedNode);
			}

			expect(searchedNodes.length).to.equal(1);
			expect(searchedNodes).to.include(node);
		});

		it("searches through all neighbors given multiple neighbors", () => {
			let node1 = new Node<string>("test1");
			let node2 = new Node<string>("test2");
			let node3 = new Node<string>("test3");
			let node4 = new Node<string>("test4");
			let node5 = new Node<string>("test5");

			node1.neighbors.add(node2);
			node1.neighbors.add(node3);
			node1.neighbors.add(node4);
			node1.neighbors.add(node5);

			let searchedNodes: Node<string>[] = [];
			for (let searchedNode of node1.partialDepthFirstSearch()) {
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
			let node1 = new Node<string>("test1");
			let node2 = new Node<string>("test2");
			let node3 = new Node<string>("test3");
			let node4 = new Node<string>("test4");
			let node5 = new Node<string>("test5");

			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			node3.neighbors.add(node4);
			node4.neighbors.add(node5);

			let searchedNodes: Node<string>[] = [];
			for (let searchedNode of node1.partialDepthFirstSearch()) {
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
