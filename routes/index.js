'use strict';

var ContactProvider = require('../data').ContactProvider;
var contactData = new ContactProvider('localhost', 27017);

// var contacts = [
//     {id: 0, name: "Alice", phone:"555-1234"},
//     {id: 1, name: "Bob", phone:"555-4321"},
//     {id: 2, name: "Carol", phone:"555-5678"},
//     {id: 3, name: "Dave", phone:"555-8765"}
// ];

exports.displayAllContacts = function(req, res) {
    contactData.findAll(function(error, contacts) {
        res.json(contacts);
    });
};

exports.displayContact = function(req, res) {
    contactData.findById(req.params.id, function(error, contact) {
        if (error) {
            res.statusCode = 404;
            return res.send('Error 404: No contact found');
        }
        res.json(contact);
    });
};

exports.postNewContact = function(req, res) {
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('phone')) {
        res.statusCode = 500;
        return res.send('Error: Post syntax incorrect.');
    }

    contactData.save({
        name: req.body.name,
        phone: req.body.phone
    }, function(error, contact) {
        res.json(contact);
    });
};

exports.updateContact = function(req, res) {
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('phone')) {
        res.statusCode = 500;
        return res.send('Error: Post syntax incorrect.');
    }
    contactData.update(req.params.id, {
        name: req.body.name,
        phone: req.body.phone
    }, function(error, contact) {
        if (error) {
            res.statusCode = 500;
            return res.send('Error occured.');
        }
        res.json(contact);
    });
};

exports.deleteContact = function(req, res) {
    contactData.delete(req.params.id, function(error, contact) {
        if (error) {
            res.statusCode = 500;
            return res.send('Error: deleting');
        }
        res.json(true);
    });
};
