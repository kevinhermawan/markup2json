import { DOMParser } from "@xmldom/xmldom";

export type Result = {
  tag: string;
  text?: string;
  children?: Result[];
  attributes?: { [key: string]: string };
};

const INVALID_ERROR_MSG =
  "Invalid input. Please provide a valid HTML or XML string.";
const MALFORMED_ERROR_MSG =
  "Malformed input. Please ensure that the input is a well-formed HTML or XML string.";
const WELLFORMED_REGEX =
  /^<[a-zA-Z0-9]+:?[a-zA-Z]+.*>.*<\/[a-zA-Z0-9]+:?[a-zA-Z]+>$/;

export default function markup2Json(html: string): Result {
  if (typeof html !== "string") throw new SyntaxError(INVALID_ERROR_MSG);
  if (html.length === 0) throw new SyntaxError(INVALID_ERROR_MSG);
  if (!html.match(WELLFORMED_REGEX)) throw new SyntaxError(MALFORMED_ERROR_MSG);

  const parser = new DOMParser();
  const document = parser.parseFromString(html);

  return nodeToJSON(document.documentElement);
}

function nodeToJSON(node: HTMLElement): Result {
  const result: Result = {
    tag: node.nodeName,
  };

  if (node.nodeType === 3 || node.nodeType === 4) {
    result["text"] = node.nodeValue?.trim();
  }

  if (node.attributes && node.attributes.length > 0) {
    result.attributes = {};

    for (let i = 0; i < node.attributes.length; i++) {
      const attribute = node.attributes[i];
      result.attributes[attribute.name] = attribute.value;
    }
  }

  if (node.childNodes && node.childNodes.length > 0) {
    result.children = [];

    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      result.children.push(nodeToJSON(child as HTMLElement));
    }
  }

  return result;
}
