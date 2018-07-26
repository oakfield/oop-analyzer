import * as Acorn from "acorn";
import * as Walk from "acorn/dist/walk";
import ClassModel from "./models/ClassModel";
import MethodModel from "./models/MethodModel";
import VariableModel from "./models/VariableModel";

export default class Parser {
	constructor() { }

	parse(file): ClassModel[] {
		let ast = Acorn.parse(file);
		let classModels: ClassModel[] = [];

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
					state.classModel = new ClassModel(node.id.name);
					classModels.push(state.classModel);

					continueFn(node.body, state);
				},
				MethodDefinition: (node, state, continueFn) => {
					if (node.kind === "constructor") {
						state.currentlyParsing.type = "constructor";
						state.classModel.constructorModel = new MethodModel("constructor", file.substring(node.start, node.end));

						continueFn(node.value, state);
					} else if (node.kind === "method") {
						let methodModel = new MethodModel(node.key.name, file.substring(node.start, node.end));
						state.classModel.methods.push(methodModel);
						state.currentlyParsing = {
							type: "method",
							name: methodModel.name
						};

						continueFn(node.value, state);
					}
				},
				AssignmentExpression: (node, state, continueFn) => {
					if (state.currentlyParsing.type === "constructor") {
						// Walk.recursive will hit this even when the type is not MethodDefinition.
						// Maybe it's some super-type issue?
						if (node.type === "AssignmentExpression" && node.left.object.type === "ThisExpression") {
							state.classModel.variables.push(new VariableModel(node.left.property.name, file.substring(node.start, node.end)));
						}

						continueFn(node.left, state);
					}
				},
				MemberExpression: (node, state, continueFn) => {
					if (state.currentlyParsing.type === "method") {
						if (node.type === "MemberExpression" && node.object.type === "ThisExpression") {
							let method = state.classModel.methods.find(method => method.name === state.currentlyParsing.name);
							let existingVariable = state.classModel.variables.find(variable => variable.name === node.property.name);

							if (existingVariable) {
								method.references.push(existingVariable);
							} else {
								method.references.push(new VariableModel(node.property.name));
							}
						}
					}
				}
			});

		return classModels;
	}
}