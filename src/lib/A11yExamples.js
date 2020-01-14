import React, {Component} from "react";

function CustomInput(props) {
    return(
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            <input ref={props.inputRef} type={props.inputType} id={props.id} name={props.inputName} required={props.inputRequired} placeholder={props.inputPlaceholder} className="form-control" />
        </div>
    );
}

class MemberSignUpForm extends Component {
    constructor(props) {
        super(props);
        this.inputUsername = React.createRef();
        this.inputPassword = React.createRef();
        this.setFocus = this.setFocus.bind(this);
    }

    setFocus() {
        if(this.inputUsername.current.value === "") {
            this.inputUsername.current.focus();

        } else if(this.inputPassword.current.value === "") {
            this.inputPassword.current.focus();
        }
    }

    render() {
        return(
            <form>
                <CustomInput inputRef={this.inputUsername} id="userName" label="Username" inputPlaceholder="e.g. sam" inputType="text" inputName="username" />
                <CustomInput id="userPassword" label="Password" inputRef={this.inputPassword} inputPlaceholder="type a secure password..." inputType="password" inputName="password" inputRequired="required" />
                <button type="button" onClick={this.setFocus} className="btn">Set focus</button>
            </form>
        );
    }
}

class OuterClickExample extends Component {
    constructor(props) {
        super(props);
        // this.toggleContainer = React.createRef();
        this.state = {
            isOpen: false
        };
        this.timeOutId = null;
        this.onClickHandler = this.onClickHandler.bind(this);
        // this.onClickOuterHandler = this.onClickOuterHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }

    // componentDidMount() {
    //     window.addEventListener('click', this.onClickOuterHandler);
    // }
    // componentWillUnmount() {
    //     window.removeEventListener('click', this.onClickOuterHandler);
    // }

    onClickHandler(e) {
        this.setState(currentState => ({
            isOpen: !currentState.isOpen
        }));
    }

    // onClickOuterHandler(e) {
    //     if(this.state.isOpen && !this.toggleContainer.current.contains(e.target)) {
    //         this.setState({isOpen: false});
    //     }
    // }

    // We close the popover on the next tick by using setTimeout.
    // This is necessary because we need to first check if
    // another child of the element has received focus as
    // the blur event fires prior to the new focus event.
    onBlurHandler() {
        this.timeOutId = setTimeout(() => {
            this.setState({
                isOpen: false
            });
        });
    }

    // If a child receives focus, do not close the popover.
    onFocusHandler() {
        clearTimeout(this.timeOutId);
    }

    render() {
        return(
            <div
                // ref={this.toggleContainer}
                 onBlur={this.onBlurHandler}
                 onFocus={this.onFocusHandler}>
                <button onClick={this.onClickHandler}
                        aria-haspopup="true"
                        aria-expanded={this.state.isOpen}>Select an option</button>
                {this.state.isOpen && (
                    <ul>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                    </ul>
                )}
            </div>
        );
    }
}

export {MemberSignUpForm, OuterClickExample};