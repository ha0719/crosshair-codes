import { useState } from 'react';
import AppModal from './AppModal';
import BigButton from './BigButton';

export default function ImportModal({
  isOpen = false,
  onRequestClose,
  onConfirm,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: (value: string) => void;
}) {
  const [profileCode, setProfileCode] = useState('');
  return (
    <AppModal
      isOpen={isOpen}
      title="Import Profile"
      onRequestClose={onRequestClose}
    >
      <div className="flex justify-center">
        <textarea
          placeholder={'Paste your profile code here...'}
          value={profileCode}
          onChange={(e) => {
            setProfileCode(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="flex justify-evenly mt-10">
        <BigButton
          disabled={profileCode.length <= 0}
          type="confirm"
          onClick={() => {
            onConfirm(profileCode);
            setProfileCode('');
            // todo: confirmation modal
          }}
        >
          Import
        </BigButton>
        <BigButton onClick={onRequestClose}>Cancel</BigButton>
      </div>
    </AppModal>
  );
}
