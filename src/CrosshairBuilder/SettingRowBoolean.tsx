import { useCallback, useId } from 'react';
import SettingRow from './SettingRow';

export default function SettingRowBoolean({
  value,
  onChange = () => {},
  label,
}: {
  value: 0 | 1;
  onChange?: (value: 0 | 1) => void;
  label: string;
}) {
  const id = useId();
  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(e.target.value) as 0 | 1);
    },
    [onChange]
  );

  return (
    <SettingRow label={label}>
      <>
        <label className={`radio ${value === 1 ? 'checked' : ''}`}>
          <input
            name={id}
            checked={value === 1}
            type="radio"
            value="1"
            onChange={_onChange}
          />
          On
        </label>
        <div className="divider ml-0.5 mr-0.5" />

        <label className={`radio ${value === 0 ? 'checked' : ''}`}>
          <input
            name={id}
            checked={value === 0}
            type="radio"
            value="0"
            onChange={_onChange}
          />
          Off
        </label>
      </>
    </SettingRow>
  );
}
