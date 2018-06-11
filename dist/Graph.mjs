export default class Graph {
    constructor(nodes = new Set()) {
        this._nodes = nodes;
    }
    // todo: add addNode and removeNode?
    get nodes() {
        for (let node of this._nodes)
            for (let neighbor of node.neighbors)
                this._nodes.add(neighbor);
        return this._nodes;
    }
    get connectedComponents() {
        let connectedComponents = [];
        let discoveredNodes = new Set();
        for (let node of this.nodes) {
            if (!discoveredNodes.has(node)) {
                let connectedComponent = new Graph();
                for (let searchedNode of node.partialDepthFirstSearch()) {
                    discoveredNodes.add(searchedNode);
                    connectedComponent.nodes.add(searchedNode);
                }
                connectedComponents.push(connectedComponent);
            }
        }
        return connectedComponents;
    }
}
