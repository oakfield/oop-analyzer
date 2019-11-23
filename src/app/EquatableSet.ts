import Equatable from "./Equatable";
import { difference } from "lodash";

type predicate<T> = (item: T) => boolean;

/**
 * An implementation of the Set ADT in which comparisons are made on some item-specific definition
 * of equality, rather than always on referential equality.
 */
export default class EquatableSet<Item extends Equatable> implements Iterable<Item>, Equatable {
	private _items: Item[] = [];

	constructor(...items: Item[]) {
		for (let item of items) {
			this.add(item);
		}
	}

	/**
	 * The number of items in the set.
	 */
	get size(): number {
		return this._items.length;
	}

	/**
	 * Adds an item to the set (if no equal item already exists).
	 * @param item the item to add
	 */
	add(item: Item): EquatableSet<Item> {
		if (!this._items.some(i => i.equals(item)))
			this._items.push(item);

		return this;
	}

	/**
	 * Finds items in this set but not in a given set.
	 * @param other the set items from which should be excluded
	 */
	difference(other: EquatableSet<Item>): EquatableSet<Item> {
		return new EquatableSet(...difference(this._items, other._items));
	}

	/**
	 * Returns true iff the sets' items are equal.
	 * @param other the set against which to check for equality
	 */
	equals(other: EquatableSet<Item>): boolean {
		return this._items.every(item => other.some(otherItem => item.equals(otherItem)));
	}

	/**
	 * Returns true iff every item satisfies the given condition.
	 * @param callback predicate to check for each item
	 */
	every(callback: predicate<Item>): boolean {
		return this._items.every(callback);
	}

	/**
	 * Returns a new EquatableSet that doesn't include items for which the predicate returns true.
	 * @param callback a function that takes in a item of the set and returns true or false
	 */
	filter(callback: predicate<Item>): EquatableSet<Item> {
		return new EquatableSet<Item>(...this._items.filter(callback));
	}

	find(callback: predicate<Item>): Item | undefined {
		return this._items.find(callback);
	}

	/**
	 * Returns a new Equatable set
	 */
	flatten(): Item extends EquatableSet<Equatable> ? Item : EquatableSet<Item> {
		// TODO: remove "any" type when TypeScript implements recursive types
		// tslint:disable-next-line: no-any
		return this._items.reduce<any>((accumulator, item) =>
				item instanceof EquatableSet
				? accumulator.union(item)
				: accumulator.add(item),
			new EquatableSet());
	}

	/**
	 * Returns true if the item is an element of the set.
	 * @param param the item to search for, or predicate to filter items by
	 */
	has(item: Item): boolean;
	has(predicate: predicate<Item>): boolean;
	has(parameter: Item | predicate<Item>): boolean {
		return parameter instanceof Function
			? !!this._items.find(parameter)
			: !!this._items.find(item => item.equals(parameter));
	}

	/**
	 * Calls a transformer function on each item of the set, then returns a new set with the
	 * resulting items.
	 * @param transformer a function that transforms items into the given type
	 */
	map<T extends Equatable>(transformer: (item: Item) => T): EquatableSet<T> {
		return new EquatableSet(...this._items.map(transformer));
	}

	mapArray<T>(transformer: (item: Item) => T): T[] {
		return this._items.map(transformer);
	}

	/**
	 * Selects an arbitrary member of the set. Useful when every item of the set is known to be
	 * the same in the relevant sense.
	 */
	pick(): Item {
		return this._items[0];
	}

	/**
	 * Projects a set down to a single item.
	 * @param transformer function that condenses items of the set
	 */
	reduce(transformer: (previousValue: Item, currentValue: Item, currentIndex: number, array: Item[]) => Item): Item {
		return this._items.reduce(transformer);
	}

	/**
	 * Returns true iff some item in the set satisfies the predicate.
	 * @param callback a function that takes in a item of the set and returns true or false
	 */
	some(callback: predicate<Item>): boolean {
		return this._items.some(callback);
	}

	/**
	 * Adds each item of a given set if not present.
	 * @param other the set items of which to add
	 */
	union(other: EquatableSet<Item>): EquatableSet<Item> {
		for (let item of other) {
			this.add(item);
		}

		return this;
	}

	*[Symbol.iterator](): IterableIterator<Item> {
		yield* this._items;
	}

	values(): Iterator<Item> {
		return this[Symbol.iterator]();
	}
}
