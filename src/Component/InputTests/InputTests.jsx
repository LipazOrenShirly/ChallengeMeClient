// https://goshakkk.name/instant-form-fields-validation-react/

import React, { Component } from 'react';
import ReactDOM from "react-dom";

import "./InputTests.css";


class InputTests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",

            everFocusedEmail: false,
            everFocusedPassword: false,
            inFocus: ""
        }
    }

    validate = (email, password) => {
        // true means invalid טרו אומר לא תקין
        return {
            email: email.length === 0,
            password: password.length === 0
        };
    }

    handleEmailChange = evt => {
        this.setState({ email: evt.target.value });
    };

    handlePasswordChange = evt => {
        this.setState({ password: evt.target.value });
    };

    handleSubmit = evt => {
        if (!this.canBeSubmitted()) {
            evt.preventDefault();
            return;
        }
        const { email, password } = this.state;
        alert(`Signed up with email: ${email} password: ${password}`);
    };

    canBeSubmitted() {
        const errors = this.validate(this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }


    render() {
        const errors = this.validate(this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    className={errors.email ? "error" : ""}
                    type="text"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                />
                <input
                    className={errors.password ? "error" : ""}
                    type="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                />
                <button disabled={isDisabled}>Sign up</button>
            </form>
        );
    }
}

export default InputTests;