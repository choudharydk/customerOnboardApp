//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Customer = require('../app/models/customer');


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();



chai.use(chaiHttp);


describe('Customers', () => {
		//Before each test we empty the database
		beforeEach((done) => { 
		Customer.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET customer', () => {
	  it('it should GET all the customers', (done) => {
		
			chai.request(server)
		    .get('/customer')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });

it('it should through page not found error for invalid URL', (done) => {
	  
		  chai.request(server)
		  .get('/customers')
		  .end((err, res) => {
				res.should.have.status(404);
				res.body.should.be.a('object');
			done();
		  });
});
 /*
  * Test the /POST route
  */
  describe('/POST customer', () => {
	  it('it should not POST a customer without email field', (done) => {
	  	let customer = {
	  		firstName: "John",
	  		lastName: "Kennedy",
			contactNumber: 8987676500,
	  	}
			chai.request(server)
		    .post('/customer')
		    .send(customer)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('email');
			  	res.body.errors.email.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a customer ', (done) => {
	  	let customer = {
			firstName: "John",
			lastName: "Kennedy",
			email:"jhon.kennedy@gmail.com",
		  	contactNumber: 8987676500,
	  	}
			chai.request(server)
		    .post('/customer')
		    .send(customer)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('customer successfully added!');
			  	res.body.customer.should.have.property('firstName');
			  	res.body.customer.should.have.property('lastName');
			  	res.body.customer.should.have.property('email');
			  	res.body.customer.should.have.property('contactNumber');
		      done();
		    });
	  });
  
  it('it should not POST a customer for invalid field entry ', (done) => {
	let customer = {
	  firstName: "John",
	  lastName: "Kennedy",
	  email:"jhon.kennedy@gmail.com",
		contactNumber: "8987676500",
	}
	  chai.request(server)
	  .post('/customers')
	  .send(customer)
	  .end((err, res) => {
			res.should.have.status(404);
			res.body.should.be.a('object');
		done();
	  });
});
});
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id customer', () => {
	  it('it should GET a customer by the given id', (done) => {
	  	let customer = new Customer({ firstName: "John",lastName: "Kennedy",email:"jhon.kennedy@gmail.com",contactNumber: 8987676500 });
	  	customer.save((err, customer) => {
	  		chai.request(server)
		    .get('/customer/' + customer.id)
		    .send(customer)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('firstName');
			  	res.body.should.have.property('lastName');
			  	res.body.should.have.property('email');
			  	res.body.should.have.property('contactNumber');
			  	res.body.should.have.property('_id').eql(customer.id);
		      done();
		    });
	  	});
			
	  });

	  it('it should not GET a customer for the given invalid id', (done) => {
		let customer = new Customer({ firstName: "John",lastName: "Kennedy",email:"jhon.kennedy@gmail.com",contactNumber: 8987676500 });
		customer.save((err, customer) => {
			chai.request(server)
			//here "customer.identity" is invalid 
		  .get('/customer/' + customer.identity)
		  .send(customer)
		  .end((err, res) => {
			  console.log("res is",res.body)
				res.should.have.status(200);
				res.body.should.be.a('object');
			done();
		  });
		});
		  
	});
  });

});
  