import React from 'react';
import uiActions from '../actions/UiActions';
let forms = require('newforms');

let LoginForm = forms.Form.extend({
    username: forms.CharField({cssClass: 'pure-control-group'}),
    password: forms.CharField({cssClass: 'pure-control-group'})
});
export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.bound = {
            tryLogin: this.tryLogin.bind(this)
        };
    }

    tryLogin(e) {
        e.preventDefault();

        let form = this.refs.loginForm.getForm();
        let isValid = form.validate();
        console.log('isValid ' + isValid);

        if (!isValid) {
            return;
        }

        // wait for the operation to finish
        let token = uiActions.startWaiting();
        let info = form.cleanedData;
        uiActions.login(token, info.username, info.password);
    }

    /**
     * @return {object}
     */
    render() {
        return (
            <div className="login">
                <h1>Please Log In</h1>
                <div>Enter your user name and password.</div>
                <form
                    className="pure-form pure-form-aligned">

                    <forms.RenderForm
                        labelSuffix=""
                        form={LoginForm}
                        ref="loginForm"/>

                    <div className="pure-controls">
                        <button
                            className="pure-button pure-button-primary"
                            onClick={this.bound.tryLogin}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
