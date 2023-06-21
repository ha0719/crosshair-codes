import { useState } from 'react';
import { PrimaryMapping, PrimarySettings } from '../codegenerator';
import SettingRow from './SettingRow';
import { SketchPicker } from 'react-color';
import { CROSSHAIR_COLORS, PresetColors } from '../crosshair';

export default function SettingRowColor({
  settings,
  onChange,
}: {
  settings: PrimarySettings;
  onChange: (color: string) => void;
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const handleChange = (color: any) => {
    onChange(color.hex.replace('#', '').toUpperCase());
  };

  return (
    <SettingRow label="Crosshair Color">
      <div className="flex flex-1">
        <div className="flex flex-1 relative">
          {showColorPicker ? (
            <div className="color-picker-tooltip">
              <div
                className="cover"
                onClick={() => {
                  setShowColorPicker(false);
                }}
              ></div>
              <SketchPicker
                presetColors={Object.keys(CROSSHAIR_COLORS).map((c) => c)}
                color={`#${settings[PrimaryMapping.CUSTOM_COLOR]}`}
                onChange={handleChange}
              />
            </div>
          ) : null}
          <div
            className="color-display w-20"
            onClick={() => {
              setShowColorPicker(true);
            }}
            style={{
              backgroundColor: `#${settings[PrimaryMapping.CUSTOM_COLOR]}`,
            }}
          ></div>
          <div
            className="color-text-display"
            onClick={() => {
              setShowColorPicker(true);
            }}
          >
            <input
              type="text"
              style={{ textTransform: 'uppercase' }}
              value={`#${settings[PrimaryMapping.CUSTOM_COLOR]}`}
            />
          </div>
        </div>
        <div className="flex flex-1 relative">
          <div
            className="selected-color"
            onClick={() => {
              setShowColorDropdown(true);
            }}
          >
            {CROSSHAIR_COLORS[
              ('#' +
                settings[
                  PrimaryMapping.CUSTOM_COLOR
                ]?.toUpperCase()) as PresetColors
            ]
              ? CROSSHAIR_COLORS[
                  ('#' +
                    settings[
                      PrimaryMapping.CUSTOM_COLOR
                    ]?.toUpperCase()) as PresetColors
                ]
              : 'Custom'}
          </div>

          <ul className={`color-dropdown ${showColorDropdown ? 'open' : ''}`}>
            <div
              className="cover"
              onClick={() => setShowColorDropdown(false)}
            ></div>
            {Object.keys(CROSSHAIR_COLORS).map((key) => (
              <li
                key={key}
                onClick={() => {
                  onChange(key.replace('#', ''));
                }}
              >
                <span className="mini-color" style={{ backgroundColor: key }} />
                {CROSSHAIR_COLORS[key as PresetColors]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SettingRow>
  );
}
