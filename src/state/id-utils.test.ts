import { calculateNextIndex } from "./id-utils";

it("should extract only pseudo ids", () => {
  const newIndex = calculateNextIndex(["<10>", "asdfasdf", "0", "0", "<5>"]);
  expect(newIndex).toBe(11);
});

it("should create new pseudo id if none exists", () => {
  const newIndex = calculateNextIndex(["asdfasdf", "0", "0"]);
  expect(newIndex).toBe(0);
});
