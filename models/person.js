const mongoose = require('mongoose');

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI;

mongoose.connect(
  url,
  { useNewUrlParser: true }
);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

//Here we can use the mongodb generated id instead of the numbers we used
//when using the hard-coded values.
personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  };
};

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
