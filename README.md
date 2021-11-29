# LIFERAY ES MODULE PORTLET
Sample repository to show how to use Liferay portlets with es modules.

## Goal
Provide packages and components with a portlet and import them on runtime into a portlet. This should increase build time to a minimum because the `liferay-npm-bundler` doesn't has to transpile files and only creates a jar file. 

## Explenation
The concept includes two modules. A provider module and a consumer modules. They are connected in a `n to n` relation. 

### Provider Module
A provider module exposes a package or component or basically anything through a portlet and serves the module then through an url.

To make this work, the following steps have to be done.

1. Create an entry which is required for the `liferay-npm-bundler`. 

    ```js
    export default function main () {}
    ```
    _See `es-react-provider/src/entry.js` as an example_
2. Create an index module which exports all modules which you'd like to provide through this module.

    ```js
    import SampleModule from './modules/SampleModule' 
    import AnotherSampleModule from './modules/AnotherSampleModule'
    
    export { SampleModule, AnotherSampleModule }
    ```

    _See `es-react-provider/src/index.ts` as an example_
3. Create two bundle processes which bundle the entry for the `liferay-npm-bundler` and the `index.ts` file. 
    - The entry for the `liferay-npm-bundler` needs to be placed inside the `build` folder in the `commonjs` format for liferay to handle it correctly. 
    - The bundled version of the `index.ts` needs to be placed inside the `assets` folder in the `es` format, preferably in the `lib` subfolder.

    _See `es-react-provider/rollup.config.js` as an example_
4. Define the `liferay-npm-bundler` to
    - ignore the assets folder
    - make the portlet available through a defined url 
    - create a jar file

    _See `es-react-provider/.npmbundlerrc` as an example_

### Consumer Module
A consumer module uses the provided es modules from provider modules.

1. Create an entry which includes a `script` html tag and imports a file.

    ```js
    export default function main(entryParams) {
        const node = document.getElementById(entryParams.portletElementId);

        const script = document.createElement('script')
        script.setAttribute('type', 'module')
        script.innerText = `
            import { main } from '/o/es-react-portlet/lib/index.js';
            main(${JSON.stringify(entryParams)});
        `

        node.append(script)
    }
    ```

    _See `es-react-portlet/src/entry.ts` as an example_
2. Create an index module, which (in our example) consumes some of the provided modules.

    ```js
    import { SampleModule, AnotherSampleModule } from '/o/es-provider/lib/index.js'

    export function main (entryParams) { ... }
    ```

    _See `es-react-portlet/src/index.tsx` as an example_
3. Create two bundle processes which bundle the entry for the `liferay-npm-bundler` and the `index` file. 
    - The entry for the `liferay-npm-bundler` needs to be placed inside the `build` folder in the `commonjs` format for liferay to handle it correctly. 
    - The bundled version of the `index` needs to be placed inside the `assets` folder in the `es` format, preferably in the `lib` subfolder.
    - The `/o/es-provider/lib/index.js` has to be defined to be an external module, so the bundler doesn't throws an error on build time.

    _See `es-react-portlet/rollup.config.js` as an example_ 
4. Define the `liferay-npm-bundler` to
    - ignore the assets folder
    - make the portlet available through a defined url 
    - create a jar file

    _See `es-react-portlet/.npmbundlerrc` as an example_

## Example
This workspace contains three modules.

### Modules
#### `es-react-provider`
Contains and exposes `react` and `react-dom` as es modules.

#### `es-react-components`
Contains components which can be imported into a portlet.

####  `es-react-portlet`
Contains the actual portlet which uses the `react` and `react-dom` from the `es-react-provider` module and includes a sample component from the `es-react-components` module.

### How to run
To run this example, all modules need to be built and deployt onto a liferay instance. After that, everything should work as expected.