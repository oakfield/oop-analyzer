import Equatable from "../../src/app/Equatable";

// tslint:disable-next-line: no-any
export default function(chai: any, utils: any) {	
	const Assertion = chai.Assertion;

	// tslint:disable-next-line: no-any
	Assertion.addMethod('hasElement', function (other: Equatable) {
		console.log('pretty fly', this._obj);

		// tslint:disable-next-line: no-any
			const obj = this._obj;


			this.assert(
				obj.has(other),
				"message",
				"message2"
			);
	});
}

