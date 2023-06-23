import { cloneDeep, isEqual } from 'lodash';
import { CROSSHAIR_COLORS } from './crosshair';

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
  LENGTH_NOT_LINKED = 'g',
  THICKNESS = 't',
  OFFSET = 'o',
  MOVEMENT_ERROR = 'm',
  MOVEMENT_ERROR_MULTIPLIER = 's',
  FIRING_ERROR = 'f',
  FIRING_ERROR_MULTIPLIER = 'e',
}
export enum SniperCenterDotMapping {
  SHOW = 'd',
  CUSTOM_COLOR = 't',
  COLOR = 'c',
  THICKNESS = 's',
  OPACITY = 'o',
}

export interface LineSettings {
  [LineMapping.SHOW]: boolean;
  [LineMapping.OPACITY]: number;
  [LineMapping.LENGTH]: number;
  [LineMapping.VERTICAL]: number;
  [LineMapping.LENGTH_NOT_LINKED]: boolean;
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
  [LineMapping.LENGTH_NOT_LINKED]: 'Length Is Linked',
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
  [LineMapping.LENGTH_NOT_LINKED]: 'Length Is Linked',
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

export interface SniperSettings {
  [SniperCenterDotMapping.SHOW]: boolean;
  [SniperCenterDotMapping.CUSTOM_COLOR]: string;
  [SniperCenterDotMapping.COLOR]: number;
  [SniperCenterDotMapping.THICKNESS]: number;
  [SniperCenterDotMapping.OPACITY]: number;
}
export interface CrosshairSettings {
  name: string;
  override_all_primary_crosshairs_with_my_primary_crosshair: boolean;
  use_advanced_options: boolean;
  fade_crosshair_with_firing_error: boolean;
  primary: PrimarySettings;
  ads: PrimarySettings;
  ads_copy_primary: boolean;
  sniper: SniperSettings;
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
    [LineMapping.LENGTH]: 6,
    [LineMapping.VERTICAL]: 6,
    [LineMapping.LENGTH_NOT_LINKED]: false,
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
    [LineMapping.LENGTH_NOT_LINKED]: false,
    [LineMapping.THICKNESS]: 2,
    [LineMapping.OFFSET]: 10,
    [LineMapping.MOVEMENT_ERROR]: true,
    [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: 1,
    [LineMapping.FIRING_ERROR]: true,
    [LineMapping.FIRING_ERROR_MULTIPLIER]: 1,
  },
};

export const DEFAULT_SETTINGS: CrosshairSettings = {
  name: 'Crosshair Profile',
  fade_crosshair_with_firing_error: true,
  use_advanced_options: false,
  override_all_primary_crosshairs_with_my_primary_crosshair: false,
  primary: cloneDeep(DEFAULT_PRIMARY_SETTINGS),
  ads: cloneDeep(DEFAULT_PRIMARY_SETTINGS),
  ads_copy_primary: true,
  sniper: {
    [SniperCenterDotMapping.SHOW]: true,
    [SniperCenterDotMapping.CUSTOM_COLOR]: 'FF0000',
    [SniperCenterDotMapping.COLOR]: 7,
    [SniperCenterDotMapping.THICKNESS]: 1,
    [SniperCenterDotMapping.OPACITY]: 0.8,
  },
};

export function generateCrosshairFromCode(code: string) {
  const settings: any = cloneDeep(DEFAULT_SETTINGS);
  const parts = code.split(/(P|A|S|NAME);/g);
  console.log(settings);

  if (!!parts.indexOf('P')) {
    // turn primary into key value pairs
    const primary = parts[parts.indexOf('P') + 1].split(';');
    setPrimarySettings('primary', primary);
  }

  if (!!parts.indexOf('A')) {
    const ads = parts[parts.indexOf('A') + 1].split(';');
    setPrimarySettings('ads', ads);
  }
  if (!!parts.indexOf('S')) {
    const sniper = parts[parts.indexOf('S') + 1];
    const sniperSettings = settings.sniper;
    const sniperParts = sniper.split(';');
    for (let i = 0; i < sniperParts.length; i += 2) {
      let key = sniperParts[i];
      let value = sniperParts[i + 1];
      typeCheckThenSet(sniperSettings, key, value);
    }
  }

  if (parts.indexOf('NAME') >= 0) {
    const name = parts[parts.indexOf('NAME') + 1];
    settings.name = name.replace(/^"|"$/g, '');
  }

  function setPrimarySettings(type: 'primary' | 'ads', primaryCode: string[]) {
    const primarySettings = settings[type];
    for (let i = 0; i < primaryCode.length; i += 2) {
      let key = primaryCode[i];
      let value = primaryCode[i + 1];
      if (key.startsWith('0') || key.startsWith('1')) {
        const lineSettings: any =
          primarySettings[key.startsWith('0') ? 'inner_lines' : 'outer_lines'];
        const lineKey = key.slice(1) as keyof LineSettings;
        typeCheckThenSet(lineSettings, lineKey, value);
      } else {
        if (key === PrimaryMapping.CROSSHAIR_COLOR) {
          if (value !== '8') {
            let color = Object.keys(CROSSHAIR_COLORS)[+value].replace('#', '');
            if (color.length === 8) {
              color = color.replace(/FF$/, '');
            }
            typeCheckThenSet(
              primarySettings,
              PrimaryMapping.CUSTOM_COLOR,
              color
            );
          }
        }
        typeCheckThenSet(primarySettings, key, value);
      }
    }
  }

  function typeCheckThenSet(settings: any, key: string, value: any) {
    if (typeof settings[key] === 'boolean') {
      settings[key] = !!+value;
    } else if (typeof settings[key] === 'number') {
      settings[key] = +value;
    } else if (typeof settings[key] === 'string') {
      settings[key] = value;
    }
  }

  return settings;
}

export function generateCrosshair(s: CrosshairSettings, withName = false) {
  if (isEqual(s, DEFAULT_SETTINGS)) {
    if (withName) {
      return '0;NAME;"' + s.name + '"';
    }
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

  if (s.use_advanced_options) {
    code += 's;1;';
    if (!s.ads_copy_primary) {
      code += 'p;0;';
    }
  }

  if (!isEqual(DEFAULT_PRIMARY_SETTINGS, s.primary)) {
    code += 'P;';
  }

  addCrosshairColor('primary');
  addOutlineSettings('primary');
  addCenterDotSettings('primary');
  addLineSettings('primary');
  addLineSettings('primary', true);

  if (s.use_advanced_options && !s.ads_copy_primary) {
    code += 'A;';
    addCrosshairColor('ads');
    addOutlineSettings('ads');
    addCenterDotSettings('ads');
    addLineSettings('ads');
    addLineSettings('ads', true);
  }

  if (s.use_advanced_options && !isEqual(DEFAULT_SETTINGS.sniper, s.sniper)) {
    code += 'S;';
    const sniper = s.sniper;
    if (sniper[SniperCenterDotMapping.SHOW] === true) {
      appendSetting(
        SniperCenterDotMapping.OPACITY,
        sniper[SniperCenterDotMapping.OPACITY]
      );
      appendSetting(
        SniperCenterDotMapping.THICKNESS,
        sniper[SniperCenterDotMapping.THICKNESS]
      );
      const color = '#' + s.sniper[SniperCenterDotMapping.CUSTOM_COLOR];
      if (!!CROSSHAIR_COLORS[color as keyof typeof CROSSHAIR_COLORS]) {
        appendSetting(
          SniperCenterDotMapping.COLOR,
          Object.keys(CROSSHAIR_COLORS).indexOf(color)
        );
      } else {
        appendSetting(SniperCenterDotMapping.COLOR, 8);
        const c = 'sniper[SniperCenterDotMapping.CUSTOM_COLOR]';
        appendSetting(
          SniperCenterDotMapping.CUSTOM_COLOR,
          c.length === 6 ? c + 'FF' : c
        );
      }
    } else {
      appendSetting(SniperCenterDotMapping.SHOW, +false);
    }
  }

  function addLineSettings(x: 'primary' | 'ads', isOuter = false) {
    const prefix = String(+isOuter);
    const lineSettings = s[x][isOuter ? 'outer_lines' : 'inner_lines'];
    const defaultLineSettings =
      DEFAULT_PRIMARY_SETTINGS[isOuter ? 'outer_lines' : 'inner_lines'];

    if (
      lineSettings[LineMapping.SHOW] !== defaultLineSettings[LineMapping.SHOW]
    ) {
      appendSetting(
        (prefix + LineMapping.SHOW) as PrimaryMapping,
        +lineSettings[LineMapping.SHOW]
      );
    } else {
      if (
        lineSettings[LineMapping.THICKNESS] !==
        defaultLineSettings[LineMapping.THICKNESS]
      ) {
        appendSetting(
          (prefix + LineMapping.THICKNESS) as PrimaryMapping,
          lineSettings[LineMapping.THICKNESS]
        );
      }

      if (
        lineSettings[LineMapping.LENGTH] !==
        defaultLineSettings[LineMapping.LENGTH]
      ) {
        appendSetting(
          (prefix + LineMapping.LENGTH) as PrimaryMapping,
          lineSettings[LineMapping.LENGTH]
        );
      }

      if (lineSettings[LineMapping.LENGTH_NOT_LINKED]) {
        appendSetting(
          (prefix + LineMapping.VERTICAL) as PrimaryMapping,
          lineSettings[LineMapping.VERTICAL]
        );
        appendSetting(
          (prefix + LineMapping.LENGTH_NOT_LINKED) as PrimaryMapping,
          +lineSettings[LineMapping.LENGTH_NOT_LINKED]
        );
      }

      if (
        lineSettings[LineMapping.OFFSET] !==
        defaultLineSettings[LineMapping.OFFSET]
      ) {
        appendSetting(
          (prefix + LineMapping.OFFSET) as PrimaryMapping,
          lineSettings[LineMapping.OFFSET]
        );
      }

      if (
        lineSettings[LineMapping.OPACITY] !==
        defaultLineSettings[LineMapping.OPACITY]
      ) {
        appendSetting(
          (prefix + LineMapping.OPACITY) as PrimaryMapping,
          lineSettings[LineMapping.OPACITY]
        );
      }

      if (
        lineSettings[LineMapping.FIRING_ERROR] !==
        defaultLineSettings[LineMapping.FIRING_ERROR]
      ) {
        appendSetting(
          (prefix + LineMapping.FIRING_ERROR) as PrimaryMapping,
          +lineSettings[LineMapping.FIRING_ERROR]
        );
      }

      if (
        lineSettings[LineMapping.FIRING_ERROR] &&
        lineSettings[LineMapping.FIRING_ERROR_MULTIPLIER] !==
          defaultLineSettings[LineMapping.FIRING_ERROR_MULTIPLIER]
      ) {
        appendSetting(
          (prefix + LineMapping.FIRING_ERROR_MULTIPLIER) as PrimaryMapping,
          lineSettings[LineMapping.FIRING_ERROR_MULTIPLIER]
        );
      }

      if (
        lineSettings[LineMapping.MOVEMENT_ERROR] !==
        defaultLineSettings[LineMapping.MOVEMENT_ERROR]
      ) {
        appendSetting(
          (prefix + LineMapping.MOVEMENT_ERROR) as PrimaryMapping,
          +lineSettings[LineMapping.MOVEMENT_ERROR]
        );
        if (lineSettings[LineMapping.MOVEMENT_ERROR]) {
          appendSetting(
            (prefix + LineMapping.MOVEMENT_ERROR_MULTIPLIER) as PrimaryMapping,
            lineSettings[LineMapping.MOVEMENT_ERROR_MULTIPLIER]
          );
        }
      }
    }
  }

  function addCrosshairColor(x: 'primary' | 'ads') {
    const color = '#' + s[x][PrimaryMapping.CUSTOM_COLOR];
    const prefix = x === 'primary' ? '' : '';
    if (!!CROSSHAIR_COLORS[color as keyof typeof CROSSHAIR_COLORS]) {
      if (color !== '#FFFFFF') {
        appendSetting(
          prefix + PrimaryMapping.CROSSHAIR_COLOR,
          Object.keys(CROSSHAIR_COLORS).indexOf(color)
        );
      }
    } else {
      appendSetting(prefix + PrimaryMapping.CROSSHAIR_COLOR, 8);
      const c = s[x][PrimaryMapping.CUSTOM_COLOR] as string;
      appendSetting(
        prefix + PrimaryMapping.CUSTOM_COLOR,
        c.length === 6 ? c + 'FF' : c
      );
    }
  }

  function addOutlineSettings(x: 'primary' | 'ads') {
    if (s[x][PrimaryMapping.OUTLINES] === false) {
      appendPrimarySetting(PrimaryMapping.OUTLINES, x);
    } else {
      if (
        s[x][PrimaryMapping.OUTLINE_THICKNESS] !==
        DEFAULT_SETTINGS[x][PrimaryMapping.OUTLINE_THICKNESS]
      ) {
        // TODO: make sure its full int
        appendPrimarySetting(PrimaryMapping.OUTLINE_THICKNESS, x);
      }

      if (
        s[x][PrimaryMapping.OUTLINE_OPACITY] !==
        DEFAULT_SETTINGS[x][PrimaryMapping.OUTLINE_OPACITY]
      ) {
        // TODO: make sure max 2 float points
        appendPrimarySetting(PrimaryMapping.OUTLINE_OPACITY, x);
      }
    }
  }

  function addCenterDotSettings(x: 'primary' | 'ads') {
    if (s[x][PrimaryMapping.CENTER_DOT] === true) {
      appendPrimarySetting(PrimaryMapping.CENTER_DOT, x);
      if (
        s[x][PrimaryMapping.CENTER_DOT_THICKNESS] !==
        DEFAULT_SETTINGS[x][PrimaryMapping.CENTER_DOT_THICKNESS]
      ) {
        appendPrimarySetting(PrimaryMapping.CENTER_DOT_THICKNESS, x);
      }

      if (
        s[x][PrimaryMapping.CENTER_DOT_OPACITY] !==
        DEFAULT_SETTINGS[x][PrimaryMapping.CENTER_DOT_OPACITY]
      ) {
        // TODO: 3 digits float
        appendPrimarySetting(PrimaryMapping.CENTER_DOT_OPACITY, x);
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

  if (withName) {
    code += 'NAME;"' + s.name + '"';
  }

  if (code.endsWith(';')) {
    code = code.slice(0, -1);
  }

  return code;
}
