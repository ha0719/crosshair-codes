import assert from 'assert';
import {
  generateCrosshair,
  PrimaryMapping,
  LineMapping,
  CrosshairSettings,
} from './codegenerator';
import cloneDeep from 'lodash/cloneDeep';

// const DEFAULT_SETTINGS: CrosshairSettings = {
//   [PrimaryMapping.CROSSHAIR_COLOR]: 0,
//   [PrimaryMapping.CUSTOM_COLOR]: 'FFFFFFFF',
//   [PrimaryMapping.OUTLINES]: true,
//   [PrimaryMapping.OUTLINE_OPACITY]: 0.5,
//   [PrimaryMapping.OUTLINE_THICKNESS]: 1,
//   [PrimaryMapping.CENTER_DOT]: false,
//   [PrimaryMapping.CENTER_DOT_OPACITY]: 1,
//   [PrimaryMapping.CENTER_DOT_THICKNESS]: 2,
//   [PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]: false,
//   // override_all_primary_crosshairs_with_my_primary_crosshair: false,

//   inner_lines: {
//     [LineMapping.SHOW]: false,
//     [LineMapping.OPACITY]: 0.8,
//     [LineMapping.LENGTH]: 6,
//     [LineMapping.VERTICAL]: 6,
//     [LineMapping.LENGTH_ISLINKED]: true,
//     [LineMapping.THICKNESS]: 2,
//     [LineMapping.OFFSET]: 3,
//     [LineMapping.MOVEMENT_ERROR]: false,
//     [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: 1,
//     [LineMapping.FIRING_ERROR]: false,
//     [LineMapping.FIRING_ERROR_MULTIPLIER]: 1,
//   },
//   outer_lines: {
//     [LineMapping.SHOW]: false,
//     [LineMapping.OPACITY]: 0.35,
//     [LineMapping.LENGTH]: 2,
//     [LineMapping.VERTICAL]: 2,
//     [LineMapping.LENGTH_ISLINKED]: true,
//     [LineMapping.THICKNESS]: 2,
//     [LineMapping.OFFSET]: 10,
//     [LineMapping.MOVEMENT_ERROR]: true,
//     [LineMapping.MOVEMENT_ERROR_MULTIPLIER]: 1,
//     [LineMapping.FIRING_ERROR]: true,
//     [LineMapping.FIRING_ERROR_MULTIPLIER]: 1,
//   },
// };

// describe('generateCrosshair', function () {
//   it('should return 0 for default', () => {
//     assert(generateCrosshair(DEFAULT_SETTINGS) === '0');
//   });

//   it('crosshair color', () => {
//     let n = cloneDeep(DEFAULT_SETTINGS);
//     n[PrimaryMapping.CROSSHAIR_COLOR] = 1;
//     assert(generateCrosshair(n) === '0;P;c;1');
//   });
// });
// assert generateCrosshair with DEFAULT_SETTINGS value
