/**
 * Indicates whether this object is equal to another object of the same type.
 */
export default interface Equatable {
	equals(other: Equatable): boolean;
}
