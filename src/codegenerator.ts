import isEqual from 'lodash/isEqual';

enum PrimaryMapping {
  CROSSHAIR_COLOR = 'c',
  CUSTOM_COLOR = 'u',
  OUTLINES = 'h',
  OUTLINE_THICKNESS = 't',
  OUTLINE_OPACITY = 'o',
  CENTER_DOT = 'd',
  OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET = 'm',
  CENTER_DOT_THICKNESS = 'z',
  CENTER_DOT_OPACITY = 'a',
}

enum LineMapping {
  SHOW = 'b',
  OPACITY = 'a',
  LENGTH = 'l',
  HEIGHT = 'v',
  LENGTH_ISLINKED = 'g',
  THICKNESS = 't',
  OFFSET = 'o',
  MOVEMENT_ERROR = 'm',
  MOVEMENT_ERROR_MULTIPLIER = 's',
  FIRING_ERROR = 'f',
  FIRING_ERROR_MULTIPLIER = 'e',
}

interface LineSettings {
  [LineMapping.SHOW]: boolean;
  [LineMapping.OPACITY]: number;
  [LineMapping.LENGTH]: number;
  [LineMapping.HEIGHT]: number;
  [LineMapping.LENGTH_ISLINKED]: boolean;
  [LineMapping.THICKNESS]: number;
  [LineMapping.OFFSET]: number;
  [LineMapping.MOVEMENT_ERROR]: boolean;
  [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: number;
  [LineMapping.FIRING_ERROR]: boolean;
  [LineMapping.FIRING_ERROR_MULTIPLIER]: number;
}

// 0;P;o;0.272
// 0;P;o;0.272;d;1;a;0.163
interface CrosshairSettings {
  [PrimaryMapping.CROSSHAIR_COLOR]: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  [PrimaryMapping.CUSTOM_COLOR]?: string;
  [PrimaryMapping.OUTLINES]: boolean;
  [PrimaryMapping.OUTLINE_OPACITY]: number;
  [PrimaryMapping.OUTLINE_THICKNESS]: number;
  [PrimaryMapping.CENTER_DOT]: boolean;
  [PrimaryMapping.CENTER_DOT_OPACITY]: number;
  [PrimaryMapping.CENTER_DOT_THICKNESS]: number;
  [PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]: boolean;
  // override_all_primary_crosshairs_with_my_primary_crosshair: boolean;

  inner_lines: LineSettings;
  outer_lines: LineSettings;
}

const DEFAULT_SETTINGS: CrosshairSettings = {
  [PrimaryMapping.CROSSHAIR_COLOR]: 0,
  [PrimaryMapping.CUSTOM_COLOR]: 'FFFFFFFF',
  [PrimaryMapping.OUTLINES]: true,
  [PrimaryMapping.OUTLINE_OPACITY]: 0.5,
  [PrimaryMapping.OUTLINE_THICKNESS]: 1,
  [PrimaryMapping.CENTER_DOT]: false,
  [PrimaryMapping.CENTER_DOT_OPACITY]: 1,
  [PrimaryMapping.CENTER_DOT_THICKNESS]: 2,
  [PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]: false,
  // override_all_primary_crosshairs_with_my_primary_crosshair: false,

  inner_lines: {
    [LineMapping.SHOW]: false,
    [LineMapping.OPACITY]: 0.8,
    [LineMapping.LENGTH]: 6,
    [LineMapping.HEIGHT]: 6,
    [LineMapping.LENGTH_ISLINKED]: true,
    [LineMapping.THICKNESS]: 2,
    [LineMapping.OFFSET]: 3,
    [LineMapping.MOVEMENT_ERROR]: false,
    [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: 1,
    [LineMapping.FIRING_ERROR]: false,
    [LineMapping.FIRING_ERROR_MULTIPLIER]: 1,
  },
  outer_lines: {
    [LineMapping.SHOW]: false,
    [LineMapping.OPACITY]: 0.35,
    [LineMapping.LENGTH]: 2,
    [LineMapping.HEIGHT]: 2,
    [LineMapping.LENGTH_ISLINKED]: true,
    [LineMapping.THICKNESS]: 2,
    [LineMapping.OFFSET]: 10,
    [LineMapping.MOVEMENT_ERROR]: true,
    [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: 1,
    [LineMapping.FIRING_ERROR]: true,
    [LineMapping.FIRING_ERROR_MULTIPLIER]: 1,
  },
};

export function generateCrosshair(s: CrosshairSettings) {
  if (isEqual(s, DEFAULT_SETTINGS)) {
    return '0';
  }

  let code = '0;';

  if (
    s[PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET] ===
    true
  ) {
    code += 'c;1;';
  }

  // start primary codes
  code += 'P;';

  (function addCrosshairColor() {
    if (
      s[PrimaryMapping.CROSSHAIR_COLOR] !==
      DEFAULT_SETTINGS[PrimaryMapping.CROSSHAIR_COLOR]
    ) {
      appendPrimarySetting(PrimaryMapping.CROSSHAIR_COLOR);

      if (s[PrimaryMapping.CROSSHAIR_COLOR] === 8) {
        if (
          s[PrimaryMapping.CUSTOM_COLOR] !==
          DEFAULT_SETTINGS[PrimaryMapping.CUSTOM_COLOR]
        ) {
          appendPrimarySetting(PrimaryMapping.CUSTOM_COLOR);
        }
        // TODO: put at end ?
        // code += `b;1`
      }
    }
  })();

  (function addOutlineSettings() {
    if (s[PrimaryMapping.OUTLINES] === false) {
      appendPrimarySetting(PrimaryMapping.OUTLINES);
    } else {
      if (
        s[PrimaryMapping.OUTLINE_THICKNESS] !==
        DEFAULT_SETTINGS[PrimaryMapping.OUTLINE_THICKNESS]
      ) {
        // TODO: make sure its full int
        appendPrimarySetting(PrimaryMapping.OUTLINE_THICKNESS);
      }

      if (
        s[PrimaryMapping.OUTLINE_OPACITY] !==
        DEFAULT_SETTINGS[PrimaryMapping.OUTLINE_OPACITY]
      ) {
        // TODO: make sure max 2 float points
        appendPrimarySetting(PrimaryMapping.OUTLINE_OPACITY);
      }
    }
  })();

  (function addCenterDotSettings() {
    if (s[PrimaryMapping.CENTER_DOT] === true) {
      appendPrimarySetting(PrimaryMapping.OUTLINES);
      if (
        s[PrimaryMapping.CENTER_DOT_THICKNESS] !==
        DEFAULT_SETTINGS[PrimaryMapping.CENTER_DOT_THICKNESS]
      ) {
        appendPrimarySetting(PrimaryMapping.CENTER_DOT_THICKNESS);
      }

      if (
        s[PrimaryMapping.CENTER_DOT_OPACITY] !==
        DEFAULT_SETTINGS[PrimaryMapping.CENTER_DOT_OPACITY]
      ) {
        // TODO: 3 digits float
        appendPrimarySetting(PrimaryMapping.CENTER_DOT_OPACITY);
      }
    }
  })();

  function appendPrimarySetting(key: keyof CrosshairSettings) {
    appendSetting(key, s[key]);
  }

  function appendSetting(key: string, value: any) {
    code += `${key};${value};`;
  }

  return code;
}
