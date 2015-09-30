/**
 * UI state
 */

import {Store} from 'flux/utils';
import * as _ from 'lodash';
import AppDispatcher from '../dispatcher/AppDispatcher';
import * as Constants from '../constants/Constants';

class UiStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.state = {
            userId: 'MrHyde',
            currentPage: 'Home',
            currentModal: null,
            currentModalToken: null,
            currentModalError: null,
            editTransaction: null
        };
    }

    getState() {
        return this.state;
    }

    __onDispatch(action) {
        switch (action.type) {
            case Constants.CURRENT_MODAL_WAITING:
                this.state.currentModalToken = action.token;
                this.state.currentModalError = null;
                this.__emitChange();
                break;

            case Constants.SET_PAGE:
                this.state.currentPage = action.payload;
                this.__emitChange();
                break;

            case Constants.EDIT_TRANSACTION:
                this.state.currentModal = 'Transaction';
                this.state.currentModalToken = null;
                this.state.currentModalError = null;
                this.state.editTransaction = action.payload;
                this.__emitChange();
                break;

            case Constants.ADD_TRANSACTION:
                this.state.currentModal = 'Transaction';
                this.state.currentModalToken = null;
                this.state.currentModalError = null;
                this.__emitChange();
                break;

            case Constants.CLOSE_MODAL:
                this.state.currentModal = null;
                this.state.currentModalToken = null;
                this.state.currentModalError = null;
                this.__emitChange();
                break;

            // use correlation token
            // listen to all network operations
            case Constants.TRANSACTION_OPERATION_SUCCESS:
                if (this.state.currentModalToken === action.token) {
                    this.state.currentModalToken = null;
                    this.state.currentModal = null;
                }
                this.__emitChange();
                break;

            // use correlation token
            // listen to all network operations
            case Constants.TRANSACTION_OPERATION_FAILURE:
                if (this.state.currentModalToken === action.token) {
                    this.state.currentModalToken = null;
                    this.state.currentModalError = payload.toString();
                }
                this.__emitChange();
                break;

            case Constants.SET_WINDOW_SIZES:
                this.state.sizes = action.payload;
                this.__emitChange();
                break;
        }
    }
}

export default new UiStore(AppDispatcher);