/**
 * Created by chris_000 on 9/26/2015.
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import * as Constants from '../constants/Constants';
import shortid from 'shortid';

function getOperationId() {
    return shortid.generate();
}

let UiActions = {

    startWaiting() {
        let token = getOperationId();
        AppDispatcher.dispatch({
            type: Constants.CURRENT_MODAL_WAITING,
            token
        });
        return token;
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
    }
};

export default UiActions;