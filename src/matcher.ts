import type { SyncExpectationResult } from "expect";
import { isEqual } from "lodash";


export type CustomEventTestDetails = Partial<{
	type: string
	bubbles: boolean
	composed: boolean
	cancelable: boolean
	target: EventTarget | null
	defaultPrevented: boolean
	eventPhase: number
	isTrusted: boolean
	timeStamp: number
	detail: any
}>;


type CustomEventTestableProperties = CustomEvent | CustomEventTestDetails;


export function toMatchCustomEvent(received: any, expected: CustomEventTestDetails): SyncExpectationResult {
	if(!(received instanceof CustomEvent)) {
		return { pass: false, message: () => `Expected value to be an instance of: CustomEvent, but received: ${received}` };
	}

	const testableProperties = (
		(Object.keys(expected) as (keyof CustomEventTestableProperties)[])
					 .filter(key => key !== "detail")
	);

	for(const property of testableProperties) {
		if(expected[property] !== undefined && received[property] !== expected[property]) {
			return { pass: false, message: () => `Expected event.${property} to be: ${expected[property]}, but received: ${received[property]}` };
		}
	}

	if(expected.detail && !isEqual(expected.detail, received.detail)) {
		return { pass: false, message: () => `Expected event.detail to be: ${JSON.stringify(expected.detail)}, but received: ${JSON.stringify(received.detail)}` };
	}

	return { message: () => "", pass: true };
}
