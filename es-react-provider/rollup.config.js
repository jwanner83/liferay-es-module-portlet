import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import replace from "@rollup/plugin-replace";

export default [
  {
    input: "src/index.ts",
    output: {
      format: "esm",
      dir: "assets/lib",
    },
    plugins: [
      resolve(),
      commonjs(),
      esbuild(),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
  },
  {
    input: "src/entry.js",
    output: {
      format: "commonjs",
      exports: "default",
      file: "build/entry.js",
    },
  },
];
