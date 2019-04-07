import ClassModel from "../../models/ClassModel";

/**
 * Measures a class according the to Weight Methods per Class metric.
 * 
 * This class currently assigns a weight of 1 to all classes, so it really just counts
 * the methods in a class.
 */
export default class WmcMetric {

	/**
	 * Measures a class according to the WMC metric.
	 * @param classModel the class to evaluate 
	 */
	evaluate(classModel: ClassModel[]): number {
		return classModel
			.map(classModel => classModel.methods.length)
			.reduce((a, b) => a + b, 0) / classModel.length;
	}
}
