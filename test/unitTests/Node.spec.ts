import "mocha";

import Node from "../../src/app/graphs/Node";
import TestEquatable from "../helpers/TestEquatable";
import { expect } from "chai";

describe(Node.name, () => {
	let node1: Node<TestEquatable>;
	let node2: Node<TestEquatable>;
	let node3: Node<TestEquatable>;
	let node4: Node<TestEquatable>;
	let node5: Node<TestEquatable>;
	let testEquatable1: TestEquatable;
	let testEquatable2: TestEquatable;
	let testEquatable3: TestEquatable;
	let testEquatable4: TestEquatable;
	let testEquatable5: TestEquatable;

	beforeEach(() => {
		testEquatable1 = new TestEquatable("test1");
		testEquatable2 = new TestEquatable("test2");
		testEquatable3 = new TestEquatable("test3");
		testEquatable4 = new TestEquatable("test4");
		testEquatable5 = new TestEquatable("test5");
		node1 = new Node(testEquatable1);
		node2 = new Node(testEquatable2);
		node3 = new Node(testEquatable3);
		node4 = new Node(testEquatable4);
		node5 = new Node(testEquatable5);
	});
	
	describe("constructor", () => {
		it("initializes instance variables", () => {
			expect(node1.data).to.equal(testEquatable1);
			expect(node1.neighbors).to.exist;
		});
	});

	describe("*depthFirstSearch", () => {
		it("searches through one node when the node has no neighbors", () => {
			let searchedNodes: Node<TestEquatable>[] = [];
			for (let searchedNode of node1.depthFirstSearch()) {
				searchedNodes.push(searchedNode);
			}

			expect(searchedNodes.length).to.equal(1);
			expect(searchedNodes).to.include(node1);
		});

		it("searches through all neighbors given multiple neighbors", () => {
			node1.neighbors.add(node2);
			node1.neighbors.add(node3);
			node1.neighbors.add(node4);
			node1.neighbors.add(node5);

			let searchedNodes: Node<TestEquatable>[] = [];
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
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			node3.neighbors.add(node4);
			node4.neighbors.add(node5);

			let searchedNodes: Node<TestEquatable>[] = [];
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
