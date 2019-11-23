import Equatable from "../../src/app/Equatable";

/**
 * Test class.
 */
export default class TestEquatable implements Equatable {
	name: string;

	constructor(name = "test") {
		this.name = name;
	}

	equals(other: TestEquatable): boolean {
		return this.name === other.name;
	}
}
