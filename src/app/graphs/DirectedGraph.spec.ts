import "mocha";

import DirectedGraph from "./DirectedGraph";
import Node from "./Node";
import { expect } from "chai";

describe(DirectedGraph.name, () => {
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
			let node = new Node(null);
			let graph = new DirectedGraph(new Set([node]));

			expect(graph.edges).to.be.empty;
		});

		it("returns a singleton when the graph has one self-connected node", () => {
			const data = "test";
			let node = new Node(data);
			node.neighbors.add(node);
			let graph = new DirectedGraph(new Set([node]));
			let edge = graph.edges.values().next().value;

			expect(graph.edges.size).to.equal(1);
			expect(edge.source.data).to.equal(data);
			expect(edge.target.data).to.equal(data);
		});

		it("returns a singleton when the graph has an arrow from one node to another", () => {
			const data1 = "test1";
			const data2 = "test2";
			let node1 = new Node(data1);
			let node2 = new Node(data2);
			node1.neighbors.add(node2);
			let graph = new DirectedGraph(new Set([node1, node2]));
			let edge = graph.edges.values().next().value;

			expect(graph.edges.size).to.equal(1);
			expect(edge.source.data).to.equal(data1);
			expect(edge.target.data).to.equal(data2);

			node1 = new Node(data1);
			node2 = new Node(data2);
			node2.neighbors.add(node1);
			graph = new DirectedGraph(new Set([node1, node2]));
			edge = graph.edges.values().next().value;

			expect(graph.edges.size).to.equal(1);
			expect(edge.source.data).to.equal(data2);
			expect(edge.target.data).to.equal(data1);
		});

		it("returns a singleton when the graph has two connected nodes and one unconnected node", () => {
			const data1 = "test1";
			const data2 = "test2";
			const data3 = "test3";
			let node1 = new Node(data1);
			let node2 = new Node(data2);
			let node3 = new Node(data3);
			node1.neighbors.add(node2);
			let graph = new DirectedGraph(new Set([node1, node2, node3]));
			let edge = graph.edges.values().next().value;

			expect(graph.edges.size).to.equal(1);
			expect(edge.source.data).to.equal(data1);
			expect(edge.target.data).to.equal(data2);

			graph = new DirectedGraph(new Set([node1, node3]));

			expect(graph.edges.size).to.equal(1);
			expect(edge.source.data).to.equal(data1);
			expect(edge.target.data).to.equal(data2);
		});

		it("returns a set of two edges when the graph has three nodes connected in a path", () => {
			const data1 = "test1";
			const data2 = "test2";
			const data3 = "test3";
			let node1 = new Node(data1);
			let node2 = new Node(data2);
			let node3 = new Node(data3);
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			let graph = new DirectedGraph(new Set([node1, node2, node3]));
			let edgeIterator = graph.edges.values();
			let edge1 = edgeIterator.next().value;
			let edge2 = edgeIterator.next().value;

			expect(graph.edges.size).to.equal(2);
			expect(edge1.source.data).to.equal(data1);
			expect(edge1.target.data).to.equal(data2);
			expect(edge2.source.data).to.equal(data2);
			expect(edge2.target.data).to.equal(data3);
		});

		it("returns a set of three edges when the graph has three connected nodes", () => {
			const data1 = "test1";
			const data2 = "test2";
			const data3 = "test3";
			let node1 = new Node(data1);
			let node2 = new Node(data2);
			let node3 = new Node(data3);
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			node3.neighbors.add(node1);
			let graph = new DirectedGraph(new Set([node1, node2, node3]));
			let edgeIterator = graph.edges.values();
			let edge1 = edgeIterator.next().value;
			let edge2 = edgeIterator.next().value;
			let edge3 = edgeIterator.next().value;

			expect(graph.edges.size).to.equal(3);
			expect(edge1.source.data).to.equal(data1);
			expect(edge1.target.data).to.equal(data2);
			expect(edge2.source.data).to.equal(data2);
			expect(edge2.target.data).to.equal(data3);
			expect(edge3.source.data).to.equal(data3);
			expect(edge3.target.data).to.equal(data1);
		});
	});
});
