export default function ModalCloseButton({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className="modal-close-btn" onClick={onClick}>
      <span className="corner top-left"></span>
      <span className="corner top-right"></span>
      <span className="corner bottom-left"></span>
      <span className="corner bottom-right"></span>
      <span className="center"></span>
    </button>
  );
}
