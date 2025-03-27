# Jest Test Custom Events

An NPM package which adds a custom matcher, `toMatchCustomEvent` to [Jest](https://jestjs.io/) allowing for the testing of properties of [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent).

## Installation

```sh
npm install -D jest-test-custom-events
```

## Example Usage

```typescript
import "jest-test-custom-events";

test("example test", () => {
	// create a CustomEvent
	const e = new CustomEvent("custom-event-name", {
		bubbles: true,
		composed: true,
		detail: {
			exampleProperty: true
		}
	});

	// passes
	expect(e).toMatchCustomEvent({
		type: "custom-event-name",
		bubbles: true,
		composed: true,
		detail: {
			exampleProperty: true
		}
	});

	// fails – the value for 'bubbles' does not match the received event
	expect(e).toMatchCustomEvent({
		bubbles: false
	});
});
```

Counterintuitively, you cannot do this using the built-in `isEqual` matcher because `CustomEvent` is implemented in such a way as to make it's properties non-enumerable, and hence wil almost always pass deep equality checks.
