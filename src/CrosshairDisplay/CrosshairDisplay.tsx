import { PrimarySettings, LineMapping, PrimaryMapping } from '../codegenerator';
import CrosshairCanvas from './CrosshairCanvas';
// import CrosshairSVG from './CrosshairSVG';

function adjustPx(n: number) {
  return n;
  // return Math.floor(n);
}

export default function CrosshairDisplay({
  settings,
}: {
  settings: PrimarySettings;
}) {
  const CROSSHAIR_HEX_COLOR = '#' + settings[PrimaryMapping.CUSTOM_COLOR];
  const STROKE_WIDTH = settings[PrimaryMapping.OUTLINE_THICKNESS];

  function calculateGap(
    offset: number,
    firing_error: boolean,
    override_firing_error_offset: boolean
  ) {
    const FIXED_GAP = 4;
    let result = 0;
    if (firing_error) {
      if (!override_firing_error_offset) {
        result = FIXED_GAP;
      }
    }
    return result + offset;
  }
  const INNER_LINE_GAP = calculateGap(
    settings.inner_lines[LineMapping.OFFSET],
    settings.inner_lines[LineMapping.FIRING_ERROR],
    settings[PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]
  );
  const OUTER_LINE_GAP = calculateGap(
    settings.outer_lines[LineMapping.OFFSET],
    settings.outer_lines[LineMapping.FIRING_ERROR],
    settings[PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET]
  );

  const INNER_LINE_VERTICAL_Y = adjustPx(
    -(settings.inner_lines[LineMapping.THICKNESS] / 2)
  );

  const INNER_LINE_VERTICAL_LENGTH = settings.inner_lines[LineMapping.LENGTH];
  const INNER_LINE_HORIZONTAL_LENGTH = settings.inner_lines[
    LineMapping.LENGTH_NOT_LINKED
  ]
    ? settings.inner_lines[LineMapping.VERTICAL]
    : INNER_LINE_VERTICAL_LENGTH;

  const INNER_LINE_TOP_Y = -INNER_LINE_GAP - INNER_LINE_HORIZONTAL_LENGTH;
  const INNER_LINE_BOTTOM_Y = INNER_LINE_GAP;

  const inner_line_horizontal_x = adjustPx(
    -(settings.inner_lines[LineMapping.THICKNESS] / 2)
  );

  const outer_line_horizontal_x = adjustPx(
    -(settings.outer_lines[LineMapping.THICKNESS] / 2)
  );
  const outer_line_left_x =
    -OUTER_LINE_GAP - settings.outer_lines[LineMapping.LENGTH];
  const outer_line_right_x = OUTER_LINE_GAP;
  const outer_line_vertical_y = adjustPx(
    -(settings.outer_lines[LineMapping.THICKNESS] / 2)
  );
  const outer_line_left_y = outer_line_vertical_y;
  const outer_line_right_y = outer_line_vertical_y;

  const outer_line_bottom_y = OUTER_LINE_GAP;

  const outer_line_vertical_length = settings.outer_lines[LineMapping.LENGTH];
  const outer_line_horizontal_length = settings.outer_lines[
    LineMapping.LENGTH_NOT_LINKED
  ]
    ? settings.outer_lines[LineMapping.VERTICAL]
    : outer_line_vertical_length;
  const outer_line_top_y = -OUTER_LINE_GAP - outer_line_horizontal_length;

  const center_dot_offset = adjustPx(
    settings[PrimaryMapping.CENTER_DOT_THICKNESS] / 2
  );

  const INNER_LINE_LEFT_X =
    -INNER_LINE_GAP - settings.inner_lines[LineMapping.LENGTH];
  const INNER_LINE_LEFT_Y = INNER_LINE_VERTICAL_Y;
  const INNER_LINE_RIGHT_X = INNER_LINE_GAP;
  const INNER_LINE_RIGHT_Y = INNER_LINE_VERTICAL_Y;

  return (
    <div className="crosshair grid place-items-center">
      <CrosshairCanvas
        settings={settings}
        crosshairColor={CROSSHAIR_HEX_COLOR}
        center_dot_offset={center_dot_offset}
        strokeWidth={STROKE_WIDTH}
        inner_line_left_x={INNER_LINE_LEFT_X}
        inner_line_right_x={INNER_LINE_RIGHT_X}
        inner_line_left_y={INNER_LINE_LEFT_Y}
        inner_line_right_y={INNER_LINE_RIGHT_Y}
        inner_line_vertical_length={INNER_LINE_VERTICAL_LENGTH}
        inner_line_horizontal_length={INNER_LINE_HORIZONTAL_LENGTH}
        inner_line_top_y={INNER_LINE_TOP_Y}
        inner_line_bottom_y={INNER_LINE_BOTTOM_Y}
        inner_line_horizontal_x={inner_line_horizontal_x}
        outer_line_left_x={outer_line_left_x}
        outer_line_right_x={outer_line_right_x}
        outer_line_left_y={outer_line_left_y}
        outer_line_right_y={outer_line_right_y}
        outer_line_bottom_y={outer_line_bottom_y}
        outer_line_vertical_length={outer_line_vertical_length}
        outer_line_horizontal_length={outer_line_horizontal_length}
        outer_line_top_y={outer_line_top_y}
        outer_line_horizontal_x={outer_line_horizontal_x}
      />
      {/* <CrosshairSVG
        settings={settings}
        crosshairColor={CROSSHAIR_HEX_COLOR}
        center_dot_offset={center_dot_offset}
        strokeWidth={STROKE_WIDTH}
        inner_line_left_x={INNER_LINE_LEFT_X}
        inner_line_right_x={INNER_LINE_RIGHT_X}
        inner_line_left_y={INNER_LINE_LEFT_Y}
        inner_line_right_y={INNER_LINE_RIGHT_Y}
        inner_line_vertical_length={INNER_LINE_VERTICAL_LENGTH}
        inner_line_horizontal_length={INNER_LINE_HORIZONTAL_LENGTH}
        inner_line_top_y={INNER_LINE_TOP_Y}
        inner_line_bottom_y={INNER_LINE_BOTTOM_Y}
        inner_line_horizontal_x={inner_line_horizontal_x}
        outer_line_left_x={outer_line_left_x}
        outer_line_right_x={outer_line_right_x}
        outer_line_left_y={outer_line_left_y}
        outer_line_right_y={outer_line_right_y}
        outer_line_bottom_y={outer_line_bottom_y}
        outer_line_vertical_length={outer_line_vertical_length}
        outer_line_horizontal_length={outer_line_horizontal_length}
        outer_line_top_y={outer_line_top_y}
        outer_line_horizontal_x={outer_line_horizontal_x}
      /> */}
    </div>
  );
}
