import Equatable from "../../src/app/Equatable";

// tslint:disable-next-line: no-namespace
declare namespace Chai {
	export interface Assertion {
		hasElement(other: Equatable): Assertion;
	}
}
