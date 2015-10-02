/**
 * Created by chris_000 on 10/1/2015.
 */
var userStore = require('../server/dist/stores/MongoUserStore');

userStore["default"].createUser({
    userName: 'foo',
    password: 'bar'
}).then(function(profile) {
    "use strict";
    console.log('created user');
}).catch(function(err) {
    console.log('error ' + err);
});