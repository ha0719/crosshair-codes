import { useEffect, useState } from 'react';
import SettingHeader from './SettingHeader';
import SettingRowColor from './SettingRowColor';
import SettingRowBoolean from './SettingRowBoolean';
import SettingRowSlider from './SettingRowSlider';
import { PrimaryMapping, PrimarySettings, labelMap } from '../codegenerator';

export default function BaseSettingsGroup({
  settings: _settings,
  onChange,
}: {
  settings: PrimarySettings;
  onChange: (value: PrimarySettings) => void;
}) {
  const [settings, setSettings] = useState({ ..._settings });

  useEffect(() => {
    onChange(settings);
  }, [settings]);

  return (
    <div className="mb-10">
      <SettingHeader>Crosshair</SettingHeader>
      <SettingRowColor
        settings={settings}
        onChange={(color) => {
          setSettings({
            ...settings,
            [PrimaryMapping.CUSTOM_COLOR]: color,
          });
        }}
      />
      <SettingRowBoolean
        label={labelMap[PrimaryMapping.OUTLINES]}
        value={+settings[PrimaryMapping.OUTLINES] as 0 | 1}
        setting={PrimaryMapping.OUTLINES}
        onChange={(value) => {
          setSettings({
            ...settings,
            [PrimaryMapping.OUTLINES]: !!value,
          });
        }}
      />
      <SettingRowSlider
        label={labelMap[PrimaryMapping.OUTLINE_OPACITY]}
        value={+settings[PrimaryMapping.OUTLINE_OPACITY]}
        setting={PrimaryMapping.OUTLINE_OPACITY}
        onChange={(value) => {
          setSettings({
            ...settings,
            [PrimaryMapping.OUTLINE_OPACITY]: value,
          });
        }}
      />
      <SettingRowSlider
        min={0}
        max={6}
        step={1}
        label={labelMap[PrimaryMapping.OUTLINE_THICKNESS]}
        value={+settings[PrimaryMapping.OUTLINE_THICKNESS]}
        setting={PrimaryMapping.OUTLINE_THICKNESS}
        onChange={(value) => {
          setSettings({
            ...settings,
            [PrimaryMapping.OUTLINE_THICKNESS]: value,
          });
        }}
      />
      <SettingRowBoolean
        label={labelMap[PrimaryMapping.CENTER_DOT]}
        value={+settings[PrimaryMapping.CENTER_DOT] as 0 | 1}
        setting={PrimaryMapping.CENTER_DOT}
        onChange={(value) => {
          setSettings({
            ...settings,
            [PrimaryMapping.CENTER_DOT]: !!value,
          });
        }}
      />

      <SettingRowSlider
        label={labelMap[PrimaryMapping.CENTER_DOT_OPACITY]}
        value={+settings[PrimaryMapping.CENTER_DOT_OPACITY]}
        setting={PrimaryMapping.CENTER_DOT_OPACITY}
        onChange={(value) => {
          setSettings({
            ...settings,
            [PrimaryMapping.CENTER_DOT_OPACITY]: value,
          });
        }}
      />
      <SettingRowSlider
        min={1}
        max={6}
        step={1}
        label={labelMap[PrimaryMapping.CENTER_DOT_THICKNESS]}
        value={+settings[PrimaryMapping.CENTER_DOT_THICKNESS]}
        setting={PrimaryMapping.CENTER_DOT_THICKNESS}
        onChange={(value) => {
          setSettings({
            ...settings,
            [PrimaryMapping.CENTER_DOT_THICKNESS]: value,
          });
        }}
      />
      <SettingRowBoolean
        label={
          labelMap[
            PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET
          ]
        }
        value={
          +settings[
            PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET
          ] as 0 | 1
        }
        setting={
          PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET
        }
        onChange={(value) => {
          setSettings({
            ...settings,
            [PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]:
              !!value,
          });
        }}
      />
      <SettingRowBoolean
        label={'Override All Primary Crosshairs With My Primary Crosshair'}
        value={
          +settings[
            PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET
          ] as 0 | 1
        }
        setting={
          PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET
        }
        onChange={(value) => {
          setSettings({
            ...settings,
            [PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]:
              !!value,
          });
        }}
      />
    </div>
  );
}
