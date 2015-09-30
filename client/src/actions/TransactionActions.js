/**
 * Created by chris_000 on 9/26/2015.
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import * as Constants from '../constants/Constants';
import web from './WebApi';
import shortid from 'shortid';

function getOperationId() {
    return shortid.generate();
}

let TransactionActions = {

    getOperationId,

    /**
     * create a transaction
     * @param payload {transaction} to create
     */
    create: function (token, payload) {
        web.createTransaction(token, payload);
    },

    /**
     * create a transaction
     * @param payload {transaction} to create
     */
    update: function (token, payload) {
        web.updateTransaction(token, payload);
    },

    getAll: function(token) {
        web.getTransactions(token);
    },

    /**
     * destroy a transaction
     * @param payload {string} id of transaction to destroy
     */
    destroy: function (token, payload) {
    },

    /**
     * starting a network operation
     */
    start: function (token) {
        AppDispatcher.dispatch({
            type: Constants.TRANSACTION_OPERATION_STARTED,
            token
        });
    },

    /**
     * queue an error response
     * @param payload {Error} error
     */
    failure: function (token, payload) {
        AppDispatcher.dispatch({
            type: Constants.TRANSACTION_OPERATION_FAILURE,
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
            type: Constants.TRANSACTION_OPERATION_SUCCESS,
            token,
            payload
        });
    }
}

export default TransactionActions;