type Method = { name: string, references: string[]};
type ClassModel = { variables: string[], methods: Method[] };

interface IEvaluator<T> {
	evaluate(toEvaluate: { variables: string[], methods: Method[] }): number;
}