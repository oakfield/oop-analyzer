import "mocha";

import Node from "./Node";
import UndirectedGraph from "./UndirectedGraph";
import { expect } from "chai";

describe(UndirectedGraph.name, () => {
	describe("constructor", () => {
		it("constructs a new graph given no nodes", () => {
			expect(() => new UndirectedGraph()).not.to.throw();
		});

		it("constructs a new graph given a single unconnected node", () => {
			let node1 = new Node(null);

			expect(() => new UndirectedGraph(new Set([node1])))
				.not.to.throw();
		});

		it("constructs a new graph given a single self-connected node", () => {
			let node1 = new Node(null);

			node1.neighbors.add(node1);

			expect(() => new UndirectedGraph(new Set([node1])))
				.not.to.throw();
		});

		it("constructs a new graph given two unconnected nodes", () => {
			let node1 = new Node(null);
			let node2 = new Node(null);

			expect(() => new UndirectedGraph(new Set([node1, node2])))
				.not.to.throw();
		});

		it("constructs a new graph given two connected nodes", () => {
			let node1 = new Node(null);
			let node2 = new Node(null);

			node1.neighbors.add(node2);
			node2.neighbors.add(node1);

			expect(() => new UndirectedGraph(new Set([node1, node2])))
				.not.to.throw();
		});

		it("constructs a new graph given many undirected nodes", () => {
			let node1 = new Node(null);
			let node2 = new Node(null);
			let node3 = new Node(null);
			let node4 = new Node(null);
			let node5 = new Node(null);

			node1.neighbors.add(node2);
			node2.neighbors.add(node1);

			node2.neighbors.add(node3);
			node3.neighbors.add(node2);

			node3.neighbors.add(node4);
			node4.neighbors.add(node3);

			node4.neighbors.add(node5);
			node5.neighbors.add(node4);

			node5.neighbors.add(node5);
			node5.neighbors.add(node5);

			node5.neighbors.add(node2);
			node2.neighbors.add(node5);

			expect(() => new UndirectedGraph(new Set([node1, node2, node3, node4, node5])))
				.not.to.throw();
		});

		it("throws an error when given two nodes only one of which is connected to the other", () => {
			let node1 = new Node(null);
			let node2 = new Node(null);

			node1.neighbors.add(node2);

			expect(() => new UndirectedGraph(new Set([node1, node2]))).to.throw();
		});

		it("throws an error when given many nodes that form an undirected graph", () => {
			let node1 = new Node(null);
			let node2 = new Node(null);
			let node3 = new Node(null);
			let node4 = new Node(null);
			let node5 = new Node(null);

			node1.neighbors.add(node2);
			node2.neighbors.add(node1);

			node2.neighbors.add(node3);

			node3.neighbors.add(node4);

			node4.neighbors.add(node5);

			node5.neighbors.add(node5);
			node5.neighbors.add(node5);

			node5.neighbors.add(node2);

			expect(() => new UndirectedGraph(new Set([node1, node2, node3, node4, node5])))
				.to.throw();
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
			let node = new Node(null);
			let graph = new UndirectedGraph(new Set([node]));
			let maximalCliques = graph.maximalCliques;

			expect(maximalCliques.length).to.equal(1);
			expect(maximalCliques[0].nodes.size).to.equal(1);
		});

		it("returns an array of two graphs when the graph has two unconnected nodes", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			let graph = new UndirectedGraph(new Set([node1, node2]));
			let maximalCliques = graph.maximalCliques;

			expect(maximalCliques.length).to.equal(2);
			expect(maximalCliques[0].nodes.size).to.equal(1);
			expect(maximalCliques[1].nodes.size).to.equal(1);
		});

		it("returns an array of one graph when the graph has two connected nodes", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			// TODO: distinguish between directed and undirected graphs
			let graph = new UndirectedGraph(new Set([node1, node2]));
			let maximalCliques = graph.maximalCliques;

			expect(maximalCliques.length).to.equal(1);
			expect(maximalCliques[0].nodes.size).to.equal(2);
		});
	});
});
