/**
 * Created by chris_000 on 9/27/2015.
 *
 * These methods are meant to be invoked from Actions, NOT directly.
 */
let request = require('browser-request');

import uiStore from '../stores/UiStore';
import transactionActions from './TransactionActions';

function isError(error, response) {
    if (error) {
        return error;
    }
    if (!(response.status >= 200 && response.status < 300)) {
        var error = new Error(response.statusText);
        error.response = response;
        return error;
    }
    return null;
}

// make a curried response handler
function handleFetch(token) {
    return (error, response, data) => {
        let badNews = isError(error, response);
        if (badNews) {
            console.log('web operation failed', badNews);
            transactionActions.failure(token, badNews);
        } else {
            transactionActions.success(token, data);
        }
    }
}

class WebApi {

    createTransaction(token, transaction) {
        transactionActions.start(token);

        transaction.userId = uiStore.getState().userId;
        request.post({url: '/api/transactions', json: transaction}, handleFetch(token));
    }

    updateTransaction(token, transaction) {
        transactionActions.start(token);

        request.put({url: '/api/transactions', json: transaction}, handleFetch(token));
    }

    getTransactions(token) {
        transactionActions.start(token);

        let userId = uiStore.getState().userId;
        let uri = '/api/transactions/user/' + userId;
        request.get({uri, json: true}, handleFetch(token));
    }

    login(token, username, password) {
        // authenticate and get user profile
    }
}

export default new WebApi();