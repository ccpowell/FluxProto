/**
 * Created by chris_000 on 9/27/2015.
 *
 * These methods are meant to be invoked from Actions, NOT directly.
 */
let request = require('browser-request');

import uiStore from '../stores/UiStore';
import transactionActions from './TransactionActions';
import uiActions from './UiActions';

function isError(error, response) {
    if (error) {
        return error;
    }
    if (!(response.status >= 200 && response.status < 300)) {
        var err = new Error(response.statusText);
        err.response = response;
        return err;
    }
    return null;
}

// make a curried response handler for a transaction operation
// they all end successfully in TRANSACTIONS_SUCCESS, or
// fail with ASYNC_FAILURE
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

// make a curried response handler for a transaction operation
// they all end successfully in PROFILE_SUCCESS, or
// fail with ASYNC_FAILURE
function handleProfileFetch(token) {
    return (error, response, data) => {
        let badNews = isError(error, response);
        if (badNews) {
            console.log('web operation failed', badNews);
            uiActions.failure(token, badNews);
        } else {
            uiActions.profileSuccess(token, data);
        }
    }
}

class WebApi {

    createTransaction(token, transaction) {
        transactionActions.start(token);
        transaction.userId = uiStore.getUserId();
        request.post({url: '/api/transactions', json: transaction}, handleFetch(token));
    }

    updateTransaction(token, transaction) {
        transactionActions.start(token);

        request.put({url: '/api/transactions', json: transaction}, handleFetch(token));
    }


    updateProfile(token, update) {
        transactionActions.start(token);

        let userId = uiStore.getUserId();
        request.put({url: '/api/profile/'+userId, json: update}, handleProfileFetch(token));
    }

    getTransactions(token) {
        transactionActions.start(token);

        let userId = uiStore.getUserId();
        let uri = '/api/transactions/user/' + userId;
        request.get({uri, json: true}, handleFetch(token));
    }

    /**
     * Authenticate and get user profile.
     * @param token
     * @param username
     * @param password
     */
    login(token, username, password) {
        uiActions.start(token);
        let self = this;
        let data = {
            username,
            password
        };
        request.post({uri: '/api/login', json: data}, function (error, response, data) {
            let badNews = isError(error, response);
            if (badNews) {
                console.log('login failed', badNews);
                uiActions.failure(token, badNews);
            } else {
                uiActions.loggedIn(token, data);
                self.getTransactions(token);
            }
        });
    }
}

export default new WebApi();