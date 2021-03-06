/**
 * Created by chris_000 on 9/26/2015.
 */
var keyMirror = require('react/lib/keyMirror');

// start and fail are generic
export const ASYNC_STARTED = 'ASYNC_STARTED';
export const ASYNC_FAILURE = 'ASYNC_FAILURE';

// successes are identified for quick processing
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';

export const SET_PAGE = 'SET_PAGE';
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const CURRENT_MODAL_WAITING = 'CURRENT_MODAL_WAITING';
export const SET_WINDOW_SIZES = 'SET_WINDOW_SIZES';

export const SHOW_EDIT = 'SHOW_EDIT';

export var Pages = keyMirror({
    Home: null,
    Transactions: null,
    Budget: null,
    Forecasting: null
});

export var Dialogs = keyMirror({
    Transaction: null,
    Edit: null
});
