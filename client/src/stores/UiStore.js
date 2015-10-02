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
            userId: null,
            userProfile: null,
            currentPage: 'Home',
            currentModal: null,
            currentModalToken: null,
            currentModalError: null,
            editTransaction: null,
            asyncInProgress: [],
            transactions: [],
            transactionsId: 0
        };
    }

    getState() {
        return this.state;
    }

    __onDispatch(action) {

        console.log(action);

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

            case Constants.SHOW_EDIT:
                this.state.currentModal = Constants.Dialogs.Edit;
                this.state.currentModalToken = null;
                this.state.currentModalError = null;
                this.__emitChange();
                break;

            case Constants.ADD_TRANSACTION:
                this.state.currentModal = 'Transaction';
                this.state.currentModalToken = null;
                this.state.currentModalError = null;
                this.state.editTransaction = null;
                this.__emitChange();
                break;

            case Constants.CLOSE_MODAL:
                this.state.currentModal = null;
                this.state.currentModalToken = null;
                this.state.currentModalError = null;
                this.__emitChange();
                break;

            case Constants.ASYNC_STARTED:
                let {token, payload} = action;
                this.state.asyncInProgress.push({token, payload});
                this.__emitChange();
                break;
            
            // use correlation token
            // listen to all network operations
            case Constants.ASYNC_SUCCESS:
                if (this.state.currentModalToken === action.token) {
                    this.state.currentModalToken = null;
                    this.state.currentModal = null;
                }
                _.remove(this.state.asyncInProgress, {token: action.token});
                this.__emitChange();
                break;

            // use correlation token
            // listen to all network operations
            case Constants.ASYNC_FAILURE:
                if (this.state.currentModalToken === action.token) {
                    this.state.currentModalToken = null;
                    this.state.currentModalError = action.payload.toString();
                }
                _.remove(this.state.asyncInProgress, {token: action.token});
                this.__emitChange();
                break;

            case Constants.SET_WINDOW_SIZES:
                this.state.sizes = action.payload;
                this.__emitChange();
                break;

            case Constants.TRANSACTIONS_SUCCESS:
                if (this.state.currentModalToken === action.token) {
                    this.state.currentModalToken = null;
                    this.state.currentModal = null;
                }
                _.remove(this.state.asyncInProgress, {token: action.token});

                // instead of immutable, just add an ID for the set
                // be sure to check the ID!
                this.state.transactions = UiStore.cleanTransactions(action.payload);
                this.state.transactionsId += 1;
                this.__emitChange();
                break;

            case Constants.LOGIN_SUCCESS:
                // not sure login counts as a modal...
                if (this.state.currentModalToken === action.token) {
                    this.state.currentModalToken = null;
                    this.state.currentModal = null;
                }
                _.remove(this.state.asyncInProgress, {token: action.token});

                this.state.userProfile = action.payload;
                this.state.userId = this.state.userProfile.userId;
                this.__emitChange();
                break;
        }
    }


    static cleanTransactions(transactions) {
        return transactions.map(t => {
            return {
                id: t.id,
                userId: t.userId,
                date: new Date(t.date),
                description: t.description,
                amount: parseFloat(t.amount) || 0.0,
                category: t.category,
                tags: t.tags,
                accountFrom: t.accountFrom,
                accountTo: t.accountTo
            };
        });
    }
}

export default new UiStore(AppDispatcher);