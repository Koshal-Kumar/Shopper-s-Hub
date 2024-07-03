import React, { useState, useEffect } from "react";

const Spinner = (loader) => {
  const [spinning, setSpinning] = useState(loader);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setSpinning(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {spinning ? (
        <div className="spinner-overlay">
          <div className="spinner-container">
            <div className="spinner">
            {/* <div className="d-flex justify-content-center align-item-center"
      style={{ height : '100%' , width : '100%' }}
      >
        
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Spinner;
