import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        format: "es",
        file: "dist/index.js",
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      format: "es",
      file: "dist/index.d.ts",
    },
  }),
];
