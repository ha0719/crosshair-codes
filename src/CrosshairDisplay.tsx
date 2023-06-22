import { PrimarySettings, LineMapping, PrimaryMapping } from './codegenerator';
import { CROSSHAIR_COLORS } from './crosshair';

export function RectWithStroke({
  x,
  y,
  width,
  height,
  strokeWidth,
  opacity,
  strokeOpacity,
  name,
  stroke = true,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth: number;
  opacity?: number;
  strokeOpacity?: number;
  name?: string;
  stroke?: boolean;
}) {
  return (
    <g name={name}>
      {stroke ? (
        <g filter="url(#constantOpacity)">
          <g fill="black" opacity={strokeOpacity} shapeRendering="crispEdges">
            <rect
              x={x - strokeWidth}
              y={y - strokeWidth}
              width={strokeWidth}
              height={height + strokeWidth * 2}
              name="left"
            />
            <rect
              x={x + width}
              y={y - strokeWidth}
              width={strokeWidth}
              height={height + strokeWidth * 2}
              name="right"
            />
            <rect
              x={x}
              y={y - strokeWidth}
              height={strokeWidth}
              width={width}
              name="top"
            />
            <rect
              x={x}
              y={y + height}
              height={strokeWidth}
              width={width}
              name="bottom"
            />
          </g>
        </g>
      ) : null}
      <rect x={x} y={y} width={width} height={height} opacity={opacity} />
    </g>
  );
}

