import './App.css';
import cloneDeep from 'lodash/cloneDeep';
import {
  CrosshairSettings,
  DEFAULT_SETTINGS,
  PrimarySettings,
  SniperCenterDotMapping,
  SniperSettings,
  generateCrosshair,
  generateCrosshairFromCode,
} from './codegenerator';
import useLocalStorage from 'use-local-storage';
import Modal from 'react-modal';

import { useEffect, useRef, useState } from 'react';
import CrosshairDisplay from './CrosshairDisplay';
import { Navbar } from './Navbar';
import LineSettingsGroup from './CrosshairBuilder/LineSettingsGroup';
import BaseSettingsGroup from './CrosshairBuilder/BaseSettingsGroup';
import { useImmer } from 'use-immer';
import SettingRowBoolean from './CrosshairBuilder/SettingRowBoolean';
import SettingHeader from './CrosshairBuilder/SettingHeader';
import SettingRowColor from './CrosshairBuilder/SettingRowColor';
import SettingRowSlider from './CrosshairBuilder/SettingRowSlider';
import SettingRow from './CrosshairBuilder/SettingRow';
import useClipboard from 'react-use-clipboard';

function PrimarySettingsGroup({
  disabled = false,
  settings,
  onChange,
}: {
  disabled?: boolean;
  settings: PrimarySettings;
  onChange: (value: PrimarySettings) => void;
}) {
  return (
    <div className="scrollbar">
      {disabled && <div className="disabled-overlay"></div>}
      <BaseSettingsGroup settings={settings} onChange={onChange} />
      <div className="flex-col overflow-auto">
        <LineSettingsGroup
          lineSettings={settings.inner_lines}
          onChange={(value) => {
            onChange({ ...settings, inner_lines: value });
          }}
          label="Inner Lines"
        />
        <LineSettingsGroup
          lineSettings={settings.outer_lines}
          onChange={(value) => {
            onChange({ ...settings, outer_lines: value });
          }}
          label="Outer Lines"
        />
      </div>
    </div>
  );
}

const initialState = cloneDeep(DEFAULT_SETTINGS);

function Tabs({
  settings,
  tab,
  onChange,
}: {
  settings: any;
  tab: any;
  onChange: (value: number) => void;
}) {
  let tabs = ['General', 'Primary'];
  if (settings.use_advanced_options) {
    tabs = tabs.concat(['Aim Down Sights', 'Sniper Scope']);
  }
  return (
    <ul className="x-tabs">
      {tabs.map((v, i) => (
        <li
          key={`tab-${i}`}
          onClick={() => onChange(i)}
          className={tab === i ? 'selected' : ''}
        >
          <a href="#">{v}</a>
        </li>
      ))}
    </ul>
  );
}

function SniperCrosshairDisplay({ settings }: { settings: SniperSettings }) {
  return (
    <>
      <div className="crosshair grid place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width={200} height={200}>
          {settings[SniperCenterDotMapping.SHOW] && (
            <circle
              fill={'#' + settings[SniperCenterDotMapping.CUSTOM_COLOR]}
              r={settings[SniperCenterDotMapping.THICKNESS] * 4}
              opacity={settings[SniperCenterDotMapping.OPACITY]}
              cx={'50%'}
              cy={'50%'}
            />
          )}
        </svg>
      </div>
    </>
  );
}

Modal.setAppElement('#root');

