import ClassModel from '../models/ClassModel';
import IUndirectedGraph from '../graphs/IUndirectedGraph';
import MethodModel from '../models/MethodModel';

/**
 * Converts a class into a graph representing the class.
 */
export default interface IUndirectedGraphConverter {

	/**
	 * Converts a class into a graph representing the class.
	 * @param classModel the class to convert
	 */
	convert(classModel: ClassModel): IUndirectedGraph<MethodModel>;
}
