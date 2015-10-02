// TODO: check userID? integrate Identity using OAuth?

import * as express from 'express';
import * as parser from 'body-parser';
import transactions from '../stores/MongoTransactionStore';

var router = express.Router();
router.use(parser.json());

router.get('/transactions/user/:userId', function (req, res) {
    transactions.getAllByUserId(req.params.userId)
        .then(function (all) {
            res.json(all);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/transactions', function (req, res) {
    let {userId, description, amount, date, category, tags, accountFrom, accountTo} = req.body;
    let t = {userId, description, amount, date, category, tags, accountFrom, accountTo};
    if (!userId) {
        console.log('userId is required to create a transaction');
        res.sendStatus(500);
        return;
    }
    transactions.create(t)
        .then(function () {
            transactions.getAllByUserId(userId)
                .then(function (all) {
                    res.json(all);
                })
                .catch(function (err) {
                    console.log(err);
                    res.sendStatus(500);
                });
        });
});

router.get('/transactions/id/:id', function (req, res) {
    transactions.getById(req.params.id)
        .then(function (todo) {
            res.json(todo);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/transactions/id/:id', function (req, res) {
    transactions.deleteById(req.params.id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
});

// update transaction using ID
router.put('/transactions', function (req, res) {
    let {id, userId, description, amount, date, category, tags, accountFrom, accountTo} = req.body;
    let t = {id, userId, description, amount, date, category, tags, accountFrom, accountTo};
    if (!userId || !id) {
        console.log('id and userId are required to update a transaction');
        res.sendStatus(500);
        return;
    }
    transactions.update(t)
        .then(function () {
            transactions.getAllByUserId(userId)
                .then(function (all) {
                    res.json(all);
                })
                .catch(function (err) {
                    console.log(err);
                    res.sendStatus(500);
                });
        });
});

router.put('/tags/:userId', function(req, res) {

});

router.post('/login', function (req, res) {
    let {username, password} = req.body;
    let profile = {
        userId: username,
        categories: ['Transfer', 'House', 'Car', 'Food', 'Utilities', 'Telephone & Internet', 'Clothing'],
        tags: ['Restaurant', 'Networking'],
        accounts: ['Wells Fargo Checking', 'Wells Fargo Savings', 'Overdrawn AmEx', 'Citibank Visa', 'Out of my Hands']
    };
    res.json(profile);
});

export {router as default};