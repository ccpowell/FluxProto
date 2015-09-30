/**
 * Created by chris_000 on 9/26/2015.
 */

import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import * as Constants from '../constants/Constants';

class TransactionStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.state = {
            transactions: []
        };
    }

    getAll() {
        return this.state.transactions;
    }

    __onDispatch(action) {
        switch (action.type) {
            case Constants.TRANSACTIONS_SUCCESS:
                this.state.transactions = TransactionStore.cleanTransactions(action.payload);
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

export default new TransactionStore(AppDispatcher);