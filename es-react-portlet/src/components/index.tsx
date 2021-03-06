import { React } from 'es-react-provider'
import { SampleComponent } from 'es-react-components'
import PortletEntryParams from '../types/PortletEntryParams'
import LiferayObject from '../types/LiferayObject'

declare const Liferay: LiferayObject

const App = (liferayParams: PortletEntryParams): any => {
  return (
    <div>
      <SampleComponent />
      
      <div>
        <span className="tag">
          {String(Liferay.Language.get('portlet-namespace'))}:
        </span>
        <span className="value">
            {liferayParams.portletNamespace}
        </span>
      </div>
      <div>
        <span className="tag">
          {String(Liferay.Language.get('context-path'))}:
        </span>
        <span className="value">
            {liferayParams.contextPath}
        </span>
      </div>
      <div>
        <span className="tag">
          {String(Liferay.Language.get('portlet-element-id'))}:
        </span>
        <span className="value">
            {liferayParams.portletElementId}
        </span>
      </div>
      <div>
        <span className="tag">
          {String(Liferay.Language.get('configuration'))}:
        </span>
        <span className="value pre">
          {JSON.stringify(liferayParams.configuration, null, 2)}
        </span>
      </div>
    </div>
  )
}

export default App
