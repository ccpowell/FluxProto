import * as _ from 'lodash';
import TodoModel from '../models/TodoModel';
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/HomeFinance');
let db = mongoose.connection;

// id is userId
let userSchema = mongoose.Schema({
    password: String,
    accountId: mongoose.Schema.Types.ObjectId,
    userName: String
});
let UserDoc = mongoose.model('users', userSchema);

// id is userId
// since it has already been created, we need to turn off the default _id
let profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tags: [String],
    accounts: [String],
    categories: [String]
});
let ProfileDoc = mongoose.model('profiles', profileSchema);

export class UserStore {

    /**
     * Find the user and check the password.
     * If successful, look up the profile and return it.
     * @param userName {string} name of user
     * @param password {string} password
     */
    login(userName, password) {
        return UserDoc.findOne({
            userName: userName,
            password: password
        },{_id: 1}).exec()
            .then(function (u) {
                return ProfileDoc.findById(u._id).exec();
            });
    }

    /**
     * @description Delete user and profile by id (NOT name)
     * @param {string} id ID of Transaction
     */
    deleteUserById(id) {
        return UserDoc.findByIdAndRemove(id).exec()
            .then(ProfileDoc.findByIdAndRemove(id).exec());
    }

    /**
     * @description Create a new user and profile
     * @param user {User} user and password
     * @returns {Profile} created profile
     */
    createUser(user) {
        let userDoc = new UserDoc(user);
        return userDoc.save().then(function (created) {
            console.log('created user doc');
            return new ProfileDoc({
                _id: created._id,
                categories: ['House', 'Car', 'Phone', 'Utilities']
            }).save();
        });
    }
}
var store = new UserStore();
export {store as default};