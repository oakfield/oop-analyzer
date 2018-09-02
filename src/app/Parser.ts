import * as Acorn from "acorn";
import * as Walk from "acorn/dist/walk";

import ClassModel from "./models/ClassModel";
import MethodModel from "./models/MethodModel";
import VariableModel from "./models/VariableModel";

type ParserState = { classModel: ClassModel, currentlyParsing: { type: string, name: string }};

export default class Parser {
	constructor() { }

	static parse(file: string, sourceType: "script" | "module" = "script"): ClassModel[] {
		let ast = Acorn.parse(file, { sourceType });
		let classModels: ClassModel[] = [];

		Walk.recursive(ast,
			{ 
				classModel: null,
				currentlyParsing: {
					type: "",
					name: ""
				}
			} as ParserState,
			{
				ClassDeclaration: (node, state: ParserState, continueFn) => {
					state.classModel = new ClassModel(node.id.name);
					classModels.push(state.classModel);

					continueFn(node.body, state);
				},
				MethodDefinition: (node, state: ParserState, continueFn) => {
					if (node.kind === "constructor") {
						state.currentlyParsing.type = "constructor";

						continueFn(node.value, state);
					} else {
						let methodModel = new MethodModel(node.key.name, file.substring(node.start, node.end));

						switch (node.kind) {
							case "method":
								state.classModel.methods.push(methodModel);
								state.currentlyParsing = {
									type: "method",
									name: methodModel.name
								};
								break;
							case "get":
								state.classModel.getters.push(methodModel);
								state.currentlyParsing = {
									type: "getter",
									name: methodModel.name
								};
								break;
							case "set":
								state.classModel.setters.push(methodModel);
								state.currentlyParsing = {
									type: "setter",
									name: methodModel.name
								};
								break;
						}

						continueFn(node.value, state);
					}
				},
				AssignmentExpression: (node, state: ParserState, continueFn) => {
					if (state.currentlyParsing.type === "constructor") {
						// Walk.recursive will hit this even when the type is not MethodDefinition.
						// Maybe it's some super-type issue?
						if (node.type === "AssignmentExpression" && node.left.object.type === "ThisExpression") {
							state.classModel.variables.push(new VariableModel(node.left.property.name, file.substring(node.start, node.end)));
						}

						continueFn(node.left, state);

					}
					
					// Setters aren't getting processed without this. Seems wrong, though.
					else if (state.currentlyParsing.type === "setter") {
						continueFn(node.left, state);
					}
				},
				MemberExpression: (node, state: ParserState, continueFn) => {
					if (state.currentlyParsing.type === "method") {
						this._addVariableReferenceToMethodLike(node, state, state.classModel.methods);
					} else if (state.currentlyParsing.type === "getter") {
						this._addVariableReferenceToMethodLike(node, state, state.classModel.getters);
					} else if (state.currentlyParsing.type === "setter") {
						this._addVariableReferenceToMethodLike(node, state, state.classModel.setters);
					}
				}
			});

		return classModels;
	}

	private static _addVariableReferenceToMethodLike(node: any, state: any, classModelSection: any[]): void {
		if (node.type === "MemberExpression" && node.object.type === "ThisExpression") {
			let methodLike = classModelSection.find(ml => ml.name === state.currentlyParsing.name);
			let existingVariable = state.classModel.variables.find(variable => variable.name === node.property.name);

			if (existingVariable) {
				methodLike.references.push(existingVariable);
			} else {
				methodLike.references.push(new VariableModel(node.property.name));
			}
		}
	}
}