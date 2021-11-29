import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import esbuild from 'rollup-plugin-esbuild'

export default [
  {
    input: 'src/index.tsx',
    output: {
      format: 'esm',
      dir: 'assets/lib'
    },
    plugins: [
      resolve(),
      commonjs(),
      esbuild(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      alias({
        entries: [
          { find: 'es-react-provider', replacement: '/o/es-react-provider/lib/index.js' },
          { find: 'es-react-components', replacement: '/o/es-react-components/lib/index.js' }
        ]
      })
    ],
    external: [
      '/o/es-react-provider/lib/index.js',
      '/o/es-react-components/lib/index.js'
    ]
  },
  {
    input: 'src/entry.ts',
    plugins: [
      esbuild()
    ],
    output: {
      format: 'commonjs',
      exports: 'default',
      file: 'build/entry.js'
    }
  }
]