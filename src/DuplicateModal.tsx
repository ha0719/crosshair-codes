import AppModal from './AppModal';
import BigButton from './BigButton';

export default function DuplicateModal({
  isOpen = false,
  onRequestClose,
  onConfirm,
  name,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  name: string;
}) {
  return (
    <AppModal
      isOpen={isOpen}
      title={<span className="duplicate-text">Duplicate Profile</span>}
      onRequestClose={onRequestClose}
      noClose
    >
      <div className="flex justify-center">
        <span className="modal-text">
          Are you ure you want to duplicate {name}?
        </span>
      </div>
      <div className="flex justify-evenly mt-10">
        <BigButton type="confirm" onClick={onConfirm}>
          Confirm
        </BigButton>
        <BigButton onClick={onRequestClose}>Cancel</BigButton>
      </div>
    </AppModal>
  );
}
