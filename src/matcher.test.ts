import { describe, it, expect, afterEach, jest, afterAll } from "@jest/globals";
import { CustomEventTestDetails, toMatchCustomEvent } from "./matcher";


describe("toMatchCustomEvent()", () => {

	afterEach(() => {
		jest.clearAllMocks();
	})

	afterAll(() => {
		jest.restoreAllMocks();
	});

	function mockCustomEvent(properties: CustomEventTestDetails): CustomEvent {
		const mockEvent = Object.create(CustomEvent.prototype);

		for(const [propertyName, propertyValue] of Object.entries(properties)) {
			Object.defineProperty(mockEvent, propertyName, {
				value: propertyValue,
				writable: false
			});
		}

		return mockEvent;
	}

	it.each([
		{ property: "type", expected: "test-event-name", received: "test-event-name", shouldPass: true },
		{ property: "type", expected: "test-event-name", received: "received-event-name", shouldPass: false },
		{ property: "type", expected: "expected-event-name", received: "test-event-name", shouldPass: false },
		{ property: "bubbles", expected: true, received: true, shouldPass: true },
		{ property: "bubbles", expected: false, received: false, shouldPass: true },
		{ property: "bubbles", expected: true, received: false, shouldPass: false },
		{ property: "bubbles", expected: false, received: true, shouldPass: false },
		{ property: "composed", expected: true, received: true, shouldPass: true },
		{ property: "composed", expected: false, received: false, shouldPass: true },
		{ property: "composed", expected: true, received: false, shouldPass: false },
		{ property: "composed", expected: false, received: true, shouldPass: false },
		{ property: "cancelable", expected: true, received: true, shouldPass: true },
		{ property: "cancelable", expected: false, received: false, shouldPass: true },
		{ property: "cancelable", expected: true, received: false, shouldPass: false },
		{ property: "cancelable", expected: false, received: true, shouldPass: false },
	])("should pass ($shouldPass) when received.$property ($received) === expected.$property ($expected)", ({ property, expected, received, shouldPass }) => {
		const event = mockCustomEvent({ [property]: received });
		const res = toMatchCustomEvent(event, { [property]: expected })
		expect(res.pass).toBe(shouldPass);
		expect(res.message()).toEqual(expect.any(String));
	});

});
