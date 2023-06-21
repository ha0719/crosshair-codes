import { useEffect, useState } from 'react';
import {
  LineMapping,
  LineSettings,
  innerlineLabelMap,
  outerlineLabelMap,
} from '../codegenerator';
import SettingHeader from './SettingHeader';
import SettingRowBoolean from './SettingRowBoolean';
import SettingRowSlider from './SettingRowSlider';

export default function LineSettingsGroup({
  lineSettings,
  label,
  onChange,
}: {
  lineSettings: LineSettings;
  label: string;
  onChange: (value: LineSettings) => void;
}) {
  const [settings, setSettings] = useState({ ...lineSettings });
  const labelMap =
    label === 'Inner Lines' ? innerlineLabelMap : outerlineLabelMap;

  useEffect(() => {
    onChange(settings);
  }, [settings]);
  return (
    <div className="mb-10">
      <SettingHeader>{label}</SettingHeader>

      <SettingRowBoolean
        label={labelMap[LineMapping.SHOW]}
        value={+settings[LineMapping.SHOW] as 0 | 1}
        setting={LineMapping.SHOW}
        onChange={(value) => {
          setSettings({ ...settings, [LineMapping.SHOW]: !!value });
        }}
      />

      <SettingRowSlider
        label={labelMap[LineMapping.OPACITY]}
        value={+settings[LineMapping.OPACITY]}
        setting={LineMapping.OPACITY}
        onChange={(value) => {
          setSettings({
            ...settings,
            [LineMapping.OPACITY]: value,
          });
        }}
      />
      <SettingRowSlider
        label={labelMap[LineMapping.LENGTH]}
        value={+settings[LineMapping.LENGTH]}
        setting={LineMapping.LENGTH}
        step={1}
        max={20}
        onChange={(value) => {
          setSettings({
            ...settings,
            [LineMapping.LENGTH]: value,
          });
        }}
      />
      <SettingRowSlider
        label={labelMap[LineMapping.THICKNESS]}
        value={+settings[LineMapping.THICKNESS]}
        setting={LineMapping.THICKNESS}
        step={1}
        max={10}
        onChange={(value) => {
          setSettings({
            ...settings,
            [LineMapping.THICKNESS]: value,
          });
        }}
      />
      <SettingRowSlider
        label={labelMap[LineMapping.OFFSET]}
        value={+settings[LineMapping.OFFSET]}
        setting={LineMapping.OFFSET}
        step={1}
        max={20}
        onChange={(value) => {
          setSettings({
            ...settings,
            [LineMapping.OFFSET]: value,
          });
        }}
      />
      <SettingRowBoolean
        label={labelMap[LineMapping.FIRING_ERROR]}
        value={+settings[LineMapping.FIRING_ERROR] as 0 | 1}
        setting={LineMapping.FIRING_ERROR}
        onChange={(value) => {
          setSettings({ ...settings, [LineMapping.FIRING_ERROR]: !!value });
        }}
      />
      <SettingRowSlider
        label={labelMap[LineMapping.FIRING_ERROR_MULTIPLIER]}
        value={+settings[LineMapping.FIRING_ERROR_MULTIPLIER]}
        setting={LineMapping.FIRING_ERROR_MULTIPLIER}
        max={3}
        onChange={(value) => {
          setSettings({
            ...settings,
            [LineMapping.FIRING_ERROR_MULTIPLIER]: value,
          });
        }}
      />
      <SettingRowBoolean
        label={labelMap[LineMapping.MOVEMENT_ERROR]}
        value={+settings[LineMapping.MOVEMENT_ERROR] as 0 | 1}
        setting={LineMapping.MOVEMENT_ERROR}
        onChange={(value) => {
          setSettings({ ...settings, [LineMapping.MOVEMENT_ERROR]: !!value });
        }}
      />

      <SettingRowSlider
        label={labelMap[LineMapping.MOVEMENT_ERROR_MULTIPLIER]}
        value={+settings[LineMapping.MOVEMENT_ERROR_MULTIPLIER]}
        setting={LineMapping.MOVEMENT_ERROR_MULTIPLIER}
        max={3}
        onChange={(value) => {
          setSettings({
            ...settings,
            [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: value,
          });
        }}
      />
    </div>
  );
}
