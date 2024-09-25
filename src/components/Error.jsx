import React from "react";

const Error = ({ message, rety }) => {
  return (
    <div className="error">
      <p>Üzgünüz verilere erişirken bir hata oluştu</p>
      <p className="text">{message}</p>
      <button onClick={rety} className="button">
        <span>Tekrar dene</span>
      </button>
    </div>
  );
};

export default Error;