function CrosshairProfileRow({
  settings,
  onNameChange,
}: {
  settings: CrosshairSettings;
  onNameChange: (value: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  useEffect(() => {
    console.log(showCopyTooltip);
    if (showCopyTooltip) {
      setTimeout(() => setShowCopyTooltip(false), 2000);
    }
  }, [showCopyTooltip]);
  return (
    <div className={`setting-row flex odd no-hover`}>
      <div className="setting-label flex flex-1 items-center  justify-between ">
        <div className="ml-5">Crosshair Profile</div>
        <div className="crosshair-profile">
          <div className="icon-btn delete">
            <span className="material-symbols-outlined">delete</span>
            <div className="tool-tip">delete crosshair profile</div>
          </div>
          <div className="separator"></div>
          <div
            className="icon-btn"
            onClick={() => {
              const code = generateCrosshair(settings);
              navigator.clipboard.writeText(code);
              setShowCopyTooltip(true);
            }}
          >
            <span className="material-symbols-outlined">upload</span>
            <div className={`tool-tip ${showCopyTooltip && 'hidden'}`}>
              export profile code
            </div>
            <div className={`copy tool-tip ${!showCopyTooltip && 'hidden'}`}>
              profile copied to clipboard
            </div>
          </div>
          <div className="icon-btn">
            <span className="material-symbols-outlined">download</span>
            <div className="tool-tip">import profile code</div>
          </div>
          <div className="icon-btn">
            <span className="material-symbols-outlined">content_copy</span>
            <div className="tool-tip">duplicate profile</div>
          </div>
          <div
            className="icon-btn"
            onClick={() => {
              input?.current?.focus();
            }}
          >
            <span className="material-symbols-outlined">edit_note</span>
            <div className="tool-tip">edit profile name</div>
          </div>
        </div>
      </div>
      <div className="setting-value flex flex-1 flex-row">
        <input
          type="text"
          ref={input}
          defaultValue={settings.name}
          onChange={(e) => {
            onNameChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
function App() {
  const [tab, setTab] = useState(1);
  const [crosshairs, setCrosshairs] = useLocalStorage('crosshairs', ['0']);
  const [settings, updateSettings] = useImmer<CrosshairSettings>(
    (crosshairs[0] && generateCrosshairFromCode(crosshairs[0])) || initialState
  );

  useEffect(() => {
    setCrosshairs([generateCrosshair(settings, true)]);
  }, [settings]);

  return (
    <>
      <Navbar />
      <div className="flex flex-1  justify-center overflow-auto">
        <div className="flex-1 h-max flex-row crosshair-form">
          <Tabs settings={settings} tab={tab} onChange={setTab} />

          <div className="crosshair-bg flex flex-shrink justify-center items-center relative mb-5">
            {/* <div className="code absolute top-0 left-0 font-bold p-2">
              {generateCrosshair(settings)}
            </div> */}
            {tab === 0 && settings.use_advanced_options && (
              <div className="flex flex-1 justify-evenly">
                <div className="general-crosshair-wrapper">
                  <div className="crosshair-title">
                    <span>Primary</span>
                  </div>
                  <CrosshairDisplay settings={settings.primary} />
                </div>
                <div className="general-crosshair-wrapper">
                  <div className="crosshair-title">
                    <span>Aim Down Sights</span>
                  </div>
                  <CrosshairDisplay settings={settings.ads} />
                </div>
                <div className="general-crosshair-wrapper">
                  <div className="crosshair-title">
                    <span>Sniper Scope</span>
                  </div>
                  <SniperCrosshairDisplay settings={settings.sniper} />
                </div>
              </div>
            )}
            {(tab === 1 ||
              tab === 2 ||
              (tab === 0 && !settings.use_advanced_options)) && (
              <CrosshairDisplay
                settings={tab === 2 ? settings.ads : settings.primary}
              />
            )}
            {tab === 3 && (
              <>
                <SniperCrosshairDisplay settings={settings.sniper} />
                <div className="sniper-overlay">
                  <div className="y"></div>
                  <div className="x"></div>
                  <div className="bar left"></div>
                  <div className="bar right"></div>
                </div>
              </>
            )}
          </div>

          <CrosshairProfileRow
            settings={settings}
            onNameChange={(value) => {
              updateSettings((settings) => {
                settings.name = value;
              });
            }}
          />

          {tab === 0 && (
            <div className="general">
              <SettingHeader>General</SettingHeader>
              <SettingRowBoolean
                value={+settings.use_advanced_options as 0 | 1}
                label="Use Advanced Options"
                onChange={(value) => {
                  updateSettings((settings) => {
                    settings.use_advanced_options = !!value;
                  });
                }}
              />
              <div className="mt-10"></div>
              <SettingHeader>Other</SettingHeader>
              <div className="setting-row hidden"></div>
              <SettingRowBoolean
                value={+settings.fade_crosshair_with_firing_error as 0 | 1}
                label="Fade Crosshair with Firing Error"
                onChange={(value) => {
                  updateSettings((settings) => {
                    settings.fade_crosshair_with_firing_error = !!value;
                  });
                }}
              />
            </div>
          )}

          {tab === 1 && (
            <PrimarySettingsGroup
              onChange={(primary) => {
                updateSettings((settings) => {
                  settings.primary = primary;
                });
              }}
              settings={settings.primary}
            />
          )}
          {tab === 2 && (
            <div className="no-bg">
              <SettingRowBoolean
                value={+settings.ads_copy_primary as 0 | 1}
                label="Copy Primary Crosshair"
                onChange={(value) => {
                  updateSettings((settings) => {
                    settings.ads_copy_primary = !!value;
                  });
                }}
              />
              <PrimarySettingsGroup
                disabled={settings.ads_copy_primary}
                onChange={(primary) => {
                  updateSettings((settings) => {
                    settings.ads = primary;
                  });
                }}
                settings={settings.ads}
              />
            </div>
          )}
          {tab === 3 && (
            <>
              <SettingHeader>General</SettingHeader>
              <div className="setting-row hidden"></div>
              <SettingRowColor
                color={
                  '#' + settings.sniper[SniperCenterDotMapping.CUSTOM_COLOR]
                }
                onChange={(color) => {
                  updateSettings((settings) => {
                    settings.sniper[SniperCenterDotMapping.CUSTOM_COLOR] =
                      color;
                  });
                }}
              />
              <SettingRowBoolean
                label="Center Dot"
                value={+settings.sniper[SniperCenterDotMapping.SHOW] as 0 | 1}
                onChange={(value) => {
                  updateSettings((settings) => {
                    settings.sniper[SniperCenterDotMapping.SHOW] = !!value;
                  });
                }}
              />
              <SettingRowSlider
                label="Center Dot Opacity"
                value={+settings.sniper[SniperCenterDotMapping.OPACITY]}
                onChange={(value) => {
                  updateSettings((settings) => {
                    settings.sniper[SniperCenterDotMapping.OPACITY] = value;
                  });
                }}
              />
              <SettingRowSlider
                label="Center Dot Thickness"
                value={+settings.sniper[SniperCenterDotMapping.THICKNESS]}
                max={4}
                min={0}
                onChange={(value) => {
                  updateSettings((settings) => {
                    settings.sniper[SniperCenterDotMapping.THICKNESS] = value;
                  });
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
