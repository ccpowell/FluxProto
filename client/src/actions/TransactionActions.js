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
     * @param token {string} correlation token
     * @param payload {transaction} to create
     */
    create: function (token, payload) {
        web.createTransaction(token, payload);
    },

    /**
     * create a transaction
     * @param token {string} correlation token
     * @param payload {transaction} to create
     */
    update: function (token, payload) {
        web.updateTransaction(token, payload);
    },

    /**
     * get all transactions for this user
     * @param token {string} correlation token
     */
    getAll: function(token) {
        web.getTransactions(token);
    },

    /**
     * destroy a transaction
     * @param token {string} correlation token
     * @param payload {string} id of transaction to destroy
     */
    destroy: function (token, payload) {
    },

    /**
     * starting a network operation
     * used by WebApi
     * @param token {string} correlation token
     */
    start: function (token) {
        AppDispatcher.dispatch({
            type: Constants.ASYNC_STARTED,
            token
        });
    },

    /**
     * queue an error response
     * used by WebApi
     * @param token {string} correlation token
     * @param payload {Error} error
     */
    failure: function (token, payload) {
        AppDispatcher.dispatch({
            type: Constants.ASYNC_FAILURE,
            token,
            payload
        });
    },

    /**
     * received a list of transactions from the server
     * used by WebApi
     * @param token {string} correlation token
     * @param payload {Transaction[]} list of transactions
     */
    success: function (token, payload) {
        AppDispatcher.dispatch({
            type: Constants.TRANSACTIONS_SUCCESS,
            token,
            payload
        });
    }
};

export default TransactionActions;