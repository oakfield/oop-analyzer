import * as fs from 'fs';
import * as yargs from 'yargs';

import ClassModel from './app/models/ClassModel';
import ConnectedComponentsTransformation from './app/transformers/ConnectedComponentsTransformer';
import Lcom4Converter from './app/metrics/lcom4/Lcom4Converter';
import Lcom4Metric from './app/metrics/lcom4/Lcom4Metric';
import Parser from './app/Parser';
import WmcMetric from './app/metrics/wmc/WmcMetric';

yargs.alias('v', 'version')
	.version()

	.alias('h', 'help')
	.help('help')
	.usage('Usage: $0 --file=[filepath]')
	
	.option('f', {
		alias: 'file',
		demand: true,
		describe: 'Use file',
		type: 'string'
	})
	
	.option('m', {
		alias: 'metric',
		describe: 'Evaluate according to metric',
		type: 'string'
	})

	.option('s', {
		alias: 'sourceType',
		describe: 'For JavaScript files, whether to parse as script or module',
		type: 'string'
	})
	
	.option('t', {
		alias: 'transformation',
		describe: 'Transformation to apply',
		type: 'string'
	});

let argv = yargs.argv;

if (argv.file) {
	let filePath = argv.file;

	fs.readFile(filePath, "utf8", (error, data) => {
		let testClasses: ClassModel[] = new Parser().parse(data, argv.sourceType || 'script');

		if (argv.metric) {
			switch (argv.metric) {
				case 'lcom4':
					let lcom4Metric = new Lcom4Metric(new Lcom4Converter());
					for (let testClass of testClasses) {
						console.log(`${testClass.name}:\t${lcom4Metric.evaluate(testClass)}`);
					}
					break;
				case 'wmc':
					let wmcMetric = new WmcMetric();
					console.log(wmcMetric.evaluate(testClasses));
					break;
			}
		}

		if (argv.transformation) {
			switch (argv.transformation) {
				case 'connected-components':
					let counter = 0;
					for (let testClass of testClasses) {
						let lcom4Converter = new Lcom4Converter();
						let connectedComponentsTransformation = new ConnectedComponentsTransformation(lcom4Converter);
						let validated = connectedComponentsTransformation.transform(testClass);
					
						fs.writeFile(`./${counter++}.js`,
							validated.map(classModel => classModel.toString())
								.reduce((current, previous) => `${current}\n${previous}`),
							error => {
								if (error) {
									console.log(error);
								}
							});
					}
					break;
			}
		}
	});
}
