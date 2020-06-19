// Routers definition
'use strict'
const path = require('path');
const Controller = require(path.join(__dirname,'../controllers/controller.js'));

module.exports = function(server){
    server.route('/:collection').get(Controller.findDocument);
    server.route('/:collection/:id').get(Controller.findDocument);
    server.route('/:collection').post(Controller.createDocument);
    server.route('/:collection/:id').post(Controller.updateDocument); // PUT may fit better
    server.route('/').get(Controller.check);
};
