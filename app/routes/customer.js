let mongoose = require('mongoose');
let customer = require('../models/customer');

/*
 * GET /customer route to retrieve all the customers.
 */
function getcustomers(req, res) {
	//Query the DB and if no errors, send all the customers
	let query = customer.find({});
	query.exec((err, customers) => {
		if(err) res.send(err);
		
		res.json(customers);
	});
}

/*
 * POST /customer to save a new customer.
 */
function postcustomer(req, res) {
	
	var newcustomer = new customer(req.body);
	//Save it into the DB.
	newcustomer.save((err,customer) => {

		if(err) {
			res.send(err);
		}
		else { 
			res.json({message: "customer successfully added!", customer });
		}
	});
	
}

/*
 * GET /customer/:id route to retrieve a customer given its id.
 */
function getcustomer(req, res) {
	customer.findById(req.params.id, (err, customer) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(customer);
	});		
}



module.exports = { getcustomers, postcustomer, getcustomer };