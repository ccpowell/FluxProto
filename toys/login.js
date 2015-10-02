/**
 * Created by chris_000 on 10/1/2015.
 */
var userStore = require('../server/dist/stores/MongoUserStore');

userStore["default"].login('foo', 'bar').then(function(profile) {
    "use strict";
    console.log('got profile ' + profile);
}).catch(function(err) {
    console.log('error ' + err);
});