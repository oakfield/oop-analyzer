/**
 * Custom type definitions for acorn-walk library.
 */
declare module "acorn-walk" {
	import * as Acorn from "acorn";

	export interface AssignmentExpressionNode extends Acorn.Node {
		left: MemberExpressionNode;
		right: Acorn.Node
	}

	export interface ClassDeclarationNode extends Acorn.Node {
		body: Acorn.Node;
		id: IdentifierNode;
		superClass: null;
	}

	export interface IdentifierNode extends Acorn.Node {
		name: string;
	}

	export interface MemberExpressionNode extends Acorn.Node {
		object: Acorn.Node;
		property: IdentifierNode;
		computed: boolean;
	}

	export interface MethodDefinitionNode extends Acorn.Node {
		kind: string;
		value: any;
		key: {
			name: string;
		};
	}

	export interface WalkFunctionMap<TState> {
		[key: string]: (node: Acorn.Node, state: TState, continueFn: ContinueFn<TState>) => void
	}

	/** A recursive walk is one where your functions override the default walkers. They can modify
	 * and replace the state parameter that's threaded through the walk, and can opt how and
	 * whether to walk their child nodes (by calling their third argument on these nodes).
	 */
	export function recursive<TState>(
		node: Acorn.Node,
		state: TState,
		funcs: WalkFunctionMap<TState>,
		baseVisitor?: () => void,
		override?: boolean
	): void

	/** A simple walk is one where you simply specify callbacks to be called on specific nodes.
	 * The last two arguments are optional. A simple use would be
	 *
	 *     walk.simple(myTree, {
	 *         Expression: function(node) { ... }
	 *     });
	 *
	 * to do something with all expressions. All Parser API node types can be used to identify
	 * node types, as well as Expression and Statement, which denote categories of nodes.
	 *
	 * The base argument can be used to pass a custom (recursive) walker, and state can be used
	 * to give this walked an initial state.
	 */
	export function simple<TState>(
		node: Acorn.Node,
		visitors: WalkFunctionMap<TState>,
		baseVisitor?: () => void,
		state?: TState,
		override?: boolean
	): void

	type ContinueFn<T> = (arg0: object, arg1: T) => void;
}
