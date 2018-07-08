// import * as Acorn from 'acorn';
// import * as Walk from 'acorn/dist/walk';

export default class MethodModel {
    private _name: string;
    private _references: string[];
    private _source: string;

    constructor(name: string, source: string) {
        this._name = name;
        this._references = [];
        this._source = source;

        // console.log(source);
        // this._parseAst(Acorn.parse(source));
    }

    get name(): string {
        return this._name;
    }

    get references(): string[] {
        return this._references;
    }

    toString(): string {
        return this._source;
    }

    // private _parseAst(ast) {
    //     Walk.recursive(ast,
	// 		{ },
	// 		{
	// 			MethodDefinition: (node, state, continueFn) => {
	// 				if (node.kind === 'constructor') {
    //                     this._name = "constructor";
	// 				} else if (node.kind === 'method') {
	// 					this._name = node.key.name;
    //                 }
                    
	// 				continueFn(node.value, state);
	// 			},
	// 			MemberExpression: (node, state, continueFn) => {
	// 				if (this._name === "constructor") {
	// 					// Walk.recursive will hit this even when the type is not MethodDefinition.
	// 					// Maybe's it's some super-type issue?
	// 					if (node.type === 'MemberExpression' && node.object.type === "ThisExpression") {
	// 						this._variables.push(node.property.name);
	// 					}
	// 				} else {
	// 					if (node.type === 'MemberExpression' && node.object.type === "ThisExpression") {
	// 						this._references.push(node.property.name);
	// 					}
	// 				}
	// 			}
	// 		});
    // }
}