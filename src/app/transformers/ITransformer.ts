import ClassModel from "../models/ClassModel";

/**
 * Transforms a class into multiple classes.
 */
export default interface IComponentsTransformer {
	/**
	 * Transforms a class into multiple classes.
	 * @param classModel the class to transform
	 */
	transform(classModel: ClassModel): ClassModel[];
}
