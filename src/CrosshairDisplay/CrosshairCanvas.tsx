import { Circle, Group, Stage, Rect, Layer } from 'react-konva';
import Konva from 'konva';
import { PrimarySettings, LineMapping, PrimaryMapping } from '../codegenerator';

// function Group({ children, name, ...props }: any) {
//   return children;
// }

function RectWithStroke({
  x,
  y,
  width,
  height,
  strokeWidth,
  opacity,
  strokeOpacity,
  name,
  stroke = true,
  fill,
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
  fill: string;
}) {
  return (
    <Group name={name}>
      {stroke ? (
        <Group filter="url(#constantOpacity)">
          <Group opacity={strokeOpacity}>
            <Rect
              x={x - strokeWidth}
              y={y - strokeWidth}
              width={strokeWidth}
              height={height + strokeWidth * 2}
              name="left"
              fill="black"
            />
            <Rect
              x={x + width}
              y={y - strokeWidth}
              width={strokeWidth}
              height={height + strokeWidth * 2}
              name="right"
              fill="black"
            />
            <Rect
              x={x}
              y={y - strokeWidth}
              height={strokeWidth}
              width={width}
              name="top"
              fill="black"
            />
            <Rect
              x={x}
              y={y + height}
              height={strokeWidth}
              width={width}
              name="bottom"
              fill="black"
            />
          </Group>
        </Group>
      ) : null}
      <Rect
        fill={fill}
        x={x}
        y={y}
        width={width}
        height={height}
        opacity={opacity}
      />
    </Group>
  );
}

export default function CrosshairCanvas({
  settings,
  crosshairColor,
  center_dot_offset,
  strokeWidth,
  inner_line_left_x,
  inner_line_right_x,
  inner_line_left_y,
  inner_line_right_y,
  inner_line_vertical_length,
  inner_line_horizontal_length,
  inner_line_top_y,
  inner_line_bottom_y,
  inner_line_horizontal_x,
  outer_line_left_x,
  outer_line_right_x,
  outer_line_left_y,
  outer_line_right_y,
  outer_line_vertical_length,
  outer_line_horizontal_length,
  outer_line_top_y,
  outer_line_bottom_y,
  outer_line_horizontal_x,
}: {
  settings: any;
  crosshairColor: string;
  center_dot_offset: number;
  strokeWidth: number;
  inner_line_left_x: number;
  inner_line_right_x: number;
  inner_line_left_y: number;
  inner_line_right_y: number;
  inner_line_vertical_length: number;
  inner_line_horizontal_length: number;
  inner_line_top_y: number;
  inner_line_bottom_y: number;
  inner_line_horizontal_x: number;
  outer_line_left_x: number;
  outer_line_right_x: number;
  outer_line_left_y: number;
  outer_line_right_y: number;
  outer_line_bottom_y: number;
  outer_line_vertical_length: number;
  outer_line_horizontal_length: number;
  outer_line_top_y: number;
  outer_line_horizontal_x: number;
}) {
  const scale = 1.3;
  return (
    <Stage
      scaleY={scale}
      scaleX={scale}
      width={200}
      height={200}
      style={{ imageRendering: 'crisp-edges' }}
    >
      <Layer>
        <Group x={100 / scale} y={100 / scale}>
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
              fill={crosshairColor}
            />
          ) : null}
          {settings.inner_lines[LineMapping.SHOW] &&
          settings.inner_lines[LineMapping.THICKNESS] > 0 ? (
            <Group name="inner-line">
              <Group name="inner-line-vertical">
                {inner_line_vertical_length > 0 ? (
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
                    fill={crosshairColor}
                  />
                ) : null}
                {inner_line_vertical_length > 0 ? (
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
                    fill={crosshairColor}
                  />
                ) : null}
              </Group>
              <Group name="inner-line-horizontal">
                {inner_line_horizontal_length > 0 ? (
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
                    fill={crosshairColor}
                  />
                ) : null}
                {inner_line_horizontal_length > 0 ? (
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
                    fill={crosshairColor}
                  />
                ) : null}
              </Group>
            </Group>
          ) : null}

          {settings.outer_lines[LineMapping.SHOW] &&
          settings.outer_lines[LineMapping.THICKNESS] > 0 ? (
            <Group name="outer-line">
              <Group name="outer-line-vertical">
                {outer_line_vertical_length > 0 ? (
                  <RectWithStroke
                    fill={crosshairColor}
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
                ) : null}
                {outer_line_vertical_length > 0 ? (
                  <RectWithStroke
                    fill={crosshairColor}
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
                ) : null}
              </Group>
              <Group name="outer-line-horizontal">
                {outer_line_horizontal_length > 0 ? (
                  <RectWithStroke
                    fill={crosshairColor}
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
                ) : null}

                {outer_line_horizontal_length > 0 ? (
                  <RectWithStroke
                    fill={crosshairColor}
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
                ) : null}
              </Group>
            </Group>
          ) : null}
        </Group>
      </Layer>
    </Stage>
  );
}
