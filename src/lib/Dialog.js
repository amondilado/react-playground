import React from "react";

// Pane 
function Pane(props) {
    return(
        <div className={'pane pane-' + props.color}>
            {props.children}
        </div>
    );
}

// Split pane
function SplitPane(props) {
    return(
        <Pane color={props.color}>
            <div className="split-pane-left">
                {props.left}
            </div>
            <div className="slpit-pane-right">
                {props.right}
            </div>
        </Pane>
    );
}

// Dialog
function Dialog(props) {
    return (
        <div>
            <Pane color={props.color}>
                <h1 className="display-1">{props.title}</h1>
                <div className="pane-description">
                    {props.message}
                </div>
                {props.children}
            </Pane>
            {props.splitClass 
             ? (<SplitPane color={props.splitClass} left={props.left} right={props.right}/>)
             : ''
            }
        </div>
    );
}

export default Dialog;