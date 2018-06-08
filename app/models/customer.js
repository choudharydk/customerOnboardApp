let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//customer schema definition
let CustomerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: Number, required: true, min: 1 },
    createdAt: { type: Date, default: Date.now },    
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
CustomerSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the CustomerSchema for use elsewhere.
module.exports = mongoose.model('customer', CustomerSchema);