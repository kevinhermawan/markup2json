# markup2json

![Minified size](https://img.shields.io/bundlephobia/min/markup2json) ![Test coverage](https://img.shields.io/codecov/c/github/kevinhermawan/markup2json) ![Monthly download](https://img.shields.io/npm/dm/markup2json)

`markup2json` is a JavaScript library that provides an easy way to convert HTML and XML into JSON format. It uses the [@xmldom/xmldom](https://github.com/xmldom/xmldom) package to parse the input HTML/XML string and convert it into a JSON object. The library is designed to be lightweight, easy to use and compatible with both Node.js and web browsers.

## Features

- Malformed input validation
- Supports HTML and XML
- Supports Deno via NPM

## Installation

To install `markup2json`, run the following command:

**NPM**

```
npm install markup2json
```

**Yarn**

```
yarn add markup2json
```

**pnpm**

```
pnpm add markup2json
```

## Usage

```ts
import markup2json from "markup2json";
// import markup2json from "npm:markup2json"; // (for Deno)

const html = "<div class='container'><p>Hello, World!</p></div>";
const json = markup2json(html);

console.log(json);
```

**Output**

```json
{
  "tag": "div",
  "attributes": {
    "class": "container"
  },
  "children": [
    {
      "tag": "p",
      "children": [
        {
          "tag": "#text",
          "text": "Hello, World!"
        }
      ]
    }
  ]
}
```

## License

[MIT License](/LICENSE)
