
var contacts = [
    {id: 0, name: "Alice", phone:"555-1234"},
    {id: 1, name: "Bob", phone:"555-4321"},
    {id: 2, name: "Carol", phone:"555-5678"},
    {id: 3, name: "Dave", phone:"555-8765"}
];


exports.displayAllContacts = function(req, res) {
  res.json(contacts);
};

exports.displayContact = function(req, res) {
  if(contacts.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No contact found');
  }

  var contact = contacts[req.params.id];
  res.json(contact);
};

exports.postNewContact = function(req, res) {
  if(!req.body.hasOwnProperty('name') || 
     !req.body.hasOwnProperty('phone')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  var newContact = {
    name : req.body.name,
    phone : req.body.phone,
    id: contacts.length
  };

  contacts.push(newContact);
  res.json(newContact);
};

exports.updateContact = function(req, res) {
  if(contacts.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No contact found');
  }
  
  var contact = contacts[req.params.id];
  
  contact.name = req.body.name;
  contact.phone = req.body.phone;
  
  res.json(contact);
};

exports.deleteContact = function(req, res) {
  if(contacts.length <= req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No contact found');
  }

  contacts.splice(req.params.id, 1);
  res.json(true);
};
