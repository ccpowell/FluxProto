/**
 * Created by chris_000 on 10/1/2015.
 */
var userStore = require('../server/dist/stores/MongoUserStore');
var db = require('../server/dist/stores/MongoDb');

userStore.login('foo', 'bar').then(function(profile) {
    console.log('got profile ' + profile);
    db.connection.close();
}).catch(function(err) {
    console.log('error ' + err);
});