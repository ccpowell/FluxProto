/**
 * Created by chris_000 on 10/1/2015.
 */
var userStore = require('../server/dist/stores/MongoUserStore')["default"];
var mongoose = require('../server/dist/stores/MongoDb');

userStore.createUser({
        userName: 'ossbsall',
        password: 'dummy'
    })
    .then(function (userId) {
        console.log('created user profile ' + userId);
        return userStore.updateProfile(userId, {
            tags: ['abra', 'cadabra'],
            accounts: ['Wells Fargo Checking', 'Citi Visa'],
            categories: ['House', 'Telephone']
        });
    })
    .then(function (p) {
        console.log('modified profile ' + p);
        mongoose.connection.close();
    })
    .catch(function (err) {
        console.log('error ' + err);
        mongoose.connection.close();
    });