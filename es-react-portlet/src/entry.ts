import PortletEntryParams from './types/PortletEntryParams'

/**
 * This is the main entry point of the portlet.
 *
 * See https://tinyurl.com/js-ext-portlet-entry-point for the most recent
 * information on the signature of this function.
 *
 * @return {void}
 * @param liferayParams
 */
export default function main(entryParams: PortletEntryParams): void {
   const node = document.getElementById(entryParams.portletElementId);

   const script = document.createElement('script')
   script.setAttribute('type', 'module')
   script.innerText = `
      import { main } from '/o/es-react-portlet/lib/index.js';
      main(${JSON.stringify(entryParams)});
   `

   node.append(script)
}
