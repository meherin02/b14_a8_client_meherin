import test from "node:test";
import assert from "node:assert/strict";
import { safeReturnPath } from "../src/lib/navigation.mjs";

test("keeps event destinations including query and hash", () => {
  assert.equal(
    safeReturnPath("/events/abc?view=details#join"),
    "/events/abc?view=details#join",
  );
  assert.equal(safeReturnPath("/create-event"), "/create-event");
});
test("rejects redirects to another website", () => {
  for (const value of [
    "https://outside.example",
    "//outside.example",
    "/\\outside.example",
    "/\n/outside.example",
    "javascript:alert(1)",
    ["/events"],
    undefined,
  ])
    assert.equal(safeReturnPath(value), "/profile");
});
test("avoids redirect loops through authentication pages", () => {
  for (const value of ["/login", "/register/", "/login?next=/login"])
    assert.equal(safeReturnPath(value), "/profile");
});
