import React, {forwardRef, useImperativeHandle} from "react";
import ReactDOM from 'react-dom'

import "../../style/modal.style.css"

const Modal = (props,ref) => {

    const [display, setDisplay] = React.useState(false)


    const close = ()=>{
        setDisplay(false)
    }

    const open = ()=>{
        setDisplay(true)
    }


    useImperativeHandle(ref, ()=>{
        return{
            closeModal: close,
            openModal: open
        }
    })
    
  return ReactDOM.createPortal(
    <div className={display?"modal-wrapper": " modal-wrapper hidden"}>
        <div onClick={close} className="modal-backdrop"/>
        <div className="modal-box">
            {props.children}
        </div>
    </div>
  , document.getElementById('modal-root'));
};

export default forwardRef( Modal )