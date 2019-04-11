import * as Acorn from "acorn";
import * as Walk from "acorn-walk";

import ClassModel from "./models/ClassModel";
import IParserState from "./IParserState";
import MethodModel from "./models/MethodModel";
import VariableModel from "./models/VariableModel";

/**
 * Models a JavaScript file.
 */
export default class JavaScriptFile {
	/**
	 * Constructor.
	 * @param _source the text of the file
	 * @param _sourceType whether the file should be parsed as a script or module
	 */
	constructor(private _source: string, private _sourceType: "script" | "module" = "script") { }

	/**
	 * Transforms the file into a list of one or more models of classes.
	 */
	toClassModelArray(): ClassModel[] {
		let ast = Acorn.parse(this._source, { sourceType: this._sourceType });
		let classModels: ClassModel[] = [];

		Walk.recursive<IParserState>(ast,
			{
				classModel: null,
				currentlyParsing: {
					type: "",
					name: ""
				}
			} as IParserState,
			{
				ClassDeclaration: (node: Walk.ClassDeclarationNode, state: IParserState, continueFn: Walk.ContinueFn<IParserState>) => {
					state.classModel = new ClassModel(node.id.name);
					classModels.push(state.classModel);

					continueFn(node.body, state);
				},
				MethodDefinition: (node: Walk.MethodDefinitionNode, state: IParserState, continueFn: Walk.ContinueFn<IParserState>) => {
					if (node.kind === "constructor") {
						state.currentlyParsing.type = "constructor";

						continueFn(node.value, state);
					} else {
						if (!state.classModel) {
							throw new Error("Tried parsing a method definition outside of a class");
						}

						let methodModel = new MethodModel(node.key.name, this._source.substring(node.start, node.end));

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
				AssignmentExpression: (node: Walk.AssignmentExpressionNode, state: IParserState, continueFn: Walk.ContinueFn<IParserState>) => {
					if (!state.classModel) {
						throw new Error("Tried parsing an assignment expression outside of a class");
					}

					if (state.currentlyParsing.type === "method" || state.currentlyParsing.type === "constructor") {
						// Walk.recursive will hit this even when the type is not MethodDefinition.
						// Maybe it's some super-type issue?
						if (node.type === "AssignmentExpression" && node.left.object.type === "ThisExpression") {
							state.classModel.variables.push(new VariableModel(node.left.property.name, this._source.substring(node.start, node.end)));
						}

						continueFn(node.left, state);

					}

					// Setters aren't getting processed without this. Seems wrong, though.
					else if (state.currentlyParsing.type === "setter") {
						continueFn(node.left, state);
					}
				},
				MemberExpression: (node: Walk.MemberExpressionNode, state: IParserState, continueFn: Walk.ContinueFn<IParserState>) => {
					if (!state.classModel) {
						throw new Error("Tried parsing a member expression outside of a class");
					}

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

	/**
	 * Serializes the file as a string.
	 */
	toString(): string {
		return this._source;
	}

	/**
	 * Adds a reference to a variable to a method or thing that can be treated as a method.
	 * @param node the node
	 * @param state any data to keep track of while parsing the file
	 * @param classModelSection a partial class model
	 */
	private _addVariableReferenceToMethodLike(node: Walk.MemberExpressionNode, state: IParserState, classModelSection: { name: string, references: VariableModel[] }[]): void {
		if (node.type === "MemberExpression" && node.object.type === "ThisExpression") {
			let methodLike = classModelSection.find(ml => ml.name === state.currentlyParsing.name);

			if (!methodLike) {
				throw new Error("Couldn't find match method in class");
			}

			let classAlreadyHasVariable = state.classModel!.variables.find((variable: VariableModel) => variable.name === node.property.name);
			let methodAlreadyHasVariable = methodLike.references.find((variable: VariableModel) => variable.name === node.property.name);

			if (methodAlreadyHasVariable) {
				return;
			} else if (classAlreadyHasVariable) {
				methodLike.references.push(classAlreadyHasVariable);
			} else {
				methodLike.references.push(new VariableModel(node.property.name));
			}
		}
	}
}
