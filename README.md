# Jest Test Custom Events

An NPM package which adds a custom matcher to [Jest](https://jestjs.io/) allowing for testing of [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent).

## Installation

```sh
npm install jest-test-custom-events
```

## Example Usage

```typescript
// file: example.test.ts
import { test, expect } from "@jest/globals";
import "jest-test-custom-events";

test("example test", () => {
	const customEvent = new CustomEvent("custom-event-name", {
		bubbles: true,
		composed: true,
		detail: {
			exampleProperty: true
		}
	});

	expect(customEvent).toMatchCustomEvent({
		type: "custom-event-name",
		bubbles: true,
		composed: true,
		detail: {
			exampleProperty: true
		}
	})
});
```

Well you may think you're able to do this with the built-in `isEqual` matcher, `CustomEvent` is implemented in such a way as to make it's properties non-enumerable, and hence almost always pass on deep equality checks.
