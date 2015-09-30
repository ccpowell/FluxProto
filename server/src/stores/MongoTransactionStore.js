import * as _ from 'lodash';
import TodoModel from '../models/TodoModel';
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/HomeFinance');
let db = mongoose.connection;
let schema = mongoose.Schema({
    userId: String,
    description: String,
    amount: Number,
    date: Date,
    category: String,
    tags: [String],
    accountFrom: String,
    accountTo: String
});
let TransactionDoc = mongoose.model('Transaction', schema);

function cleanTransaction(t) {
    let {id, userId, description, amount, date, category, tags, accountFrom, accountTo} = t;
    return {id, userId, description, amount, date, category, tags, accountFrom, accountTo};
}

function withoutId(t) {
    let { userId,description, amount, date, category, tags, accountFrom, accountTo} = t;
    return {userId, description, amount, date, category, tags, accountFrom, accountTo};
}

// TODO: check userId
export class TransactionStore {

    /**
     * @description Get Transaction by ID
     * @param {string} id ID of Transaction
     * @returns {TransactionModel} the Transaction with the given id or undefined
     */
    getById(id) {
        return TransactionDoc.findOneById(id).exec().then(t => cleanTransaction(t));
    }

    /**
     * @description Delete Transaction by ID
     * @param {string} id ID of Transaction
     */
    deleteById(id) {
        return TransactionDoc.findByIdAndRemove(id).exec();
    }

    /**
     * @description Get list containing all Transactions
     * @param userId {string} ID of user
     * @returns {TransactionModel[]} all Transactions
     */
    getAllByUserId(userId) {
        return TransactionDoc.find({userId}).exec().then(all => (all.map(t => cleanTransaction(t))));
    }

    /**
     * @description Create a new TransactionModel
     * @param text {string} body
     * @returns {TransactionModel} created TransactionModel
     */
    create(transaction) {
        var todo = new TransactionDoc(transaction);
        return todo.save();
    }

    /**
     * @description update transaction
     * @param {TransactionModel} Transaction
     */
    update(transaction) {
        let id = transaction.id;
        return TransactionDoc.findByIdAndUpdate(id, withoutId(transaction)).exec();
    }
}
var store = new TransactionStore();
export {store as default};