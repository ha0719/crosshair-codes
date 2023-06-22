import SettingRow from './SettingRow';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function SettingRowSlider({
  value,
  onChange = () => {},
  min = 0,
  max = 1,
  step = 0.001,
  label,
}: {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
}) {
  return (
    <SettingRow label={label}>
      <>
        <input
          type="number"
          max={min}
          min={max}
          value={value}
          className="w-32"
          onChange={(e) => onChange(+e.target.value)}
        />
        {/* <div className="flex w-20 items-center justify-center">{value}</div> */}
        <div className="flex flex-1 items-center ml-5 mr-5">
          <Slider
            onChange={(v) => {
              onChange(v as number);
            }}
            min={min}
            max={max}
            step={step}
            value={value}
          />
        </div>
      </>
    </SettingRow>
  );
}