export default function CrosshairDisplay({
  settings,
}: {
  settings: PrimarySettings;
}) {
  const crosshairColor = '#' + settings[PrimaryMapping.CUSTOM_COLOR];
  // const crosshairColor =
  //   settings[PrimaryMapping.CROSSHAIR_COLOR] === 8
  //     ? settings[PrimaryMapping.CUSTOM_COLOR]
  //     : 'pink';
  // : CROSSHAIR_COLORS[settings[PrimaryMapping.CROSSHAIR_COLOR]];

  const strokeWidth = settings[PrimaryMapping.OUTLINE_THICKNESS];

  const inner_line_gap =
    settings.inner_lines[LineMapping.OFFSET] +
    (settings.inner_lines[LineMapping.FIRING_ERROR]
      ? settings[
          PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET
        ]
        ? 0
        : 4
      : 0);
  const outer_line_gap =
    settings.outer_lines[LineMapping.OFFSET] +
    (settings.outer_lines[LineMapping.FIRING_ERROR]
      ? settings[
          PrimaryMapping.OVERRIDE_FIRING_ERROR_OFFSET_WITH_CROSSHAIR_OFFSET
        ]
        ? 0
        : 4
      : 0);
  const inner_line_vertical_y = -(
    settings.inner_lines[LineMapping.THICKNESS] / 2
  );
  const inner_line_left_x =
    -inner_line_gap - settings.inner_lines[LineMapping.LENGTH];
  const inner_line_right_x = inner_line_gap;
  const inner_line_left_y = inner_line_vertical_y;
  const inner_line_right_y = inner_line_vertical_y;

  const inner_line_vertical_length = settings.inner_lines[LineMapping.LENGTH];
  const inner_line_horizontal_length = settings.inner_lines[
    LineMapping.LENGTH_NOT_LINKED
  ]
    ? settings.inner_lines[LineMapping.VERTICAL]
    : inner_line_vertical_length;

  const inner_line_top_y = -inner_line_gap - inner_line_horizontal_length;
  const inner_line_bottom_y = inner_line_gap;

  const inner_line_horizontal_x = -(
    settings.inner_lines[LineMapping.THICKNESS] / 2
  );

  const outer_line_horizontal_x = -(
    settings.outer_lines[LineMapping.THICKNESS] / 2
  );
  const outer_line_left_x =
    -outer_line_gap - settings.outer_lines[LineMapping.LENGTH];
  const outer_line_right_x = outer_line_gap;
  const outer_line_vertical_y = -(
    settings.outer_lines[LineMapping.THICKNESS] / 2
  );
  const outer_line_left_y = outer_line_vertical_y;
  const outer_line_right_y = outer_line_vertical_y;

  const outer_line_bottom_y = outer_line_gap;

  const outer_line_vertical_length = settings.outer_lines[LineMapping.LENGTH];
  const outer_line_horizontal_length = settings.outer_lines[
    LineMapping.LENGTH_NOT_LINKED
  ]
    ? settings.outer_lines[LineMapping.VERTICAL]
    : outer_line_vertical_length;
  const outer_line_top_y = -outer_line_gap - outer_line_horizontal_length;

  const center_dot_offset = Math.floor(
    settings[PrimaryMapping.CENTER_DOT_THICKNESS] / 2
  );

  return (
    <div className="crosshair grid place-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width={200} height={200}>
        <filter id="constantOpacity2">
          <feComponentTransfer>
            <feFuncA
              type="table"
              tableValues={`0 ${settings[PrimaryMapping.OUTLINE_OPACITY]} ${
                settings[PrimaryMapping.OUTLINE_OPACITY]
              }`}
            />
          </feComponentTransfer>
        </filter>
        <g
          style={{ transform: 'translate(50%,50%)' }}
          stroke="black"
          strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
          strokeWidth={0}
          fill={crosshairColor}
          filter='url("#constantOpacity")'
        >
          {settings[PrimaryMapping.CENTER_DOT] ? (
            <RectWithStroke
              x={-center_dot_offset}
              y={-center_dot_offset}
              width={settings[PrimaryMapping.CENTER_DOT_THICKNESS]}
              height={settings[PrimaryMapping.CENTER_DOT_THICKNESS]}
              strokeWidth={strokeWidth}
              opacity={settings[PrimaryMapping.CENTER_DOT_OPACITY]}
              strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
              name="center-dot"
              stroke={settings[PrimaryMapping.OUTLINES]}
            />
          ) : null}
          {settings.inner_lines[LineMapping.SHOW] &&
          settings.inner_lines[LineMapping.THICKNESS] > 0 ? (
            <g name="inner-line">
              <g name="inner-line-vertical">
                <RectWithStroke
                  x={inner_line_left_x}
                  y={inner_line_left_y}
                  width={inner_line_vertical_length}
                  height={settings.inner_lines[LineMapping.THICKNESS]}
                  strokeWidth={strokeWidth}
                  opacity={settings.inner_lines[LineMapping.OPACITY]}
                  strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                  name="inner-line-left"
                  stroke={settings[PrimaryMapping.OUTLINES]}
                />
                <RectWithStroke
                  x={inner_line_right_x}
                  y={inner_line_right_y}
                  width={inner_line_vertical_length}
                  height={settings.inner_lines[LineMapping.THICKNESS]}
                  strokeWidth={strokeWidth}
                  opacity={settings.inner_lines[LineMapping.OPACITY]}
                  strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                  name="inner-line-right"
                  stroke={settings[PrimaryMapping.OUTLINES]}
                />
              </g>
              <g name="inner-line-horizontal">
                <RectWithStroke
                  x={inner_line_horizontal_x}
                  y={inner_line_top_y}
                  width={settings.inner_lines[LineMapping.THICKNESS]}
                  height={inner_line_horizontal_length}
                  strokeWidth={strokeWidth}
                  opacity={settings.inner_lines[LineMapping.OPACITY]}
                  strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                  name="inner-line-top"
                  stroke={settings[PrimaryMapping.OUTLINES]}
                />
                <RectWithStroke
                  x={inner_line_horizontal_x}
                  y={inner_line_bottom_y}
                  width={settings.inner_lines[LineMapping.THICKNESS]}
                  height={inner_line_horizontal_length}
                  strokeWidth={strokeWidth}
                  opacity={settings.inner_lines[LineMapping.OPACITY]}
                  strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                  name="inner-line-bottom"
                  stroke={settings[PrimaryMapping.OUTLINES]}
                />
              </g>
            </g>
          ) : null}

          {settings.outer_lines[LineMapping.SHOW] &&
          settings.outer_lines[LineMapping.THICKNESS] > 0 ? (
            <g name="outer-line">
              <g name="outer-line-vertical">
                <RectWithStroke
                  x={outer_line_left_x}
                  y={outer_line_left_y}
                  width={outer_line_vertical_length}
                  height={settings.outer_lines[LineMapping.THICKNESS]}
                  strokeWidth={strokeWidth}
                  opacity={settings.outer_lines[LineMapping.OPACITY]}
                  strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                  name="outer-line-left"
                  stroke={settings[PrimaryMapping.OUTLINES]}
                />
                <RectWithStroke
                  x={outer_line_right_x}
                  y={outer_line_right_y}
                  width={outer_line_vertical_length}
                  height={settings.outer_lines[LineMapping.THICKNESS]}
                  strokeWidth={strokeWidth}
                  opacity={settings.outer_lines[LineMapping.OPACITY]}
                  strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                  name="outer-line-right"
                  stroke={settings[PrimaryMapping.OUTLINES]}
                />
              </g>
              <g name="outer-line-horizontal">
                <RectWithStroke
                  x={outer_line_horizontal_x}
                  y={outer_line_top_y}
                  width={settings.outer_lines[LineMapping.THICKNESS]}
                  height={outer_line_horizontal_length}
                  strokeWidth={strokeWidth}
                  opacity={settings.outer_lines[LineMapping.OPACITY]}
                  strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                  name="outer-line-top"
                  stroke={settings[PrimaryMapping.OUTLINES]}
                />
                <RectWithStroke
                  x={outer_line_horizontal_x}
                  y={outer_line_bottom_y}
                  width={settings.outer_lines[LineMapping.THICKNESS]}
                  height={outer_line_horizontal_length}
                  strokeWidth={strokeWidth}
                  opacity={settings.outer_lines[LineMapping.OPACITY]}
                  strokeOpacity={settings[PrimaryMapping.OUTLINE_OPACITY]}
                  name="outer-line-bottom"
                  stroke={settings[PrimaryMapping.OUTLINES]}
                />
              </g>
            </g>
          ) : null}
        </g>
      </svg>
    </div>
  );
}
