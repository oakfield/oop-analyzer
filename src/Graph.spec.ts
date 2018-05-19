import Graph from "./Graph";
import { expect } from "chai";
import "mocha";

describe("get connectedComponents", () => {
	it("returns an empty array when the graph has no nodes", () => {
		let graph = new Graph();

		expect(graph.connectedComponents).to.be.empty;
	});

	it("returns one connected component when the graph has one node", () => {
		let node = { data: null, neighbors: new Set() };
		let nodes = new Set([node]);
		let graph = new Graph(nodes);

		expect(graph.connectedComponents.length).to.equal(1);
		expect(graph.connectedComponents[0].nodes.size).to.equal(1);
		expect(graph.connectedComponents[0].nodes).to.contain(node);
	});

	it("returns one connected component when the graph has two connected nodes", () => {
		let node1 = { data: null, neighbors: new Set() };
		let node2 = { data: null, neighbors: new Set() };
		node1.neighbors.add(node2);
		node2.neighbors.add(node1);

		let nodes = new Set([node1, node2]);
		let graph = new Graph(nodes);

		expect(graph.connectedComponents.length).to.equal(1);
		expect(graph.connectedComponents[0].nodes.size).to.equal(2);
		expect(graph.connectedComponents[0].nodes).to.contain(node1);
		expect(graph.connectedComponents[0].nodes).to.contain(node2);
	});

	it("returns two connected components when the graph has two unconnected nodes", () => {
		let node1 = { data: null, neighbors: new Set() };
		let node2 = { data: null, neighbors: new Set() };
		let nodes = new Set([node1, node2]);
		let graph = new Graph(nodes);

		expect(graph.connectedComponents.length).to.equal(2);
		expect(graph.connectedComponents[0].nodes.size).to.equal(1);
		expect(graph.connectedComponents[1].nodes.size).to.equal(1);
		expect(graph.connectedComponents[0].nodes.has(node1) ||
			graph.connectedComponents[1].nodes.has(node1)).to.be.true;
		expect(graph.connectedComponents[0].nodes.has(node2) ||
			graph.connectedComponents[1].nodes.has(node2)).to.be.true;
	});

	it("returns one connected component when the graph has three connected nodes", () => {
		let node1 = { data: null, neighbors: new Set() };
		let node2 = { data: null, neighbors: new Set() };
		let node3 = { data: null, neighbors: new Set() };
		node1.neighbors.add(node2);
		node1.neighbors.add(node3);
		node2.neighbors.add(node1);
		node2.neighbors.add(node3);
		node3.neighbors.add(node1);
		node3.neighbors.add(node2);

		let nodes = new Set([node1, node2, node3]);
		let graph = new Graph(nodes);

		expect(graph.connectedComponents.length).to.equal(1);
		expect(graph.connectedComponents[0].nodes.size).to.equal(3);
	});

	it("returns two connected components when the graph has three nodes, two connected", () => {
		let node1 = { data: null, neighbors: new Set() };
		let node2 = { data: null, neighbors: new Set() };
		let node3 = { data: null, neighbors: new Set() };
		node1.neighbors.add(node2);
		node2.neighbors.add(node1);

		let nodes = new Set([node1, node2, node3]);
		let graph = new Graph(nodes);

		expect(graph.connectedComponents.length).to.equal(2);
		expect(graph.connectedComponents[0].nodes.size).to.equal(2);
		expect(graph.connectedComponents[1].nodes.size).to.equal(1);
	});

	it("returns three connected components when the graph has three unconnected nodes", () => {
		let node1 = { data: null, neighbors: new Set() };
		let node2 = { data: null, neighbors: new Set() };
		let node3 = { data: null, neighbors: new Set() };
		let nodes = new Set([node1, node2, node3]);
		let graph = new Graph(nodes);

		expect(graph.connectedComponents.length).to.equal(3);
		expect(graph.connectedComponents[0].nodes.size).to.equal(1);
		expect(graph.connectedComponents[1].nodes.size).to.equal(1);
		expect(graph.connectedComponents[2].nodes.size).to.equal(1);
	});
});