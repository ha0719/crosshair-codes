import { useEffect, useRef, useState } from 'react';
import { CrosshairSettings, generateCrosshair } from '../codegenerator';

export default function CrosshairProfileRow({
  settings,
  onNameChange,
  onImportClick,
  onDuplicateClick,
  onCreateNewProfile,
  onSelectCrosshair,
  onDeleteClick,
  names,
  selectedCrosshair,
}: {
  settings: CrosshairSettings;
  onNameChange: (value: string) => void;
  onImportClick?: () => void;
  onDuplicateClick?: () => void;
  names: string[];
  selectedCrosshair: number;
  onCreateNewProfile: () => void;
  onSelectCrosshair: (index: number) => void;
  onDeleteClick: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    if (showCopyTooltip) {
      setTimeout(() => setShowCopyTooltip(false), 2000);
    }
  }, [showCopyTooltip]);
  const slots = names.length;
  const maxSlots = 15;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`setting-row flex odd no-hover`}>
      <div className="setting-label flex flex-1 items-center  justify-between ">
        <div className="ml-5">Crosshair Profile</div>
        <div className="crosshair-profile">
          <div className="icon-btn delete" onClick={onDeleteClick}>
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
          <div className="icon-btn" onClick={onDuplicateClick}>
            <span className="material-symbols-outlined">content_copy</span>
            <div className="tool-tip">duplicate profile</div>
          </div>
          <div
            className="icon-btn"
            onClick={() => {
              console.log(input.current === document.activeElement);
              input?.current?.focus();
              console.log(input.current === document.activeElement);
            }}
          >
            <span className="material-symbols-outlined">edit_note</span>
            <div className="tool-tip">edit profile name</div>
          </div>
        </div>
      </div>
      <div className="setting-value flex flex-1 flex-row relative">
        {!isFocused && (
          <div
            className="overlay-for-input "
            onClick={() => setShowDropdown(true)}
          ></div>
        )}
        <div className={`${showDropdown ? '' : 'hidden'}`}>
          <ul className={`profile-dropdown ${showDropdown ? '' : 'hidden'}`}>
            <li
              onClick={() => {
                setShowDropdown(false);
                onCreateNewProfile();
              }}
            >
              Create New Profile (Slots:{slots}/{maxSlots})
            </li>
            {names.map((name, index) => {
              return (
                <li
                  key={'profile-' + index}
                  className={selectedCrosshair === index ? 'active' : ''}
                  onClick={() => {
                    setShowDropdown(false);
                    onSelectCrosshair(index);
                  }}
                >
                  {name}
                </li>
              );
            })}
          </ul>

          <div
            className="overlay-for-dropdown"
            onClick={() => setShowDropdown(false)}
          ></div>
        </div>
        <input
          type="text"
          ref={input}
          value={settings.name}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            onNameChange(e.target.value);
          }}
          className="profile-input"
        />
      </div>
    </div>
  );
}
