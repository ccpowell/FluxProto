import * as _ from 'lodash';
import mongoose from './MongoDb';

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
            userName: userName
        }).exec()
            .then(u => {
                if (u.password !== password) {
                    throw 'password invalid'
                }
                return this.getProfileById(u._id);
            });
    }

    getProfileById(id) {
        return ProfileDoc.findById(id).exec()
            .then(profile => {
                return {
                    userId: profile.id,
                    tags: profile.tags,
                    accounts: profile.accounts,
                    categories: profile.categories
                };
            });
    }

    /**
     * @description Delete user and profile by id (NOT name)
     * @param {string} id ID of Transaction
     */
    deleteUserById(id) {
        return UserDoc.findByIdAndRemove(id).exec()
            .then(() => ProfileDoc.findByIdAndRemove(id).exec());
    }

    /**
     * @description Create a new user and profile
     * @param user {User} user and password
     * @returns {ObjectId} created user and profile id
     */
    createUser(user) {
        let userDoc = new UserDoc(user);
        return userDoc.save()
            .then(created => {
                console.log('created user doc ' + created);
                return new ProfileDoc({
                    _id: created._id,
                    categories: [],
                    tags: [],
                    accounts: []
                }).save()
            })
            .then(np => np._id);
    }

    /**
     * Set tags for a user
     * @param id
     * @param tags
     */
    updateProfile(id, update) {
        return ProfileDoc.findByIdAndUpdate(id, update).exec()
            .then(p => this.getProfileById(id));
    }

}
var store = new UserStore();
export {store as default};