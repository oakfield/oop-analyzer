import ClassModel from "./models/ClassModel";

/**
 * The state of a source code parser, intended to be used in an algorithm that walks recursively
 * and that therefore can't easily store its own state.
 */
export default interface IParserState {
	/**
	 * The ClassModel currently being constructed.
	 */
	classModel: ClassModel | null;

	/**
	 * Data on the AST member currently being parsed. If method foo is currently being parsed,
	 * type would be "method" and name would be "foo."
	 */
	currentlyParsing: {
		/**
		 * The type of the AST member currently being parsed.
		 */
		type: "constructor" | "method" | "getter" | "setter" | "";

		/**
		 * The name of the AST member currently being parsed.
		 */
		name: string;
	};
}
