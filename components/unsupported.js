// components/UnsupportedRegionModal.jsx
import React from 'react';

const UnsupportedRegionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Region Not Supported</h2>
        <br />
        <p>Unfortunately, our service is not available in your region.</p>
        <button className='button' onClick={onClose}>Close</button>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          color: lightgray;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          max-width: 400px;
        }
        button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
        }
      `}</style>
    </div>
  );
};

export default UnsupportedRegionModal;
