export default function SettingRow({
  odd,
  children,
  label,
  noHover = false,
}: {
  odd?: boolean;
  children: React.ReactNode;
  label: string;
  noHover?: boolean;
}) {
  return (
    <div
      className={`setting-row flex flex-col lg:flex-row ${odd && 'odd'} ${
        noHover && 'no-hover'
      }`}
    >
      <div className="setting-label flex flex-1 items-center ">
        <div className="ml-5">{label}</div>
      </div>
      <div className="setting-value flex flex-1 flex-row">{children}</div>
    </div>
  );
}
