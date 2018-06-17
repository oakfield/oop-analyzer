import * as Acorn from 'acorn';
import * as Walk from 'acorn/dist/walk';

export default class Parser {
	constructor() { }

	parse(file): ClassModel[] {
		let ast = Acorn.parse(file);

		// console.log(JSON.stringify(ast));

		let classModels: ClassModel[] = [];

		// for (let i of ast.body) {
		// 	if (i.type === "ClassDeclaration") {
		// 		let classModel: ClassModel = { variables: [], methods: [] };

		// 		for (let j of i.body.body) {
		// 			if (j.type === "MethodDefinition" && j.kind === "method") {
		// 				classModel.methods.push({ name: j.key.name, references: [] });
		// 			}
		// 		}

		// 		classModels.push(classModel);
		// 	}
		// }

		// for (let fileToken of parsed.body) {
		// 	if (fileToken.type === "ClassDeclaration") {
		// 		let classModel: ClassModel = { variables: [], methods: [] };

		// 		let parsedClass = Acorn.parse(file.substring[fileToken.start, fileToken.end]);
		// 		for (let classToken of parsedClass.body) {
		// 			if (classToken.type === "MethodDefinition" && classToken.kind === "method") {
		// 				classModel.methods.push({
		// 					name: classToken.key.name,
		// 					references: []
		// 				});

		// 				let parsedMethod = Acorn.parse(file.substring[classToken.start, classToken.end]);
		// 				for (let methodToken of parsedMethod) {
		// 					if (methodToken.type === "VariableDefinition") {

		// 					}
		// 				}
		// 			}
		// 		}

		// 		classModels.push(classModel);
		// 	}
		// }

		// let classDeclarationTokens = ast.filter(token => token.type === "ClassDeclaration");
		// for (let classDeclarationToken of classDeclarationTokens) {

		// }

		// Walk.ancestor(ast, {
		// 	ClassDeclaration: (node, ancestors) => {
		// 		classModels.push({ name: node.id.name, variables: [], methods: [] });
		// 		console.log(node);
		// 		console.log(ancestors);
		// 	}
		// });

		Walk.recursive(ast,
			{ 
				classModel: null,
				currentlyParsing: {
					type: "",
					name: ""
				}
			},
			{
				ClassDeclaration: (node, state, continueFn) => {
					state.classModel = { 
						name: node.id.name,
						variables: [],
						methods: []
					};
					classModels.push(state.classModel);

					continueFn(node.body, state);
				},
				MethodDefinition: (node, state, continueFn) => {
					if (node.kind === 'constructor') {
						state.currentlyParsing.type = "constructor";

						continueFn(node.value, state);
					} else if (node.kind === 'method') {
						state.classModel.methods.push({
							name: node.key.name,
							references: []
						});
						state.currentlyParsing = {
							type: "method",
							name: node.key.name
						};

						continueFn(node.value, state);
					}
				},
				MemberExpression: (node, state, continueFn) => {
					if (state.currentlyParsing.type === "constructor") {
						// Walk.recursive will hit this even when the type is not MethodDefinition.
						// Maybe's it's some super-type issue?
						if (node.type === 'MemberExpression' && node.object.type === "ThisExpression") {
							state.classModel.variables.push(node.property.name);
						}
					} else if (state.currentlyParsing.type === "method") {
						if (node.type === 'MemberExpression' && node.object.type === "ThisExpression") {
							let method = state.classModel.methods.find(method => method.name === state.currentlyParsing.name);
							method.references.push(node.property.name);
						}
					}
				}
			})

		return classModels;
	}
}