import SettingRow from './SettingRow';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function SettingRowLineSlider({
  value,
  onChange = () => {},
  label,
}: {
  value: { length: number; vertical: number; linked: boolean };
  onChange?: (value: {
    length: number;
    vertical: number;
    linked: boolean;
  }) => void;
  step?: number;
  label: string;
}) {
  const min = 0;
  const max = 20;
  const step = 1;
  const { linked } = value;

  return (
    <SettingRow label={label}>
      <>
        <div className="w-32 flex justify-evenly">
          <input
            type="number"
            max={min}
            min={max}
            value={value.length}
            step={1}
            onChange={(e) =>
              onChange({ ...value, length: Number(e.target.value) })
            }
          />
          <input
            type="number"
            max={min}
            min={max}
            step={1}
            value={linked ? value.length : value.vertical}
            onChange={(e) =>
              onChange({ ...value, vertical: Number(e.target.value) })
            }
            style={
              linked
                ? {
                    color: 'gray',
                  }
                : {}
            }
          />
        </div>
        {/* <div className="flex w-20 items-center justify-center">{value}</div> */}
        <div className="flex flex-1 items-center ml-5 mr-5">
          <Slider
            onChange={(v) => {
              onChange({ ...value, length: v as number });
            }}
            min={min}
            max={max}
            step={step}
            value={value.length}
          />
          <div className="link-btn">
            <a
              href="#"
              onClick={() => {
                onChange({ ...value, linked: !linked });
              }}
            >
              <img
                src={
                  linked ? require('../linked.png') : require('../unlinked.png')
                }
                style={{ display: 'inline-block' }}
                width={24}
                alt="link"
              />
            </a>
          </div>
          <Slider
            onChange={(v) => {
              onChange({ ...value, linked, vertical: v as number });
            }}
            min={min}
            max={max}
            step={step}
            value={linked ? value.length : value.vertical}
            disabled={linked}
          />
        </div>
      </>
    </SettingRow>
  );
}
