import formatDate from "../formatDate";

describe("formatDate tests", () => {
  test("should assert that date formatted correctly", () => {
    let result = formatDate(new Date(2021, 7, 6));
    expect(result).toBe("Fri 06/8/2021");
  });
});
