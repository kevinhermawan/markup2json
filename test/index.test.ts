import { describe, expect, test } from "vitest";

import markup2Json from "../src";

describe("markup2Json", () => {
  test("converts HTML to JSON", () => {
    const html = "<div class='container'><p>Hello, World!</p></div>";

    expect(markup2Json(html)).toEqual({
      tag: "div",
      attributes: { class: "container" },
      children: [
        {
          tag: "p",
          children: [
            {
              tag: "#text",
              text: "Hello, World!",
            },
          ],
        },
      ],
    });
  });

  test("converts XML to JSON", () => {
    const xml =
      "<channel><content:encoded><![CDATA[ Hello, World! ]]></content:encoded></channel>";

    expect(markup2Json(xml)).toEqual({
      tag: "channel",
      children: [
        {
          tag: "content:encoded",
          children: [
            {
              tag: "#cdata-section",
              text: "Hello, World!",
            },
          ],
        },
      ],
    });
  });

  test("throws error for invalid input", () => {
    const html = null as unknown as string;

    expect(() => markup2Json(html)).toThrowError(
      "Invalid input. Please provide a valid HTML or XML string.",
    );
  });

  test("throws error for empty input", () => {
    const html = "";

    expect(() => markup2Json(html)).toThrowError(
      "Invalid input. Please provide a valid HTML or XML string.",
    );
  });

  test("throws error for malformed input", () => {
    const html = "<div><p>Hello, World!</p";

    expect(() => markup2Json(html)).toThrowError(
      "Malformed input. Please ensure that the input is a well-formed HTML or XML string.",
    );
  });
});
