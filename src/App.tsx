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
import CrosshairDisplay from './CrosshairDisplay/CrosshairDisplay';
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
import SAMPLE_CROSSHAIRS from './samplecrosshairs';
import { BrowsePage } from './Browse';
import SniperCrosshairDisplay from './CrosshairDisplay/SniperCrosshairDisplay';
import ModalCloseButton from './ModalCloseButton';
import AppModal from './AppModal';
import ImportModal from './ImportModal';
import CrosshairProfileRow from './CrosshairBuilder/CrosshairProfileRow';
import DuplicateModal from './DuplicateModal';
import DeleteModal from './DeleteModal';

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

Modal.setAppElement('#root');

function getNameFromCode(code: string) {
  const name = code.slice(code.indexOf('NAME') + 5);
  return name.replace(/^"|"$/g, '');
}

function CrosshairBuilderPage() {
  const [tab, setTab] = useState(1);

  const [crosshairs, setCrosshairs] = useLocalStorage('crosshairs', [
    generateCrosshair(DEFAULT_SETTINGS, true),
  ]);
  const [selectedCrosshair, setSelectedCrosshair] = useState(0); // crosshairs.length - 1);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [settings, updateSettings] = useImmer<CrosshairSettings>(() => {
    return (
      (crosshairs[selectedCrosshair] &&
        generateCrosshairFromCode(crosshairs[selectedCrosshair])) ||
      initialState
    );
  });
  useEffect(() => {
    crosshairs[selectedCrosshair] = generateCrosshair(settings, true);
    setCrosshairs(crosshairs);
  }, [settings]);

  useEffect(() => {
    updateSettings(generateCrosshairFromCode(crosshairs[selectedCrosshair]));
    // crosshairs[selectedCrosshair] = generateCrosshair(settings, true);
    // setCrosshairs(crosshairs);
  }, [selectedCrosshair]);
  return (
    <div className="flex-1 h-max flex-row crosshair-form">
      <ImportModal
        isOpen={isImportModalOpen}
        onRequestClose={() => setIsImportModalOpen(false)}
        onConfirm={(value) => {
          updateSettings(generateCrosshairFromCode(value));
          setIsImportModalOpen(false);
        }}
      />

      <DuplicateModal
        isOpen={isDuplicateModalOpen}
        name={settings.name}
        onConfirm={() => {
          const name = `Copy of ${settings.name}`;
          crosshairs.push(generateCrosshair({ ...settings, name }, true));
          setCrosshairs([...crosshairs]);
          setSelectedCrosshair(crosshairs.length - 1);
          setIsDuplicateModalOpen(false);
        }}
        onRequestClose={() => setIsDuplicateModalOpen(false)}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        name={settings.name}
        onConfirm={() => {
          const x = [...crosshairs];
          x.splice(selectedCrosshair, 1);
          setSelectedCrosshair(selectedCrosshair - 1);
          setCrosshairs([...x]);
          setIsDeleteModalOpen(false);
        }}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      />
      <Tabs settings={settings} tab={tab} onChange={setTab} />
      {/* <button
            onClick={() => {
              updateSettings(
                generateCrosshairFromCode(
                  SAMPLE_CROSSHAIRS[
                    Math.floor(Math.random() * SAMPLE_CROSSHAIRS.length)
                  ]
                )
              );
            }}
          >
            random
          </button> */}

      {/* <BrowsePage /> */}
      <div className="crosshair-bg flex flex-shrink justify-center items-center relative mb-5">
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
        onImportClick={() => {
          setIsImportModalOpen(true);
        }}
        onDuplicateClick={() => {
          setIsDuplicateModalOpen(true);
        }}
        names={crosshairs.map((v) => {
          console.log(v, getNameFromCode(v));
          return getNameFromCode(v);
        })}
        onDeleteClick={() => {
          setIsDeleteModalOpen(true);
        }}
        onCreateNewProfile={() => {
          crosshairs.push(generateCrosshair(DEFAULT_SETTINGS, true));
          setCrosshairs([...crosshairs]);
          setSelectedCrosshair(crosshairs.length - 1);
        }}
        onSelectCrosshair={setSelectedCrosshair}
        selectedCrosshair={selectedCrosshair}
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
            color={'#' + settings.sniper[SniperCenterDotMapping.CUSTOM_COLOR]}
            onChange={(color) => {
              updateSettings((settings) => {
                settings.sniper[SniperCenterDotMapping.CUSTOM_COLOR] = color;
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
  );
}

function App() {
  const [mainTab, setMainTab] = useState(0);

  return (
    <>
      <Navbar selectedTab={mainTab} setSelectedTab={setMainTab} />
      <div className="flex flex-1  justify-center overflow-auto">
        {mainTab === 0 && <CrosshairBuilderPage />}
        {mainTab === 1 && <BrowsePage />}
      </div>
    </>
  );
}

export default App;
