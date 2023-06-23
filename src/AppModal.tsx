import { ReactNode } from 'react';
import ModalCloseButton from './ModalCloseButton';
import Modal from 'react-modal';

export default function AppModal(
  props: ReactModal.Props & { title: string | ReactNode; noClose?: boolean }
) {
  return (
    <Modal
      {...props}
      className={'modal-content'}
      overlayClassName={'modal-backdrop'}
    >
      {!props.noClose ? (
        <div className="flex justify-end">
          <ModalCloseButton
            onClick={(event) => props?.onRequestClose?.(event)}
          />
        </div>
      ) : (
        <div className="mt-20"></div>
      )}
      <div className="title mb-8">{props.title}</div>
      {props.children}
    </Modal>
  );
}
