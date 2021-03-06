var express = require('express');
var app = express();

var routes = require('./routes');

app.use(express.bodyParser());

app.get('/contacts', routes.displayAllContacts);

app.get('/contacts/:id', routes.displayContact);

app.post('/contacts', routes.postNewContact);

app.post('/contacts/:id', routes.updateContact);

app.delete('/contacts/:id', routes.deleteContact);

app.use("/", express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("I'm a runnin'.");
});
