import SettingHeader from './SettingHeader';
import SettingRowColor from './SettingRowColor';
import SettingRowBoolean from './SettingRowBoolean';
import SettingRowSlider from './SettingRowSlider';
import { PrimaryMapping, PrimarySettings, labelMap } from '../codegenerator';

export default function BaseSettingsGroup({
  settings,
  onChange,
}: {
  settings: PrimarySettings;
  onChange: (value: PrimarySettings) => void;
}) {
  return (
    <div className="mb-10">
      <SettingHeader>Crosshair</SettingHeader>
      <SettingRowColor
        color={`#${settings[PrimaryMapping.CUSTOM_COLOR]}`}
        onChange={(color) => {
          onChange({
            ...settings,
            [PrimaryMapping.CUSTOM_COLOR]: color,
          });
        }}
      />
      <SettingRowBoolean
        label={labelMap[PrimaryMapping.OUTLINES]}
        value={+settings[PrimaryMapping.OUTLINES] as 0 | 1}
        onChange={(value) => {
          onChange({
            ...settings,
            [PrimaryMapping.OUTLINES]: !!value,
          });
        }}
      />
      <SettingRowSlider
        label={labelMap[PrimaryMapping.OUTLINE_OPACITY]}
        value={+settings[PrimaryMapping.OUTLINE_OPACITY]}
        onChange={(value) => {
          onChange({
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
        onChange={(value) => {
          onChange({
            ...settings,
            [PrimaryMapping.OUTLINE_THICKNESS]: value,
          });
        }}
      />
      <SettingRowBoolean
        label={labelMap[PrimaryMapping.CENTER_DOT]}
        value={+settings[PrimaryMapping.CENTER_DOT] as 0 | 1}
        onChange={(value) => {
          onChange({
            ...settings,
            [PrimaryMapping.CENTER_DOT]: !!value,
          });
        }}
      />

      <SettingRowSlider
        label={labelMap[PrimaryMapping.CENTER_DOT_OPACITY]}
        value={+settings[PrimaryMapping.CENTER_DOT_OPACITY]}
        onChange={(value) => {
          onChange({
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
        onChange={(value) => {
          onChange({
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
        onChange={(value) => {
          onChange({
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
        onChange={(value) => {
          onChange({
            ...settings,
            [PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]:
              !!value,
          });
        }}
      />
    </div>
  );
}
