import "mocha";

import DirectedGraph from "./DirectedGraph";
import Node from "./Node";
import { expect } from "chai";

describe(DirectedGraph.name, () => {
	// TODO: constructor test
	// TODO: see if the edge functionality can be put somewhere else, and these tests removed
	describe("get edges", () => {
		it("returns an empty set when the graph has no nodes", () => {
			let graph = new DirectedGraph();

			expect(graph.edges).to.be.empty;
		});

		it("returns an empty set when the graph has one unconnected node", () => {
			let node = new Node(null);
			let graph = new DirectedGraph(new Set([node]));

			expect(graph.edges).to.be.empty;
		});

		it("returns a set of one edge when the graph has one self-connected node", () => {
			let node = new Node(null);
			node.neighbors.add(node);
			let graph = new DirectedGraph(new Set([node]));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of one edge when the graph has two connected nodes", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			node1.neighbors.add(node2);
			let graph = new DirectedGraph(new Set([node1, node2]));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of one edge when the graph has two connected nodes and one unconnected node", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			let node3 = new Node("three");
			node1.neighbors.add(node2);
			let graph = new DirectedGraph(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of two edges when the graph has three nodes connected in a path", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			let node3 = new Node("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			let graph = new DirectedGraph(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(2);
		});

		it("returns a set of three edges when the graph has three connected nodes", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			let node3 = new Node("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			node3.neighbors.add(node1);
			let graph = new DirectedGraph(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(3);
		});
	});
});
