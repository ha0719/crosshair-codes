import CrosshairDisplay from './CrosshairDisplay/CrosshairDisplay';
import { generateCrosshairFromCode } from './codegenerator';
import SAMPLE_CROSSHAIRS from './samplecrosshairs';

export function BrowsePage() {
  return (
    <div className="grid grid-cols-5">
      {SAMPLE_CROSSHAIRS.map((code) => {
        return (
          <div className="crosshair-item" key={code}>
            <div className="crosshair-bg mb-3">
              <CrosshairDisplay
                settings={generateCrosshairFromCode(code).primary}
              />
            </div>
            <div className="flex justify-center">
              <div
                className="icon-btn export"
                onClick={() => {
                  // const code = generateCrosshair(settings);
                  navigator.clipboard.writeText(code);
                  // setShowCopyTooltip(true);
                }}
              >
                <span className="material-symbols-outlined">upload</span>
                {/* <div className={`tool-tip ${showCopyTooltip && 'hidden'}`}>
                  export profile code
                </div> */}
                {/* <div
                  className={`copy tool-tip ${!showCopyTooltip && 'hidden'}`}
                >
                  profile copied to clipboard
                </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
