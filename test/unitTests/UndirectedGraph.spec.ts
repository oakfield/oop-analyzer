import "mocha";

import { expect, use } from "chai";

import EquatableSet from "../../src/app/EquatableSet";
import EquatableSetHelper from "../helpers/EquatableSetHelper";
import Node from "../../src/app/graphs/Node";
import TestEquatable from "../helpers/TestEquatable";
import UndirectedGraph from "../../src/app/graphs/UndirectedGraph";

use(EquatableSetHelper);

describe(UndirectedGraph.name, () => {
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
		describe("constructor", () => {
			it("initializes instance variables", () => {
				let graph = new UndirectedGraph<TestEquatable>();
	
				expect(graph.nodes).to.exist;
				expect(graph.edges).to.exist;
			});
	
			it("initializes instances variables using arguments", () => {
				let graph = new UndirectedGraph<TestEquatable>(new EquatableSet(node1));
	
				expect(graph.nodes).to.be.an.instanceOf(EquatableSet).that.includes(node1);
			});
		});
	});

	describe("get edges", () => {
		it("returns an empty set when the graph has no nodes", () => {
			let graph = new UndirectedGraph();

			expect(graph.edges).to.be.empty;
		});

		it("returns an empty set when the graph has one unconnected node", () => {
			let graph = new UndirectedGraph<TestEquatable>(new EquatableSet(node1));

			expect(graph.edges).to.be.empty;
		});

		it("returns a set of one edge when the graph has one self-connected node", () => {
			node1.neighbors.add(node1);
			let graph = new UndirectedGraph<TestEquatable>(new EquatableSet(node1));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of one edge when the graph has two connected nodes (1)", () => {
			node1.neighbors.add(node2);
			let graph = new UndirectedGraph<TestEquatable>(new EquatableSet(node1));
			let actualEdges = graph.edges;
			let nodesOfActualEdges = actualEdges.pick().nodes;

			expect(actualEdges.size).to.equal(1);
			expect(nodesOfActualEdges).to.include(node1);
			expect(nodesOfActualEdges).to.include(node2);
		});

		it("returns a set of one edge when the graph has two connected nodes (2)", () => {
			node2.neighbors.add(node1);
			let graph = new UndirectedGraph<TestEquatable>(new EquatableSet(node2));
			let actualEdges = graph.edges;
			let nodesOfActualEdges = actualEdges.pick().nodes;

			expect(actualEdges.size).to.equal(1);
			expect(nodesOfActualEdges).to.include(node1);
			expect(nodesOfActualEdges).to.include(node2);
		});

		it("returns a set of one edge when the graph has two connected nodes (3)", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			let graph = new UndirectedGraph<TestEquatable>(new EquatableSet(node1));
			let actualEdges = graph.edges;
			let nodesOfActualEdges = actualEdges.pick().nodes;

			expect(actualEdges.size).to.equal(1);
			expect(nodesOfActualEdges).to.include(node1);
			expect(nodesOfActualEdges).to.include(node2);
		});

		it("returns a set of one edge when the graph has two connected nodes (4)", () => {
			node1.neighbors.add(node2);
			let graph = new UndirectedGraph<TestEquatable>(new EquatableSet(node1, node2));
			let actualEdges = graph.edges;
			let nodesOfActualEdges = actualEdges.values().next().value.nodes;

			expect(actualEdges.size).to.equal(1);
			expect(nodesOfActualEdges).to.include(node1);
			expect(nodesOfActualEdges).to.include(node2);
		});

		it("returns a set of one edge when the graph has two connected nodes and one unconnected node (1)", () => {
			node1.neighbors.add(node2);
			let graph = new UndirectedGraph<TestEquatable>(new EquatableSet(node1, node2, node3));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of one edge when the graph has two connected nodes and one unconnected node (2)", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			let graph = new UndirectedGraph<TestEquatable>(new EquatableSet(node1, node2, node3));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of one edge when the graph has two connected nodes and one unconnected node (3)", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			let graph = new UndirectedGraph<TestEquatable>(new EquatableSet(node1, node2));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of two edges when the graph has three nodes connected in a path (1)", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			let graph = new UndirectedGraph(new EquatableSet(node1, node2, node3));

			expect(graph.edges.size).to.equal(2);
		});

		it("returns a set of two edges when the graph has three nodes connected in a path (2)", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			node2.neighbors.add(node3);
			node3.neighbors.add(node2);
			let graph = new UndirectedGraph(new EquatableSet(node1, node2, node3));

			expect(graph.edges.size).to.equal(2);
		});

		it("returns a set of three edges when the graph has three connected nodes (1)", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			node3.neighbors.add(node1);
			let graph = new UndirectedGraph(new EquatableSet(node1, node2, node3));

			expect(graph.edges.size).to.equal(3);
		});

		it("returns a set of three edges when the graph has three connected nodes (2)", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			node2.neighbors.add(node3);
			node3.neighbors.add(node2);
			node3.neighbors.add(node1);
			node1.neighbors.add(node3);
			let graph = new UndirectedGraph(new EquatableSet(node1));

			expect(graph.edges.size).to.equal(3);
		});
	});

	describe("get maximalCliques", () => {
		it("returns an array of one empty graph when the graph has no nodes", () => {
			let graph = new UndirectedGraph();
			let maximalCliques = graph.maximalCliques;

			expect(maximalCliques.length).to.equal(1);
			expect(maximalCliques[0].nodes).to.be.empty;
		});

		it("returns an array of one graph with one node when the graph has one node", () => {
			let graph = new UndirectedGraph(new EquatableSet(node1));
			let maximalCliques = graph.maximalCliques;

			expect(maximalCliques.length).to.equal(1);
			expect(maximalCliques[0].nodes.size).to.equal(1);
		});

		it("returns an array of two graphs when the graph has two unconnected nodes", () => {
			let graph = new UndirectedGraph(new EquatableSet(node1, node2));
			let maximalCliques = graph.maximalCliques;

			expect(maximalCliques.length).to.equal(2);
			expect(maximalCliques[0].nodes.size).to.equal(1);
			expect(maximalCliques[1].nodes.size).to.equal(1);
		});

		it("returns an array of one graph when the graph has two connected nodes", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			let graph = new UndirectedGraph(new EquatableSet(node1, node2));
			let maximalCliques = graph.maximalCliques;

			expect(maximalCliques.length).to.equal(1);
			expect(maximalCliques[0].nodes.size).to.equal(2);
		});
	});

	describe("get nodes", () => {
		it("returns an empty set when the graph has no nodes", () => {
			let graph = new UndirectedGraph();

			expect(graph.nodes).to.be.empty;
		});

		it("returns one node when the graph has one node", () => {
			let graph = new UndirectedGraph(new EquatableSet(node1));

			expect(graph.nodes.size).to.equal(1);
			expect(graph.nodes).hasElement(node1);
		});

		it("returns two nodes when the graph has two nodes (1)", () => {
			let graph = new UndirectedGraph(new EquatableSet(node1, node2));

			expect(graph.nodes.size).to.equal(2);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);
		});

		it("returns two nodes when the graph has two nodes (2)", () => {
			node1.neighbors.add(node2);
			let graph = new UndirectedGraph(new EquatableSet(node1));

			expect(graph.nodes.size).to.equal(2);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);
		});

		it("returns two nodes when the graph has two nodes (3)", () => {
			node2.neighbors.add(node1);
			let graph = new UndirectedGraph(new EquatableSet(node1));

			expect(graph.nodes.size).to.equal(2);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);
		});

		it("returns three nodes when the graph has three nodes (1)", () => {
			let graph = new UndirectedGraph(new EquatableSet(node1, node2, node3));

			expect(graph.nodes.size).to.equal(3);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);
			expect(graph.nodes).to.include(node3);
		});

		it("returns three nodes when the graph has three nodes (2)", () => {
			node1.neighbors.add(node2);
			let graph = new UndirectedGraph(new EquatableSet(node1, node2));

			expect(graph.nodes.size).to.equal(3);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);
			expect(graph.nodes).to.include(node3);
		});

		it("returns three nodes when the graph has three nodes (3)", () => {
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			let graph = new UndirectedGraph(new EquatableSet(node1));

			expect(graph.nodes.size).to.equal(3);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);
			expect(graph.nodes).to.include(node3);
		});
	});
});
