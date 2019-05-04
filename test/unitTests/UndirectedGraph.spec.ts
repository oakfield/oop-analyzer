import "mocha";

import Node from "../../src/app/graphs/Node";
import UndirectedGraph from "../../src/app/graphs/UndirectedGraph";
import { expect } from "chai";

describe(UndirectedGraph.name, () => {
	describe("constructor", () => {
		describe("constructor", () => {
			it("initializes instance variables", () => {
				let graph = new UndirectedGraph<string>();
	
				expect(graph.nodes).to.exist;
				expect(graph.edges).to.exist;
			});
	
			it("initializes instances variables using arguments", () => {
				let node = new Node<string>("");
				let graph = new UndirectedGraph<string>(new Set([node]));
	
				expect(graph.nodes).to.be.an.instanceOf(Set).that.includes(node);
			});
		});
	});

	describe("get edges", () => {
		it("returns an empty set when the graph has no nodes", () => {
			let graph = new UndirectedGraph();

			expect(graph.edges).to.be.empty;
		});

		it("returns an empty set when the graph has one unconnected node", () => {
			let node = new Node<string>("");
			let graph = new UndirectedGraph<string>(new Set([node]));

			expect(graph.edges).to.be.empty;
		});

		it("returns a set of one edge when the graph has one self-connected node", () => {
			let node = new Node<string>("");
			node.neighbors.add(node);
			let graph = new UndirectedGraph<string>(new Set([node]));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of one edge when the graph has two connected nodes", () => {
			let node1 = new Node<string>("one");
			let node2 = new Node<string>("two");
			node1.neighbors.add(node2);
			let graph = new UndirectedGraph<string>(new Set([node1]));
			let actualEdges = graph.edges;
			let nodesOfActualEdges = actualEdges.values().next().value.nodes;

			expect(actualEdges.size).to.equal(1);
			expect(nodesOfActualEdges).to.include(node1);
			expect(nodesOfActualEdges).to.include(node2);

			node1 = new Node<string>("one");
			node2 = new Node<string>("two");
			node2.neighbors.add(node1);
			graph = new UndirectedGraph<string>(new Set([node2]));
			actualEdges = graph.edges;
			nodesOfActualEdges = actualEdges.values().next().value.nodes;

			expect(actualEdges.size).to.equal(1);
			expect(nodesOfActualEdges).to.include(node1);
			expect(nodesOfActualEdges).to.include(node2);

			node1 = new Node<string>("one");
			node2 = new Node<string>("two");
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			graph = new UndirectedGraph<string>(new Set([node1]));
			actualEdges = graph.edges;
			nodesOfActualEdges = actualEdges.values().next().value.nodes;

			expect(actualEdges.size).to.equal(1);
			expect(nodesOfActualEdges).to.include(node1);
			expect(nodesOfActualEdges).to.include(node2);

			node1 = new Node<string>("one");
			node2 = new Node<string>("two");
			node1.neighbors.add(node2);
			graph = new UndirectedGraph<string>(new Set([node1, node2]));
			actualEdges = graph.edges;
			nodesOfActualEdges = actualEdges.values().next().value.nodes;

			expect(actualEdges.size).to.equal(1);
			expect(nodesOfActualEdges).to.include(node1);
			expect(nodesOfActualEdges).to.include(node2);
		});

		it("returns a set of one edge when the graph has two connected nodes and one unconnected node", () => {
			let node1 = new Node<string>("one");
			let node2 = new Node<string>("two");
			let node3 = new Node<string>("three");
			node1.neighbors.add(node2);
			let graph = new UndirectedGraph<string>(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(1);

			node1 = new Node<string>("one");
			node2 = new Node<string>("two");
			node3 = new Node<string>("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			graph = new UndirectedGraph<string>(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(1);

			node1 = new Node<string>("one");
			node2 = new Node<string>("two");
			node3 = new Node<string>("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			graph = new UndirectedGraph<string>(new Set([node1, node3]));

			expect(graph.edges.size).to.equal(1);
		});

		it("returns a set of two edges when the graph has three nodes connected in a path", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			let node3 = new Node("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			let graph = new UndirectedGraph(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(2);

			node1 = new Node("one");
			node2 = new Node("two");
			node3 = new Node("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			node2.neighbors.add(node3);
			node3.neighbors.add(node2);
			graph = new UndirectedGraph(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(2);
		});

		it("returns a set of three edges when the graph has three connected nodes", () => {
			let node1 = new Node("one");
			let node2 = new Node("two");
			let node3 = new Node("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			node3.neighbors.add(node1);
			let graph = new UndirectedGraph(new Set([node1, node2, node3]));

			expect(graph.edges.size).to.equal(3);

			node1 = new Node("one");
			node2 = new Node("two");
			node3 = new Node("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node1);
			node2.neighbors.add(node3);
			node3.neighbors.add(node2);
			node3.neighbors.add(node1);
			node1.neighbors.add(node3);
			graph = new UndirectedGraph(new Set([node1]));

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
			let graph = new UndirectedGraph(new Set([node1, node2]));
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
			let node = new Node<string>("node1");
			let graph = new UndirectedGraph<string>(new Set([node]));

			expect(graph.nodes.size).to.equal(1);
			expect(graph.nodes).to.include(node);
		});

		it("returns two nodes when the graph has two nodes", () => {
			let node1 = new Node<string>("one");
			let node2 = new Node<string>("two");
			let graph = new UndirectedGraph<string>(new Set([node1, node2]));

			expect(graph.nodes.size).to.equal(2);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);

			node1 = new Node<string>("one");
			node2 = new Node<string>("two");
			node1.neighbors.add(node2);
			graph = new UndirectedGraph<string>(new Set([node1]));

			expect(graph.nodes.size).to.equal(2);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);

			node1 = new Node<string>("one");
			node2 = new Node<string>("two");
			node2.neighbors.add(node1);
			graph = new UndirectedGraph<string>(new Set([node2]));

			expect(graph.nodes.size).to.equal(2);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);
		});

		it("returns three nodes when the graph has three nodes", () => {
			let node1 = new Node<string>("one");
			let node2 = new Node<string>("two");
			let node3 = new Node<string>("three");
			let graph = new UndirectedGraph<string>(new Set([node1, node2, node3]));

			expect(graph.nodes.size).to.equal(3);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);
			expect(graph.nodes).to.include(node3);

			node1 = new Node<string>("one");
			node2 = new Node<string>("two");
			node3 = new Node<string>("three");
			node1.neighbors.add(node2);
			graph = new UndirectedGraph<string>(new Set([node1, node3]));

			expect(graph.nodes.size).to.equal(3);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);
			expect(graph.nodes).to.include(node3);

			node1 = new Node<string>("one");
			node2 = new Node<string>("two");
			node3 = new Node<string>("three");
			node1.neighbors.add(node2);
			node2.neighbors.add(node3);
			graph = new UndirectedGraph<string>(new Set([node1]));

			expect(graph.nodes.size).to.equal(3);
			expect(graph.nodes).to.include(node1);
			expect(graph.nodes).to.include(node2);
			expect(graph.nodes).to.include(node3);
		});
	});
});
