import { React, ReactDOM } from 'es-react-provider'
import App from './components/index'
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
export function main({ portletNamespace, contextPath, portletElementId, configuration }: PortletEntryParams): void {
  ReactDOM.render(
    <React.StrictMode>
      <App
          portletNamespace={portletNamespace}
          contextPath={contextPath}
          portletElementId={portletElementId}
          configuration={configuration}
      />
    </React.StrictMode>,
    document.getElementById(portletElementId),
  )
}
