import { AssignmentExpression, ClassDeclaration, ScriptTarget, SyntaxKind, Node as TypeScriptNode, VariableDeclaration, VariableStatement, createSourceFile, forEachChild } from "typescript";

import ClassModel from "./models/ClassModel";
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

		const walkClass = (currentClassModel: ClassModel, node: TypeScriptNode) => {
			switch (node.kind) {
				case SyntaxKind.Constructor:
					currentlyParsing = SyntaxKind.Constructor;

					forEachChild(node, () => walkClass(currentClassModel, node));
				break;
				case SyntaxKind.MethodDeclaration:
					; // do something
					break;
				case SyntaxKind.GetAccessor:
					; // do something
					break;
				case SyntaxKind.SetAccessor:
					; // do something
					break;
				case SyntaxKind.VariableStatement:
					break;
				case SyntaxKind.FirstAssignment:
					console.log("got here");
						
					if (currentlyParsing === SyntaxKind.Constructor) {
						let { name, initializer } = node as any;
						currentClassModel.variables.push(
							new VariableModel(name.getText(), initializer ? initializer.getText() : "")
						);
					}

					break;
				default:
					return;
			}
	
			forEachChild(node, () => walkClass(currentClassModel, node));
		};

		// TODO: consider parameterizing the file name. Do we need a file name?
		// TODO: consider parameterizing the script target
		const sourceFile = createSourceFile("", this._source, ScriptTarget.Latest);

		forEachChild(sourceFile, (node: TypeScriptNode) => {
			if (node.kind === SyntaxKind.ClassDeclaration) {
				const name = (node as ClassDeclaration).name;
				// TODO: better default name
				let currentClassModel = new ClassModel(name ? name.text : "Default");
				classModels.push(currentClassModel);

				node.forEachChild(() => walkClass(currentClassModel, node));
			}
		});

		return classModels;
	}
}
