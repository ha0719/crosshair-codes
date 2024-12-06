import CrosshairDisplay from './CrosshairDisplay/CrosshairDisplay';
import { generateCrosshairFromCode } from './codegenerator';
import SAMPLE_CROSSHAIRS from './samplecrosshairs';

export default function Browse() {
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
                  const textArea = document.createElement('textarea');
                  textArea.value = code;
                  document.body.appendChild(textArea);
                  textArea.select();
                  try {
                    document.execCommand('copy');
                  } catch (err) {
                    console.error('Failed to copy', err);
                  }
                  document.body.removeChild(textArea);
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
