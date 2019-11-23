import "mocha";

import DirectedGraph from "../../src/app/graphs/DirectedGraph";
import Equatable from "../../src/app/Equatable";
import EquatableSet from "../../src/app/EquatableSet";
import Node from "../../src/app/graphs/Node";
import TestEquatable from "../helpers/TestEquatable";
import { expect } from "chai";

describe(DirectedGraph.name, () => {
	let node1: Node<TestEquatable>;
	let node2: Node<TestEquatable>;
	let node3: Node<TestEquatable>;
	let testEquatable1: TestEquatable;
	let testEquatable2: TestEquatable;
	let testEquatable3: TestEquatable;

	beforeEach(() => {
		testEquatable1 = new TestEquatable("test1");
		testEquatable2 = new TestEquatable("test2");
		testEquatable3 = new TestEquatable("test3");
		node1 = new Node(testEquatable1);
		node2 = new Node(testEquatable2);
		node3 = new Node(testEquatable3);
	});

	describe("constructor", () => {
		it("returns an initialized object", () => {
			let graph = new DirectedGraph();

			expect(graph.edges).to.exist;
			expect(graph.nodes).to.exist;
		})
	});

	describe("get edges", () => {
		it("returns an empty set when the graph has no nodes", () => {
			let graph = new DirectedGraph();

			expect(graph.edges).to.be.empty;
		});

		it("returns an empty set when the graph has one unconnected node", () => {
			let graph = new DirectedGraph(new EquatableSet(node1));

			expect(graph.edges).to.be.empty;
		});

		it("returns a singleton when the graph has one self-connected node", () => {
			node1.neighbors.add(node1);
			let graph = new DirectedGraph(new EquatableSet(node1));
			let edge = graph.edges.pick();

			expect(graph.edges.size).to.equal(1);
			expect(edge.source.data).to.equal(testEquatable1);
			expect(edge.target.data).to.equal(testEquatable1);
		});

		it("returns a singleton when the graph has an arrow from one node to another", () => {
			node1.neighbors.add(node2);
			let graph = new DirectedGraph(new EquatableSet(node1, node2));
			let edge = graph.edges.pick();

			expect(graph.edges.size).to.equal(1);
			expect(edge.source.data).to.equal(testEquatable1);
			expect(edge.target.data).to.equal(testEquatable2);

			node1 = new Node(testEquatable1);
			node2 = new Node(testEquatable2);
			node2.neighbors.add(node1);
			graph = new DirectedGraph(new EquatableSet(node1, node2));
			edge = graph.edges.pick();

			expect(graph.edges.size).to.equal(1);
			expect(edge.source.data).to.equal(testEquatable2);
			expect(edge.target.data).to.equal(testEquatable1);
		});

		it("returns a singleton when the graph has two connected nodes and one unconnected node", () => {
			node1.neighbors.add(node2);
			let graph = new DirectedGraph(new EquatableSet(node1, node2, node3));
			let edge = graph.edges.pick();

			expect(graph.edges.size).to.equal(1);
			expect(edge.source.data).to.equal(testEquatable1);
			expect(edge.target.data).to.equal(testEquatable2);

			graph = new DirectedGraph(new EquatableSet(node1, node3));

			expect(graph.edges.size).to.equal(1);
			expect(edge.source.data).to.equal(testEquatable1);
			expect(edge.target.data).to.equal(testEquatable2);
		});

		it("returns a set of two edges when the graph has three nodes connected in a path", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			let graph = new DirectedGraph(new EquatableSet(node1, node2, node3));
			let edgeIterator = graph.edges.values();
			let edge1 = edgeIterator.next().value;
			let edge2 = edgeIterator.next().value;

			expect(graph.edges.size).to.equal(2);
			expect(edge1.source.data).to.equal(testEquatable1);
			expect(edge1.target.data).to.equal(testEquatable2);
			expect(edge2.source.data).to.equal(testEquatable2);
			expect(edge2.target.data).to.equal(testEquatable3);
		});

		it("returns a set of three edges when the graph has three connected nodes", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			node3.neighbors.add(node1);
			let graph = new DirectedGraph(new EquatableSet(node1, node2, node3));
			let edgeIterator = graph.edges.values();
			let edge1 = edgeIterator.next().value;
			let edge2 = edgeIterator.next().value;
			let edge3 = edgeIterator.next().value;

			expect(graph.edges.size).to.equal(3);
			expect(edge1.source.data).to.equal(testEquatable1);
			expect(edge1.target.data).to.equal(testEquatable2);
			expect(edge2.source.data).to.equal(testEquatable2);
			expect(edge2.target.data).to.equal(testEquatable3);
			expect(edge3.source.data).to.equal(testEquatable3);
			expect(edge3.target.data).to.equal(testEquatable1);
		});
	});
});
