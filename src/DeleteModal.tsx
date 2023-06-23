import { useState } from 'react';
import AppModal from './AppModal';
import BigButton from './BigButton';

export default function DeleteModal({
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
      title={<span className="delete-text">Delete Crosshair Profile</span>}
      onRequestClose={onRequestClose}
      noClose
    >
      <div className="flex justify-center">
        <span className="modal-text">
          Are you sure you want to delete {name}?
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
