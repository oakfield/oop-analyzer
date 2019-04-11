/**
 * Command-line program arguments.
 */
export default interface IProgramArguments {
	/**
	 * The path of the file to run as input.
	 */
	file?: string;

	/**
	 * The name of the metric.
	 */
	metric?: "lcom1" | "lcom4" | "wmc";

	/**
	 * Whether to parse the file as a script or module.
	 */
	sourceType?: "script" | "module";

	/**
	 * The name of the transformation.
	 */
	transformation?: "components" | "maximal-cliques";
}
