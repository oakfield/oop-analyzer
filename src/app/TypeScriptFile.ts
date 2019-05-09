import {
	BinaryExpression,
	ClassDeclaration,
	PropertyAccessExpression,
	ScriptTarget,
	SyntaxKind,
	Node as TypeScriptNode,
	createSourceFile,
	forEachChild
} from "typescript";

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
		let currentClassModel: ClassModel | null = null;

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
				case SyntaxKind.BinaryExpression:
					if (currentlyParsing === SyntaxKind.Constructor) {
						const variableName = ((node as BinaryExpression).left as PropertyAccessExpression).name.text;
						
						currentClassModel!.variables.push(
							new VariableModel(
								variableName,
								this._source.substring(node.pos, node.end)
							)
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
}
