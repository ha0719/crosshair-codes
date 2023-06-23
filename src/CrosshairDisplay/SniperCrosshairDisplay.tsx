import { SniperCenterDotMapping, SniperSettings } from '../codegenerator';

export default function SniperCrosshairDisplay({
  settings,
}: {
  settings: SniperSettings;
}) {
  return (
    <>
      <div className="crosshair grid place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width={200} height={200}>
          {settings[SniperCenterDotMapping.SHOW] && (
            <circle
              fill={'#' + settings[SniperCenterDotMapping.CUSTOM_COLOR]}
              r={settings[SniperCenterDotMapping.THICKNESS] * 4}
              opacity={settings[SniperCenterDotMapping.OPACITY]}
              cx={'50%'}
              cy={'50%'}
            />
          )}
        </svg>
      </div>
    </>
  );
}
