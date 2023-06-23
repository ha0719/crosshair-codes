export default function BigButton({
  children,
  type,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  type?: 'confirm';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  return (
    <button disabled={disabled} className={`big-btn ${type}`} onClick={onClick}>
      <span className="corner top-left"></span>
      <span className="corner top-right"></span>
      <span className="corner bottom-left"></span>
      <span className="corner bottom-right"></span>
      <span>{children}</span>
    </button>
  );
}
