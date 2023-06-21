import './App.css';
import cloneDeep from 'lodash/cloneDeep';
import {
  DEFAULT_SETTINGS,
  CrosshairSettings,
  PrimarySettings,
} from './codegenerator';

import { useEffect, useReducer, useState } from 'react';
import CrosshairDisplay from './CrosshairDisplay';
import { Navbar } from './Navbar';
import LineSettingsGroup from './CrosshairBuilder/LineSettingsGroup';
import BaseSettingsGroup from './CrosshairBuilder/BaseSettingsGroup';

function PrimarySettingsGroup({
  settings: _settings,
  onChange,
}: {
  settings: PrimarySettings;
  onChange: (value: PrimarySettings) => void;
}) {
  const [settings, setSettings] = useState(() => cloneDeep(_settings));

  useEffect(() => {
    onChange(_settings);
  }, [settings]);

  return (
    <>
      <BaseSettingsGroup
        settings={settings}
        onChange={(value) => {
          setSettings({ ...value });
        }}
      />
      <div className=" flex-col  overflow-auto">
        <LineSettingsGroup
          lineSettings={settings.inner_lines}
          onChange={(value) => {
            setSettings({ ...settings, inner_lines: value });
          }}
          label="Inner Lines"
        />
        <LineSettingsGroup
          lineSettings={settings.outer_lines}
          onChange={(value) => {
            setSettings({ ...settings, outer_lines: value });
          }}
          label="Outer Lines"
        />
      </div>
    </>
  );
}
function App() {
  const [settings, updateSettings] = useReducer(
    (state: CrosshairSettings, newState: Partial<CrosshairSettings>) => ({
      ...state,
      ...newState,
    }),
    cloneDeep(DEFAULT_SETTINGS)
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-1  justify-center overflow-auto">
        <div className="flex-1 h-max flex-row crosshair-form">
          <ul>
            <li>
              <a href="#">General</a>
            </li>
            <li>
              <a href="#">Primary</a>
            </li>
          </ul>
          <div className="crosshair-bg  flex flex-shrink justify-center items-center ">
            <CrosshairDisplay settings={settings.primary} />
          </div>

          <PrimarySettingsGroup
            onChange={(primary) => {
              updateSettings({ primary });
            }}
            settings={settings.primary}
          />
        </div>
      </div>
    </>
  );
}

export default App;
