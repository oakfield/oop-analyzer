import {
	BinaryExpression,
	ClassDeclaration,
	MethodDeclaration,
	PropertyAccessExpression,
	ScriptTarget,
	SyntaxKind,
	Node as TypeScriptNode,
	createSourceFile,
	forEachChild
} from "typescript";

import ClassModel from "./models/ClassModel";
import MethodModel from "./models/MethodModel";
import VariableModel from "./models/VariableModel";

/**
 * Models a TypeScript file.
 */
export default class TypeScriptFile {
	/**
	 * Constructor.
	 * @param _source the text of the file
	 * @param _sourceType whether the file should be parsed as a script or module
	 */
	constructor(private _source: string, private _sourceType: "script" | "module" = "script") { }

	toClassModelArray(): ClassModel[] {
		let classModels: ClassModel[] = [];
		let currentlyParsing: SyntaxKind | null = null;
		let currentClassModel: ClassModel | null = null;
		let currentMethodModel: MethodModel | null = null;

		const walk = (node: TypeScriptNode) => {
			switch (node.kind) {
				case SyntaxKind.ClassDeclaration:
					const name = (node as ClassDeclaration).name;
					// TODO: better default name
					currentClassModel = new ClassModel(name ? name.text : "Default");
					classModels.push(currentClassModel);

					node.forEachChild(walk);
					break;
				case SyntaxKind.Constructor:
					currentlyParsing = SyntaxKind.Constructor;

					node.forEachChild(walk);
					break;
				case SyntaxKind.MethodDeclaration:
					currentlyParsing = SyntaxKind.MethodDeclaration;

					const methodName = this._getNodeText((node as MethodDeclaration).name);
					currentMethodModel = new MethodModel(
						methodName,
						this._getNodeText(node)
					);
					currentClassModel!.methods.add(currentMethodModel);

					node.forEachChild(walk);

					currentMethodModel = null;
					break;
				case SyntaxKind.GetAccessor:
					currentlyParsing = SyntaxKind.GetAccessor;

					const getterName = this._getNodeText((node as MethodDeclaration).name);
					currentMethodModel = new MethodModel(
						getterName,
						this._getNodeText(node)
					);
					currentClassModel!.getters.add(currentMethodModel);

					node.forEachChild(walk);

					currentMethodModel = null;
					break;
				case SyntaxKind.SetAccessor:
					currentlyParsing = SyntaxKind.SetAccessor;

					const setterName = this._getNodeText((node as MethodDeclaration).name);
					currentMethodModel = new MethodModel(
						setterName,
						this._getNodeText(node)
					);
					currentClassModel!.setters.add(currentMethodModel);

					node.forEachChild(walk);

					currentMethodModel = null;
					break;
				case SyntaxKind.BinaryExpression:
					const variableName =  ((node as BinaryExpression).left as PropertyAccessExpression).name.text;
					if (!currentClassModel!.variables.has(variable => variable.name === variableName)) {
						currentClassModel!.variables.add(
							new VariableModel(
								variableName,
								this._getNodeText(node)
							)
						);
					}

					const referenceName = ((node as BinaryExpression).left as PropertyAccessExpression).name.text;
					if (currentlyParsing === SyntaxKind.MethodDeclaration
						|| currentlyParsing === SyntaxKind.GetAccessor
						|| currentlyParsing === SyntaxKind.SetAccessor
						&& !currentMethodModel!.references.has(reference => reference.name === referenceName)) {
						currentMethodModel!.references.add(
							new VariableModel(
								referenceName,
								this._getNodeText(node)
							)
						);
					}

					break;
				case SyntaxKind.PropertyAccessExpression:
					const propertyName = (node as PropertyAccessExpression).name.text;
					if (currentMethodModel && !currentMethodModel!.references.has(reference => reference.name === propertyName)) {
						currentMethodModel.references.add(
							new VariableModel((node as PropertyAccessExpression).name.text)
						);
					}
					break;
				default:
					node.forEachChild(walk);
			}
		};

		// TODO: consider parameterizing the file name. Do we need a file name?
		// TODO: consider parameterizing the script target
		const sourceFile = createSourceFile("", this._source, ScriptTarget.Latest);
		forEachChild(sourceFile, walk);

		return classModels;
	}

	private _getNodeText(node: TypeScriptNode): string {
		return this._source.substring(node.pos, node.end).trim();
	}
}
