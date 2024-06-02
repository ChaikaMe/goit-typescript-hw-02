import Modal from 'react-modal';
import css from './ImageModal.module.css';
Modal.setAppElement('#root');

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    width: '80%',
    height: '80%',
  },
};

interface ImageModalProps {
  modalState: boolean;
  modalImage: {
    urls: {
      regular: string;
    };
    alt_description: string;
  };
  onModalClose: () => void;
}

export default function ImageModal({
  modalState,
  modalImage,
  onModalClose,
}: ImageModalProps) {
  if (modalImage === undefined) {
    return null;
  }
  return (
    <Modal
      isOpen={modalState}
      onRequestClose={onModalClose}
      style={modalStyles}
    >
      <img
        className={css.image}
        src={modalImage.urls.regular}
        alt={modalImage.alt_description}
      />
    </Modal>
  );
}
