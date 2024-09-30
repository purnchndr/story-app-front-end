import style from './Modal.module.css';

function Modal({ children, close, text }) {
  const closeModal = () => {
    close();
  };
  children = children ? children : <h1>No Content</h1>;
  return (
    <div className={style.modalBg}>
      <div className={style.modal}>
        <div className={style.close}>
          <h1>{text || ''}</h1>
          <img
            src='/img/cross.png'
            width='45px'
            alt='close'
            onClick={closeModal}
          />
        </div>
        <div className={style.body}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
