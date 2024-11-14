import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide, note }) => 
  isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-overlay" onClick={hide}/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          {note && (
            <div className="modal-content">
              <h2 className="text-lg font-bold">{note.title}</h2>
              <p className="text-gray-500 mb-2">Ngày: 7/11/2024</p>
              <p className="text-gray-700">{note.content}</p>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;

export default Modal;
