import { cloneDeep } from 'lodash';
import isEqual from 'lodash/isEqual';

export enum GeneralMapping {
  OVERRIDE_ALL_PRIMARY_CROSSHAIRS_WITH_PRIMARY_CROSSHAIR = 'c',
}

export enum PrimaryMapping {
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

export enum LineMapping {
  SHOW = 'b',
  OPACITY = 'a',
  LENGTH = 'l',
  VERTICAL = 'v',
  LENGTH_ISLINKED = 'g',
  THICKNESS = 't',
  OFFSET = 'o',
  MOVEMENT_ERROR = 'm',
  MOVEMENT_ERROR_MULTIPLIER = 's',
  FIRING_ERROR = 'f',
  FIRING_ERROR_MULTIPLIER = 'e',
}
export enum SniperCenterDotMapping {
  SHOW,
  CUSTOM_COLOR,
  COLOR,
  THICKNESS,
  OPACITY,
}

export interface LineSettings {
  [LineMapping.SHOW]: boolean;
  [LineMapping.OPACITY]: number;
  [LineMapping.LENGTH]: number;
  [LineMapping.VERTICAL]: number;
  [LineMapping.LENGTH_ISLINKED]: boolean;
  [LineMapping.THICKNESS]: number;
  [LineMapping.OFFSET]: number;
  [LineMapping.MOVEMENT_ERROR]: boolean;
  [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: number;
  [LineMapping.FIRING_ERROR]: boolean;
  [LineMapping.FIRING_ERROR_MULTIPLIER]: number;
}

export const labelMap = {
  [PrimaryMapping.CROSSHAIR_COLOR]: 'Crosshair Color',
  [PrimaryMapping.CUSTOM_COLOR]: 'Custom Color',
  [PrimaryMapping.OUTLINES]: 'Outlines',
  [PrimaryMapping.OUTLINE_OPACITY]: 'Outline Opacity',
  [PrimaryMapping.OUTLINE_THICKNESS]: 'Outline Thickness',
  [PrimaryMapping.CENTER_DOT]: 'Center Dot',
  [PrimaryMapping.CENTER_DOT_OPACITY]: 'Center Dot Opacity',
  [PrimaryMapping.CENTER_DOT_THICKNESS]: 'Center Dot Thickness',
  [PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]:
    'Override Firing Error Offset With Crosshair Offset',
};

export const innerlineLabelMap = {
  [LineMapping.SHOW]: 'Show Inner Lines',
  [LineMapping.OPACITY]: 'Inner Line Opacity',
  [LineMapping.LENGTH]: 'Inner Line Length',
  [LineMapping.VERTICAL]: 'Vertical',
  [LineMapping.LENGTH_ISLINKED]: 'Length Is Linked',
  [LineMapping.THICKNESS]: 'Inner Line Thickness',
  [LineMapping.OFFSET]: 'Inner Line Offset',
  [LineMapping.MOVEMENT_ERROR]: 'Movement Error',
  [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: 'Movement Error Multiplier',
  [LineMapping.FIRING_ERROR]: 'Firing Error',
  [LineMapping.FIRING_ERROR_MULTIPLIER]: 'Firing Error Multiplier',
};

export const outerlineLabelMap = {
  [LineMapping.SHOW]: 'Show Outer Lines',
  [LineMapping.OPACITY]: 'Outer Line Opacity',
  [LineMapping.LENGTH]: 'Outer Line Length',
  [LineMapping.VERTICAL]: 'Vertical',
  [LineMapping.LENGTH_ISLINKED]: 'Length Is Linked',
  [LineMapping.THICKNESS]: 'Outer Line Thickness',
  [LineMapping.OFFSET]: 'Outer Line Offset',
  [LineMapping.MOVEMENT_ERROR]: 'Movement Error',
  [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: 'Movement Error Multiplier',
  [LineMapping.FIRING_ERROR]: 'Firing Error',
  [LineMapping.FIRING_ERROR_MULTIPLIER]: 'Firing Error Multiplier',
};

export interface PrimarySettings {
  [PrimaryMapping.CROSSHAIR_COLOR]: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  [PrimaryMapping.CUSTOM_COLOR]?: string;
  [PrimaryMapping.OUTLINES]: boolean;
  [PrimaryMapping.OUTLINE_OPACITY]: number;
  [PrimaryMapping.OUTLINE_THICKNESS]: number;
  [PrimaryMapping.CENTER_DOT]: boolean;
  [PrimaryMapping.CENTER_DOT_OPACITY]: number;
  [PrimaryMapping.CENTER_DOT_THICKNESS]: number;
  [PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]: boolean;
  inner_lines: LineSettings;
  outer_lines: LineSettings;
}
export interface CrosshairSettings {
  // override_all_primary_crosshairs_with_my_primary_crosshair: boolean;
  primary: PrimarySettings;
  ads: PrimarySettings;
  sniper: {
    [SniperCenterDotMapping.SHOW]: boolean;
    [SniperCenterDotMapping.CUSTOM_COLOR]: string;
    [SniperCenterDotMapping.COLOR]: number;
    [SniperCenterDotMapping.THICKNESS]: number;
    [SniperCenterDotMapping.OPACITY]: number;
  };
}

const DEFAULT_PRIMARY_SETTINGS: PrimarySettings = {
  [PrimaryMapping.CROSSHAIR_COLOR]: 0,
  [PrimaryMapping.CUSTOM_COLOR]: 'FFFFFF',
  [PrimaryMapping.OUTLINES]: true,
  [PrimaryMapping.OUTLINE_OPACITY]: 0.5,
  [PrimaryMapping.OUTLINE_THICKNESS]: 1,
  [PrimaryMapping.CENTER_DOT]: false,
  [PrimaryMapping.CENTER_DOT_OPACITY]: 1,
  [PrimaryMapping.CENTER_DOT_THICKNESS]: 2,
  [PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]: false,
  // override_all_primary_crosshairs_with_my_primary_crosshair: false,

  inner_lines: {
    [LineMapping.SHOW]: true,
    [LineMapping.OPACITY]: 0.8,
    [LineMapping.LENGTH]: 7,
    [LineMapping.VERTICAL]: 6,
    [LineMapping.LENGTH_ISLINKED]: true,
    [LineMapping.THICKNESS]: 2,
    [LineMapping.OFFSET]: 3,
    [LineMapping.MOVEMENT_ERROR]: false,
    [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: 1,
    [LineMapping.FIRING_ERROR]: true,
    [LineMapping.FIRING_ERROR_MULTIPLIER]: 1,
  },
  outer_lines: {
    [LineMapping.SHOW]: true,
    [LineMapping.OPACITY]: 0.35,
    [LineMapping.LENGTH]: 2,
    [LineMapping.VERTICAL]: 2,
    [LineMapping.LENGTH_ISLINKED]: true,
    [LineMapping.THICKNESS]: 2,
    [LineMapping.OFFSET]: 10,
    [LineMapping.MOVEMENT_ERROR]: true,
    [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: 1,
    [LineMapping.FIRING_ERROR]: true,
    [LineMapping.FIRING_ERROR_MULTIPLIER]: 1,
  },
};

export const DEFAULT_SETTINGS: CrosshairSettings = {
  primary: cloneDeep(DEFAULT_PRIMARY_SETTINGS),
  ads: cloneDeep(DEFAULT_PRIMARY_SETTINGS),
  sniper: {
    [SniperCenterDotMapping.SHOW]: true,
    [SniperCenterDotMapping.CUSTOM_COLOR]: 'FF0000FF',
    [SniperCenterDotMapping.COLOR]: 7,
    [SniperCenterDotMapping.THICKNESS]: 1,
    [SniperCenterDotMapping.OPACITY]: 0.8,
  },
};

export function generateCrosshair(s: CrosshairSettings) {
  if (isEqual(s, DEFAULT_SETTINGS)) {
    return '0';
  }

  let code = '0;';

  // if (
  //   s[PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET] ===
  //   true
  // ) {
  //   code += 'c;1;';
  // }

  // start primary codes
  code += 'P;';

  addCrosshairColor('primary');
  addOutlineSettings('primary');
  addCenterDotSettings('primary');

  function addCrosshairColor(x: 'primary' | 'ads') {
    if (
      s[x][PrimaryMapping.CROSSHAIR_COLOR] !==
      DEFAULT_SETTINGS[x][PrimaryMapping.CROSSHAIR_COLOR]
    ) {
      appendPrimarySetting(PrimaryMapping.CROSSHAIR_COLOR);

      if (s[x][PrimaryMapping.CROSSHAIR_COLOR] === 8) {
        if (
          s[x][PrimaryMapping.CUSTOM_COLOR] !==
          DEFAULT_SETTINGS[x][PrimaryMapping.CUSTOM_COLOR]
        ) {
          appendPrimarySetting(PrimaryMapping.CUSTOM_COLOR);
        }
        // TODO: put at end ?
        // code += `b;1`
      }
    }
  }

  function addOutlineSettings(x: 'primary' | 'ads') {
    if (s[x][PrimaryMapping.OUTLINES] === false) {
      appendPrimarySetting(PrimaryMapping.OUTLINES);
    } else {
      if (
        s[x][PrimaryMapping.OUTLINE_THICKNESS] !==
        DEFAULT_SETTINGS[x][PrimaryMapping.OUTLINE_THICKNESS]
      ) {
        // TODO: make sure its full int
        appendPrimarySetting(PrimaryMapping.OUTLINE_THICKNESS);
      }

      if (
        s[x][PrimaryMapping.OUTLINE_OPACITY] !==
        DEFAULT_SETTINGS[x][PrimaryMapping.OUTLINE_OPACITY]
      ) {
        // TODO: make sure max 2 float points
        appendPrimarySetting(PrimaryMapping.OUTLINE_OPACITY);
      }
    }
  }

  function addCenterDotSettings(x: 'primary' | 'ads') {
    if (s[x][PrimaryMapping.CENTER_DOT] === true) {
      appendPrimarySetting(PrimaryMapping.CENTER_DOT);
      if (
        s[x][PrimaryMapping.CENTER_DOT_THICKNESS] !==
        DEFAULT_SETTINGS[x][PrimaryMapping.CENTER_DOT_THICKNESS]
      ) {
        appendPrimarySetting(PrimaryMapping.CENTER_DOT_THICKNESS);
      }

      if (
        s[x][PrimaryMapping.CENTER_DOT_OPACITY] !==
        DEFAULT_SETTINGS[x][PrimaryMapping.CENTER_DOT_OPACITY]
      ) {
        // TODO: 3 digits float
        appendPrimarySetting(PrimaryMapping.CENTER_DOT_OPACITY);
      }
    }
  }

  function appendPrimarySetting(
    key: PrimaryMapping,
    x: 'primary' | 'ads' = 'primary'
  ) {
    const v = s[x][key];
    const value = typeof v === 'boolean' ? +v : v;
    appendSetting(key, value);
  }

  function appendSetting(key: string, value: any) {
    code += `${key};${value};`;
  }

  if (code.endsWith(';')) {
    code = code.slice(0, -1);
  }

  return code;
}
