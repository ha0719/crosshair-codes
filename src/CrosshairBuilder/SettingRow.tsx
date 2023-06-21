export default function SettingRow({
  odd,
  children,
  label,
}: {
  odd?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className={`setting-row flex ${odd && 'odd'}`}>
      <div className="setting-label flex flex-1 items-center ml-5">{label}</div>
      <div className="setting-value flex flex-1 flex-row">{children}</div>
    </div>
  );
}
