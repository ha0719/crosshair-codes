export default function SettingHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`setting-header flex`}>
      <div className="setting-label flex flex-1 pl-1">{children}</div>
    </div>
  );
}
