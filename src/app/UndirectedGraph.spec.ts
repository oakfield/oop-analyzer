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
});
