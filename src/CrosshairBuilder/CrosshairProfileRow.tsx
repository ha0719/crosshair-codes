import { useEffect, useRef, useState } from 'react';
import { CrosshairSettings, generateCrosshair } from '../codegenerator';

export default function CrosshairProfileRow({
  settings,
  onNameChange,
  onImportClick,
}: {
  settings: CrosshairSettings;
  onNameChange: (value: string) => void;
  onImportClick?: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  useEffect(() => {
    if (showCopyTooltip) {
      setTimeout(() => setShowCopyTooltip(false), 2000);
    }
  }, [showCopyTooltip]);
  return (
    <div className={`setting-row flex odd no-hover`}>
      <div className="setting-label flex flex-1 items-center  justify-between ">
        <div className="ml-5">Crosshair Profile</div>
        <div className="crosshair-profile">
          <div className="icon-btn delete">
            <span className="material-symbols-outlined">delete</span>
            <div className="tool-tip">delete crosshair profile</div>
          </div>
          <div className="separator"></div>
          <div
            className="icon-btn export"
            onClick={() => {
              const code = generateCrosshair(settings);
              navigator.clipboard.writeText(code);
              setShowCopyTooltip(true);
            }}
          >
            <span className="material-symbols-outlined">upload</span>
            <div className={`tool-tip ${showCopyTooltip && 'hidden'}`}>
              export profile code
            </div>
            <div className={`copy tool-tip ${!showCopyTooltip && 'hidden'}`}>
              profile copied to clipboard
            </div>
          </div>
          <div className="icon-btn import" onClick={onImportClick}>
            <span className="material-symbols-outlined">download</span>
            <div className="tool-tip">import profile code</div>
          </div>
          <div className="icon-btn">
            <span className="material-symbols-outlined">content_copy</span>
            <div className="tool-tip">duplicate profile</div>
          </div>
          <div
            className="icon-btn"
            onClick={() => {
              input?.current?.focus();
            }}
          >
            <span className="material-symbols-outlined">edit_note</span>
            <div className="tool-tip">edit profile name</div>
          </div>
        </div>
      </div>
      <div className="setting-value flex flex-1 flex-row">
        <input
          type="text"
          ref={input}
          value={settings.name}
          onChange={(e) => {
            onNameChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
