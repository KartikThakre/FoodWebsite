import classes from './Modal.module.css'
import ReactDom from 'react-dom';
import React from 'react';

const Backdrop = (props) =>{
    return <div className={classes.backdrop} onClick={props.onCloseCart}></div>
};

const ModelOverlay = (props) => {
    return (
    <div className = {classes.modal}>
        <div className = {classes.content}>{props.children}</div>
    </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) =>{
    // React Portal is a first-class way to render child components 
    //  into a DOM node outside of the parent DOM hierarchy defined by the component tree hierarchy.
 return  (
     <React.Fragment>
     {ReactDom.createPortal(<Backdrop onClick={props.onCloseCart}/>, portalElement)}
     {ReactDom.createPortal(<ModelOverlay>{props.children}</ModelOverlay>, portalElement)}
     </React.Fragment>
 )
};
export default Modal;