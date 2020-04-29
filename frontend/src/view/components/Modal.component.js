import React from "react";

import "../style/modal.style.css"

const Modal = (props) => {

    const [display, setDisplay] = React.useState(true)

    const close = ()=>{
        setDisplay(false)
    }

    const open = ()=>{
        setDisplay(true)
    }

  return (
    <div className={display?"modal-wrapper": " modal-wrapper hidden"}>
        <div onClick={close} className="modal-backdrop"/>
        <div className="modal-box">
            {props.children}
        </div>
    </div>
  );
};

export default Modal