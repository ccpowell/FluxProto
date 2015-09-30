/**
 * Created by chris_000 on 9/26/2015.
 */

import shortid from 'shortid';
import AppDispatcher from '../dispatcher/AppDispatcher';
import * as Constants from '../constants/Constants';
import web from './WebApi';

function getOperationId() {
    return shortid.generate();
}

let UiActions = {

    getOperationId,

    startWaiting() {
        let token = getOperationId();
        AppDispatcher.dispatch({
            type: Constants.CURRENT_MODAL_WAITING,
            token
        });
        return token;
    },

    /**
     * Log in using the web api
     * @param token {string} token to wait for
     * @param username {string} user name
     * @param password {string} password
     */
    login: function(token, username, password) {
        web.login(token, username, password);
    },

    /**
     * User has logged in. Save the user profile.
     * @param payload {profile} user profile
     */
    loggedIn: function(token, payload) {
        AppDispatcher.dispatch({
            type: Constants.LOGGED_IN,
            payload
        });
    },

    /**
     * set the page
     * @param payload {string} name of page to show
     */
    setPage: function(payload) {
        AppDispatcher.dispatch({
            type: Constants.SET_PAGE,
            payload
        });
    },

    /**
     * edit a transaction
     * @param payload {Transaction} transaction to edit
     */
    editTransaction: function(payload) {
        AppDispatcher.dispatch({
            type: Constants.EDIT_TRANSACTION,
            payload
        });
    },

    /**
     * add a transaction
     */
    addTransaction: function() {
        AppDispatcher.dispatch({
            type: Constants.ADD_TRANSACTION
        });
    },

    /**
     * close the current modal
     */
    closeModal: function() {
        AppDispatcher.dispatch({
            type: Constants.CLOSE_MODAL
        });
    },

    /**
     * Save current window sizes
     * @param payload {object} window sizes
     */
    setWindowSizes: function(payload) {
        AppDispatcher.dispatch({
            type: Constants.SET_WINDOW_SIZES,
            payload
        });
    },

    /**
     * starting a network operation
     */
    start: function (token) {
        AppDispatcher.dispatch({
            type: Constants.UI_OPERATION_STARTED,
            token
        });
    },

    /**
     * queue an error response
     * @param payload {Error} error
     */
    failure: function (token, payload) {
        AppDispatcher.dispatch({
            type: Constants.UI_OPERATION_FAILURE,
            token,
            payload
        });
    },

    /**
     * received a list of transactions from the server
     * @param payload {Transaction[]} list of transactions
     */
    success: function (token, payload) {
        AppDispatcher.dispatch({
            type: Constants.UI_OPERATION_SUCCESS,
            token,
            payload
        });
    }
};

export default UiActions;