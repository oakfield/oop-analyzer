import "mocha";

import Graph from "./Graph";
import Node from "./Node";
import { expect } from "chai";

describe("Graph", () => {
	describe("get components", () => {
		it("returns an empty array when the graph has no nodes", () => {
			let graph = new Graph();
	
			expect(graph.components).to.be.empty;
		});
	
		it("returns one component when the graph has one node", () => {
			let node = new Node();
			let graph = new Graph(new Set([node]));
	
			expect(graph.components.length).to.equal(1);
			expect(graph.components[0].nodes.size).to.equal(1);
			expect(graph.components[0].nodes).to.contain(node);
		});
	
		it("returns one component when the graph has two connected nodes", () => {
			let node1 = new Node();
			let node2 = new Node();
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
	
			let graph = new Graph(new Set([node1, node2]));
	
			expect(graph.components.length).to.equal(1);
			expect(graph.components[0].nodes.size).to.equal(2);
			expect(graph.components[0].nodes).to.contain(node1);
			expect(graph.components[0].nodes).to.contain(node2);
		});
	
		it("returns two components when the graph has two unconnected nodes", () => {
			let node1 = new Node();
			let node2 = new Node();
			let graph = new Graph(new Set([node1, node2]));
	
			expect(graph.components.length).to.equal(2);
			expect(graph.components[0].nodes.size).to.equal(1);
			expect(graph.components[1].nodes.size).to.equal(1);
			expect(graph.components[0].nodes.has(node1) ||
				graph.components[1].nodes.has(node1)).to.be.true;
			expect(graph.components[0].nodes.has(node2) ||
				graph.components[1].nodes.has(node2)).to.be.true;
		});
	
		it("returns one component when the graph has three connected nodes", () => {
			let node1 = new Node();
			let node2 = new Node();
			let node3 = new Node();
			node1.neighbors.add(node2);
			node1.neighbors.add(node3);
			node2.neighbors.add(node1);
			node2.neighbors.add(node3);
			node3.neighbors.add(node1);
			node3.neighbors.add(node2);
	
			let graph = new Graph(new Set([node1, node2, node3]));
	
			expect(graph.components.length).to.equal(1);
			expect(graph.components[0].nodes.size).to.equal(3);
		});
	
		it("returns two components when the graph has three nodes, two connected", () => {
			let node1 = new Node();
			let node2 = new Node();
			let node3 = new Node();
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
	
			let graph = new Graph(new Set([node1, node2, node3]));
	
			expect(graph.components.length).to.equal(2);
			expect(graph.components[0].nodes.size).to.equal(2);
			expect(graph.components[1].nodes.size).to.equal(1);
		});
	
		it("returns three connected components when the graph has three unconnected nodes", () => {
			let node1 = new Node();
			let node2 = new Node();
			let node3 = new Node();
			let graph = new Graph(new Set([node1, node2, node3]));
	
			expect(graph.components.length).to.equal(3);
			expect(graph.components[0].nodes.size).to.equal(1);
			expect(graph.components[1].nodes.size).to.equal(1);
			expect(graph.components[2].nodes.size).to.equal(1);
		});
	});

	describe("get edges", () => {
		it("returns an empty set when the graph has no nodes", () => {
			let graph = new Graph();
	
			expect(graph.edges).to.be.empty;
		});

		it("returns an empty set when the graph has one unconnected node", () => {
			let node = new Node();
			let graph = new Graph(new Set([node]));
	
			expect(graph.edges).to.be.empty;
		});

		it("returns a set of one edge when the graph has one self-connected node", () => {
			let node = new Node();
			node.neighbors.add(node);
			let graph = new Graph(new Set([node]));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of one edge when the graph has two connected nodes", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			node1.neighbors.add(node2);
			let graph = new Graph(new Set([node1, node2]));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of one edge when the graph has two connected nodes and one unconnected node", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			let node3 = new Node("three");
			node1.neighbors.add(node2);
			let graph = new Graph(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of two edges when the graph has three nodes connected in a path", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			let node3 = new Node("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			let graph = new Graph(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(2);
		});

		it("returns a set of three edges when the graph has three connected nodes", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			let node3 = new Node("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			node3.neighbors.add(node1);
			let graph = new Graph(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(3);
		});
	});

	describe("get maximalCliques", () => {
		it("returns an array of one empty graph when the graph has no nodes", () => {
			let graph = new Graph();
			let maximalCliques = graph.maximalCliques;

			expect(maximalCliques.length).to.equal(1);
			expect(maximalCliques[0].nodes).to.be.empty;
		});

		it("returns an array of one graph with one node when the graph has one node", () => {
			let node = new Node();
			let graph = new Graph(new Set([node]));
			let maximalCliques = graph.maximalCliques;

			expect(maximalCliques.length).to.equal(1);
			expect(maximalCliques[0].nodes.size).to.equal(1);
		});

		it("returns an array of two graphs when the graph has two unconnected nodes", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			let graph = new Graph(new Set([node1, node2]));
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
			let graph = new Graph(new Set([node1, node2]));
			let maximalCliques = graph.maximalCliques;

			expect(maximalCliques.length).to.equal(1);
			expect(maximalCliques[0].nodes.size).to.equal(2);
		});
	});
});
