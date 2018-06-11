import Node from "./Node";
import Graph from "./Graph";
export default class Lcom4Converter {
    constructor(jsonString) {
        this._jsonString = jsonString;
    }
    convert() {
        let parsedClass = JSON.parse(this._jsonString);
        let methods = new Set();
        for (let method of parsedClass.methods) {
            methods.add(new Node(method));
        }
        for (let m of methods) {
            for (let n of methods) {
                if (m.data.references.some(name => n.data.references.includes(name))
                    || m.data.references.includes(n.data.name)
                    || n.data.references.includes(m.data.name)) {
                    m.neighbors.add(n);
                    n.neighbors.add(m);
                }
            }
        }
        return new Graph(methods);
    }
}
