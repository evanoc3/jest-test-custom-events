import { expect } from "@jest/globals";
import { toMatchCustomEvent, type CustomEventTestDetails } from "./matcher";

export { CustomEventTestDetails } from "./matcher";

expect.extend({
	toMatchCustomEvent
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchCustomEvent(expected: CustomEventTestDetails): R
    }
  }
}
